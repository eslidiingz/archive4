"use strict"
const _ = require("underscore");

const globalService = require('./../utils/globalService');
const models = require('./../schema/index');
const modelService = require('./../utils/modelService')(models, globalService);

const storage = require('node-persist');

// delete dataSocket.callNotiProfile[profile_id];
module.exports = async function(io) {
    let dataSocket = {
        event_name: "", //ชื่อ event socket.
        chatSocket: {}, // socket นี้คือ profile อ่ะไร //ตอน leaveroom ไม่ต้องส่ง thisdata มา
        chatProfile: {}, // profile นี้มี socket อะไรบ้าง
        callNotiProfile: {}, //profile_id ทีกำลังได้ noti calling ถ้ามีการโทรหาอีกจะต้องไม่ได้ noti calling ซ้ำ
        callSocket: {}, //socket นี้คือ profile อ่ะไร(call)
        callProfile: {}, //profile นี้มี socket อะไรบ้าง(call)
        callRoom: {} //room นี้มี calling_detail_id อะไรจาก tb.calling_type , calling_type อะไร (VOICE_CALL/VIDEO_CALL), มี socket อะไรอยู่บ้าง profile_id ใดเคยเข้ามาบ้าง.
    };
    // await storage.init();
    // dataSocket = await storage.getItem('data_socket');
    // if (dataSocket == undefined) {
    //     dataSocket = {
    //         event_name: "",
    //         chatSocket: {},
    //         chatProfile: {},
    //         callSocket: {},
    //         callProfile: {},
    //         callRoom: {}
    //     };
    // }

    // await storage.setItem("data_socket", dataSocket);
    io.on('connection', async function(socket) {

        // console.log(socket.id," datasocket :",dataSocket);
        require('./socket_io_call')(io, socket, globalService, models, modelService, dataSocket, storage);

        socket.on('disconnect', async function() {
            try {
                dataSocket.event_name = "disconnect";
                //----------for call..
                // globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "disconnect", "SOCKET", "");
                if (dataSocket.callSocket[socket.id] != undefined) {
                    let call_room_id = dataSocket.callSocket[socket.id].room_id;
                    let call_profile_id = dataSocket.callSocket[socket.id].profile_id;

                    delete dataSocket.callNotiProfile[call_profile_id];
                    delete dataSocket.callSocket[socket.id];
                    if (dataSocket.callProfile[call_profile_id] != undefined) {
                        // var index = dataSocket.callProfile[call_profile_id].indexOf(socket.id);
                        var index = _.indexOf(dataSocket.callProfile[call_profile_id], socket.id);
                        if (index > -1) {
                            dataSocket.callProfile[call_profile_id].splice(index, 1);
                        }
                        if (dataSocket.callProfile[call_profile_id].length == 0) {
                            delete dataSocket.callProfile[call_profile_id];
                        }
                    }

                    if (dataSocket.callRoom[call_room_id] != undefined) { //กรณีคนสุดท้าย leaveCall จะ err เพราะ ลบทิ้งไปก่อน
                        var indexOfSocket = _.indexOf(dataSocket.callRoom[call_room_id].sockets, socket.id);
                        if (indexOfSocket > -1) {
                            dataSocket.callRoom[call_room_id].sockets.splice(indexOfSocket, 1);
                        }
                        if (dataSocket.callRoom[call_room_id].sockets.length <= 1) { //เมื่อวางสายจนหมดหรือเหลือคนสุดท้าย ต้องลบ callRoom ทิ้ง
                            let thisroom = await models.rooms.findOne({ 'room_type': 'SINGLE', '_id': globalService.genMongoId(call_room_id) }, null, { sort: { _id: 1 } });
                            if (dataSocket.callRoom[call_room_id].calling_detail_id != null) {
                                await modelService.updateCallingDetailToDb(dataSocket.callRoom[call_room_id].calling_detail_id, "สายหลุด");
                            }
                            await modelService.pushMessageEndCall(dataSocket.callRoom[call_room_id].calling_type, thisroom, call_profile_id, "สายหลุด");
                            delete dataSocket.callRoom[call_room_id];
                            // wait to do push msg in room
                            io.to("call_" + call_room_id.toString()).emit('leaveCall', { room_id: call_room_id });
                        }
                    }
                }




                //-------for chat.    
                if (dataSocket.chatSocket[socket.id] != undefined) {
                    let chat_room_id = dataSocket.chatSocket[socket.id].room_id;
                    let chat_profile_id = dataSocket.chatSocket[socket.id].profile_id;
                    //เฉพาะ socketที่join ห้องนี้เท่านั้นที่ต้องเอาprofile_joinออก
                    await models.rooms.findOneAndUpdate({ '_id': globalService.genMongoId(chat_room_id) }, { $pull: { 'profile_id_join': chat_profile_id } });


                    socket.leave(chat_room_id.toString());
                    delete dataSocket.chatSocket[socket.id];
                    var index = dataSocket.chatProfile[chat_profile_id].indexOf(socket.id);
                    if (index > -1) {
                        dataSocket.chatProfile[chat_profile_id].splice(index, 1);
                    }
                    if (dataSocket.chatProfile[chat_profile_id].length == 0) {
                        //จริงๆมีแค่ห้องเดียวแหละ เพราะ join ได้ทีละห้อง แต่มีกรณีเล่นหลายเครื่องใช้ profile_id เดียวกันเลยกลายเป็น profile_id เดียว joinได้หลายห้อง
                        //ถ้า profile_id นี้ไม่มี socket อยู่แล้วให้ลบทิ้งไปเลย
                        await models.rooms.updateMany({ 'profile_id_join': chat_profile_id }, { $pull: { 'profile_id_join': chat_profile_id } }, { multi: true });
                        delete dataSocket.chatProfile[chat_profile_id];
                    }
                    // await storage.setItem("data_socket", dataSocket);
                }

                socket.leave(socket.id);
                socket.disconnect();

            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name + "_" + socket.id, socket.request.headers.host, e, "SOCKET", "");
                // cb({ error: "1", msg: e, result: [] });
            }
        });
        //----about list chat....
        socket.on('joinChatList', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "joinChatList";
                // console.log("joinChatList :", thisdata);
                if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'device_token', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'device_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'os', cb) == false) { return };

                let mydata = {
                        device_token: thisdata.device_token,
                        device_id: thisdata.device_id,
                        lasted_socket_id: socket.id,
                        lasted_os: thisdata.os,
                    }
                    // let myprofile = await modelService.createUpdateProfile(thisdata.profile_id, mydata);
                let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
                if (myprofile == false) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "profile_id not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: "1", msg: 'profile_id not found', result: [] });
                    return;
                } else {

                    socket.join(myprofile._id.toString());
                    let thisroom = await models.rooms.aggregate([{
                            $match: {
                                "profile_id_in.profile_id": myprofile._id.toString(),
                                "profile_id_hide": { $ne: myprofile._id.toString() }
                            }
                        },
                        // { $sort: { 'last_msg_timestamp': -1 } },
                        { $sort: { 'msg.timestamp': -1 } },
                        { $limit: 250 },
                        {
                            $addFields: {
                                lastMsgId: {
                                    $max: "$msg.msg_id"
                                }
                            }
                        },
                        {
                            $addFields: {
                                myFriendData: {
                                    $arrayElemAt: [{
                                            "$filter": {
                                                "input": "$profile_id_in",
                                                "as": "pIn",
                                                "cond": {
                                                    "$ne": ["$$pIn.profile_id", myprofile._id.toString()]
                                                }
                                            }
                                        },
                                        0
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                '_id': 1,
                                'room_type': 1,
                                'room_name': 1,
                                'room_image_url': 1,
                                'profileDetail': 1,
                                'myfriend_profile_id': '$myFriendData._id',
                                'myFriendId': 1,
                                'msg': 1,
                                'lastMessage': {
                                    "$arrayElemAt": [{
                                            $filter: {
                                                input: "$msg",
                                                as: "m",
                                                cond: {
                                                    $eq: ["$$m.msg_id", "$lastMsgId"]
                                                }
                                            }
                                        },
                                        0
                                    ]
                                },
                                'myLastedMessage': {
                                    "$arrayElemAt": [{
                                            $filter: {
                                                input: "$profile_id_in",
                                                as: "p",
                                                cond: {
                                                    $eq: ["$$p.profile_id", myprofile._id.toString()]
                                                }
                                            }
                                        },
                                        0
                                    ]
                                }
                            }
                        },
                        {
                            $addFields: {
                                countUnRead: {
                                    $sum: {
                                        $map: {
                                            input: "$msg",
                                            as: "m",
                                            in: {
                                                $switch: {
                                                    branches: [{
                                                        case: {
                                                            $and: [{
                                                                $lt: ["$myLastedMessage.last_read_msg_timestamp", "$$m.timestamp"]
                                                            }],

                                                        },
                                                        then: 1
                                                    }],
                                                    default: 0
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: 'profiles',
                                let: {
                                    "profile_id": "$myfriend_profile_id"
                                },
                                pipeline: [{
                                        "$match": {
                                            "$expr": {
                                                "$eq": ["$_id", "$$profile_id"]
                                            }
                                        }
                                    },
                                    {
                                        $project: {
                                            _id: 0,
                                            _id: 1,
                                            name: 1,
                                            image_url: 1
                                        }
                                    }
                                ],
                                as: "profileDetail"
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                room_id: '$_id',
                                room_image_url: {
                                    $cond: {
                                        if: {
                                            $eq: ["$room_type", "SINGLE"]
                                        },
                                        then: {
                                            $arrayElemAt: ["$profileDetail.image_url", 0]
                                        },
                                        else: "$room_image_url"
                                    }
                                },
                                room_name: "$room_name",
                                last_msg_id: { $ifNull: ["$lastMessage.msg_id", ""] },
                                last_msg_type: { $ifNull: ["$lastMessage.msg_type", ""] },
                                last_msg_text: {
                                    $cond: {
                                        if: {
                                            $eq: ["$lastMessage.msg_type", "TEXT"]
                                        },
                                        then: { $ifNull: ["$lastMessage.msg_text", ""] },
                                        else: {
                                            $switch: {
                                                branches: [{
                                                        case: {
                                                            $and: [{
                                                                    $eq: ["$lastMessage.profile_id", myprofile._id.toString()]
                                                                },
                                                                {
                                                                    $eq: ["$lastMessage.msg_type", "VIDEO"]
                                                                }
                                                            ]
                                                        },
                                                        then: "คุณส่งวิดีโอ"
                                                    },
                                                    {
                                                        case: {
                                                            $and: [{
                                                                $eq: ["$lastMessage.msg_type", "VIDEO_CALL"]
                                                            }]
                                                        },
                                                        then: { $ifNull: ["$lastMessage.msg_text", ""] }
                                                    },
                                                    {
                                                        case: {
                                                            $and: [{
                                                                $eq: ["$lastMessage.msg_type", "VOICE_CALL"]
                                                            }]
                                                        },
                                                        then: { $ifNull: ["$lastMessage.msg_text", ""] }
                                                    },
                                                    {
                                                        case: {
                                                            $and: [{
                                                                    $eq: ["$lastMessage.profile_id", myprofile._id.toString()]
                                                                },
                                                                {
                                                                    $eq: ["$lastMessage.msg_type", "AUDIO"]
                                                                }
                                                            ]
                                                        },
                                                        then: "คุณส่งคลิปเสียง"
                                                    },
                                                    {
                                                        case: {
                                                            $and: [{
                                                                    $eq: ["$lastMessage.profile_id", myprofile._id.toString()]
                                                                },
                                                                {
                                                                    $eq: ["$lastMessage.msg_type", "IMAGE"]
                                                                }
                                                            ]
                                                        },
                                                        then: "คุณส่งรูป"
                                                    },
                                                    {
                                                        case: {
                                                            $and: [{
                                                                    $ne: ["$lastMessage.profile_id", myprofile._id.toString()]
                                                                },
                                                                {
                                                                    $eq: ["$lastMessage.msg_type", "VIDEO"]
                                                                }
                                                            ]
                                                        },
                                                        then: {
                                                            $concat: [{
                                                                $arrayElemAt: ["$profileDetail.profile_name", 0]
                                                            }, " ", "ส่งวิดีโอ"]
                                                        }
                                                    },
                                                    {
                                                        case: {
                                                            $and: [{
                                                                    $ne: ["$lastMessage.profile_id", myprofile._id.toString()]
                                                                },
                                                                {
                                                                    $eq: ["$lastMessage.msg_type", "AUDIO"]
                                                                }
                                                            ]
                                                        },
                                                        then: {
                                                            $concat: [{
                                                                $arrayElemAt: ["$profileDetail.profile_name", 0]
                                                            }, " ", "ส่งคลิปเสียง"]
                                                        }
                                                    },
                                                    {
                                                        case: {
                                                            $and: [{
                                                                    $ne: ["$lastMessage.profile_id", myprofile._id.toString()]
                                                                },
                                                                {
                                                                    $eq: ["$lastMessage.msg_type", "IMAGE"]
                                                                }
                                                            ]
                                                        },
                                                        then: {
                                                            $concat: [{
                                                                $arrayElemAt: ["$profileDetail.profile_name", 0]
                                                            }, " ", "ส่งรูป"]
                                                        }
                                                    }
                                                ],
                                                default: ""
                                            }
                                        }
                                    }
                                },
                                last_msg_timestamp: { $ifNull: ["$lastMessage.timestamp", ""] },
                                unread_count: { $ifNull: ["$countUnRead", 0] }
                            }
                        }
                    ])
                    var all_unread_count = 0;
                    all_unread_count = thisroom.map(oneroom => oneroom.unread_count).reduce((acc, bill) => bill + acc, 0);
                    cb({ error: "0", msg: 'profile id :' + thisdata.profile_id + 'join front success', result: thisroom, all_unread_count: all_unread_count });
                }


            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });
        socket.on('leaveChatList', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "leaveChatList";
                if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
                let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
                if (myprofile == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "profile_id not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: "1", msg: 'Wrong your profile id', result: [] });
                    return;
                }

                socket.leave(myprofile._id);
                cb({ error: "0", msg: 'profile id :' + thisdata.profile_id + 'leave front success', result: [] });
            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });

        socket.on('joinChatRoom', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "joinChatroom";
                if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };
                // if (globalService.checkParamCallback(thisdata, 'is_join_from_admin', cb) == false) { return };
                let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
                if (myprofile == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "profile_id not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: "1", msg: 'Wrong your profile id', result: [] });
                    return;
                }
                let thisroom = await models.rooms.findOne({ _id: globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
                if (thisroom == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "room_id not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: "1", msg: 'Room not found', result: [] });
                    return;
                }

                let indexof_profile_id_in = _.findIndex(thisroom.profile_id_in, (item) => {
                    return item.profile_id.toString() == myprofile._id.toString();
                });
                if (indexof_profile_id_in == -1) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "you are not in profile_id_in. not hav permission to join", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: "1", msg: 'you are not in profile_id_in. not hav permission to join', result: [] });
                    return;
                }

                var indexof_profile_id_join = _.indexOf(thisroom.profile_id_join, myprofile._id.toString());
                if (indexof_profile_id_join == -1) {
                    thisroom.profile_id_join.push(myprofile._id.toString());
                }

                thisroom.create_update.update_date = new Date().toISOString();
                thisroom.save();
                socket.join(thisroom._id.toString());

                dataSocket.chatSocket[socket.id] = { room_id: thisroom._id.toString(), profile_id: myprofile._id.toString() };
                if (typeof dataSocket.chatProfile[myprofile._id.toString()] == "undefined") {
                    dataSocket.chatProfile[myprofile._id.toString()] = []
                }
                if (dataSocket.chatProfile[myprofile._id.toString()].indexOf(socket.id) == -1) {
                    dataSocket.chatProfile[myprofile._id.toString()].push(socket.id);
                }

                let thisreturn = await modelService.get_allmsg(myprofile, thisroom);
                // await storage.setItem("data_socket", dataSocket);

                io.to(thisroom._id.toString()).emit('someoneJoinRoom', {});
                cb(thisreturn);
            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });
        socket.on('leaveChatRoom', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "leaveChatroom";
                //ถ้า undefined เป็นไปได้ว่าโดนทำแล้วตอน disconnect
                if (typeof dataSocket.chatSocket[socket.id] == "undefined" || dataSocket.chatSocket[socket.id].room_id == "") {
                    // globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "no socket to leave node restart", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: "0", msg: "no socket to leave node restart or have done when disconnect.", result: [] });
                    return;
                }
                let sdata = {
                    room_id: dataSocket.chatSocket[socket.id].room_id,
                    profile_id: dataSocket.chatSocket[socket.id].profile_id
                }

                let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(sdata.profile_id) }, null, { sort: { _id: 1 } });
                if (myprofile == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Wrong your profile id", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: "1", msg: 'Wrong your profile id', result: [] });
                    return;
                }
                let thisroom = await models.rooms.findOne({ _id: globalService.genMongoId(sdata.room_id) }, null, { sort: { _id: 1 } });
                if (thisroom == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Room not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: "1", msg: 'Room not found', result: [] });
                    return;
                }
                await models.rooms.findOneAndUpdate({ '_id': globalService.genMongoId(sdata.room_id) }, { $pull: { 'profile_id_join': sdata.profile_id } });
                socket.leave(thisroom._id.toString());
                delete dataSocket.chatSocket[socket.id];


                var index = dataSocket.chatProfile[myprofile._id.toString()].indexOf(socket.id);
                if (index > -1) {
                    dataSocket.chatProfile[myprofile._id.toString()].splice(index, 1);
                }
                if (dataSocket.chatProfile[myprofile._id.toString()].length == 0) {
                    //จริงๆมีแค่ห้องเดียวแหละ เพราะ join ได้ทีละห้อง แต่มีกรณีเล่นหลายเครื่องใช้ profile_id เดียวกันเลยกลายเป็น profile_id เดียว joinได้หลายห้อง
                    //ถ้า profile_id นี้ไม่มี socket อยู่แล้วให้ลบทิ้งไปเลย
                    await models.rooms.updateMany({ 'profile_id_join': myprofile._id.toString() }, { $pull: { 'profile_id_join': myprofile._id.toString() } }, { multi: true });
                    delete dataSocket.chatProfile[myprofile._id.toString()];
                }
                // await storage.setItem("data_socket", dataSocket);

                cb({ error: "0", msg: 'you left room success', result: [] });
            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });

        //******ใช้สำหรับ type:GROUP เท่านั้น */
        socket.on('editChatRoomName', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "editChatRoomName";

                if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'new_room_name', cb) == false) { return };

                let thischatroom = await models.rooms.findOne({ '_id': globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
                if (thischatroom == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Room not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: "room not found", result: [] });
                    return;
                }
                if (thischatroom.room_type == "SINGLE") {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Room Type SINGLE can not change name", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: "Room Type SINGLE can not change name", result: [] });
                    return;
                }
                thischatroom.room_name = thisdata.new_room_name;
                thischatroom.save();
                cb({ error: '0', msg: "Edit room name success", result: thischatroom });
            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });

        //******ใช้สำหรับ type:GROUP เท่านั้น */
        //invite friend to join group chatroom....
        socket.on('inChatRoom', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "inChatroom";
                if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'friend_profile_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };

                let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
                if (myprofile == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Wrong profile_id", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Wrong your profile id', result: [] });
                    return;
                }
                let friendprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.friend_profile_id) }, null, { sort: { _id: 1 } });
                if (friendprofile == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Wrong friend profile_id", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Wrong friend profile id', result: [] });
                    return;
                }
                let thisroom = await models.rooms.findOne({ _id: globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
                if (thisroom == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Room not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Room not found', result: [] });
                    return;
                }
                if (thisroom.room_type != "GROUP") {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "This room type is SINGLE not allow to invite anyone", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'This room type is SINGLE not allow to invite anyone', result: [] });
                    return;
                }

                let datafound = thisroom.profile_id_in.find(item => {
                    return item.profile_id == friendprofile._id.toString()
                })
                if (datafound.length == 0) {
                    thisroom.profile_id_in.push({
                        "profile_id": friendprofile._id.toString(),
                        "datetime_in": new Date().toISOString(),
                        "first_msg_id": "",

                        "last_send_msg_id": "",
                        "last_send_msg_timestamp": null,
                        "last_read_msg_id": "",
                        "last_read_msg_timestamp": new Date().toISOString()
                    });
                    thisroom.save();
                }
                cb({ error: '0', msg: 'invite friend to join room success', result: [] });
            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });

        //******ใช้สำหรับ type:GROUP เท่านั้น */
        //ใช้เตะเพื่อนออกจากห้องหรือคนๆนั้นออกจากห้องเอง ออกในที่นี้หมายถึงออกถาวรไม่มีสิทธิ์ join อีก (เอาชื่อออกจาก profile_id_in) ฝั่ง client ต้องตรวจ ถ้าเป็นคนสุดท้ายที่ออกจากห้อง ห้องนั้นจะถูกลบทิ้ง
        socket.on('outChatRoom', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "outChatroom";
                if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };
                let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
                if (myprofile == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Wrong your profile id", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Wrong your profile id', result: [] });
                    return;
                }
                let thisroom = await models.rooms.findOne({ _id: globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
                if (thisroom == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Room not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Room not found', result: [] });
                    return;
                }
                if (thisroom.room_type == "SINGLE") {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Room type SINGLE not allow to out", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Room type SINGLE not allow to out', result: [] });
                    return;
                }
                //หลังจากนี้คือกรณี room_type = GROUP
                await models.rooms.findOneAndUpdate({ '_id': globalService.genMongoId(thisdata.room_id) }, { $pull: { 'profile_id_join': thisdata.profile_id } });
                await models.rooms.findOneAndUpdate({ '_id': globalService.genMongoId(thisdata.room_id) }, { $pull: { 'profile_id_in': { 'profile_id': thisdata.profile_id } } }, { multi: true });

                socket.leave(thisroom._id);
                setTimeout(async function() { //ถ้าไม่มีสมาชิกอยู่แล้ว ห้องจะถูกลบ
                    await models.rooms.remove({ '_id': globalService.genMongoId(thisdata.room_id), $where: function() { return this.profile_id_in.length == 0 } })
                }, 1000);

                cb({ error: '0', msg: 'You exit chatroom success', result: [] });
            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });



        //block and unblock use for single room type only เมื่อ block แล้วจะไม่ได้รับข้อความอีก และคู่สนทนาที่ถูกบล๊อกจะไม่รู้ว่าโดนบล๊อก
        socket.on('blockChatRoom', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "blockChatroom";
                if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };
                let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
                if (myprofile == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Wrong your profile id", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Wrong your profile id', result: [] });
                    return;
                }
                let thisroom = await models.rooms.findOne({ _id: globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
                if (thisroom == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "room_id not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'room_id not found', result: [] });
                    return;
                }
                if (thisroom.room_type != "SINGLE") {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Room type group not allow to block", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Room type GROUP not allow to block', result: [] });
                    return;
                }
                let datafound = thisroom.profile_id_block.find(item => {
                    return item == myprofile._id.toString()
                })
                if (datafound.length == 0) {
                    thisroom.profile_id_block.push(myprofile._id.toString());
                }
                thisroom.save();
                cb({ error: '0', msg: 'You have blocked your friend', result: [] });
            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });
        socket.on('unblockChatRoom', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "unblockChatroom";
                if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };

                let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
                if (myprofile == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Wrong your profile id", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Wrong your profile id', result: [] });
                    return;
                }
                let thisroom = await models.rooms.findOne({ _id: globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
                if (thisroom == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "room_id not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Room_id not found', result: [] });
                    return;
                }
                if (thisroom.room_type != "SINGLE") {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Room type group not allow to unblock", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Room type GROUP not allow to unblock', result: [] });
                    return;
                }
                await models.rooms.findOneAndUpdate({ '_id': globalService.genMongoId(thisdata.room_id) }, { $pull: { 'profile_id_block': thisdata.profile_id } });

                cb({ error: '0', msg: 'You have unblocked your friend', result: [] });
            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });
        //no used yet,hide and unhide chatroom.
        socket.on('hideChatRoom', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "hideChatroom";
                if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };
                let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
                if (myprofile == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Wrong your profile id", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Wrong your profile id', result: [] });
                    return;
                }
                let thisroom = await models.rooms.findOne({ _id: globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
                if (thisroom == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "room_id not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Room_id not found', result: [] });
                    return;
                }

                let datafound = thisroom.profile_id_hide.find(item => {
                    return item == myprofile._id.toString()
                })
                if (datafound.length == 0) {
                    thisroom.profile_id_hide.push(myprofile._id.toString());
                }
                thisroom.save();
                cb({ error: '0', msg: 'You have hide this room', result: [] });
            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });
        socket.on('unhideChatRoom', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "unhideChatroom";
                if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };
                let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
                if (myprofile == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Wrong your profile id", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Wrong your profile id', result: [] });
                    return;
                }
                let thisroom = await models.rooms.findOne({ _id: globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
                if (thisroom == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "room_id not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Room_id not found', result: [] });
                    return;
                }
                await models.rooms.findOneAndUpdate({ '_id': globalService.genMongoId(thisdata.room_id) }, { $pull: { 'profile_id_hide': thisdata.profile_id } });

                cb({ error: '0', msg: 'You have unhide this room', result: [] });
            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });


        //about message..
        socket.on('unsendMessage', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "unsendMessage";
                if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'msg_id', cb) == false) { return };
                if (dataSocket.chatProfile[thisdata.profile_id] == undefined) {
                    // globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "node restart", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: "101", msg: 'node restart. please joinChatRoom again', result: [] });
                    return;
                }

                let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
                if (myprofile == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Wrong your profile id", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Wrong your profile id', result: [] });
                    return;
                }
                let thisroom = await models.rooms.findOne({ _id: globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
                if (thisroom == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "room_id not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Room_id not found', result: [] });
                    return;
                }
                let thismsg = await models.rooms.aggregate([{
                        $match: {
                            "_id": globalService.genMongoId(thisdata.room_id)
                        }
                    },
                    { $unwind: "$msg" },
                    {
                        $project: {
                            msg: 1
                        }
                    },
                    {
                        $match: {
                            "msg.msg_id": thisdata.msg_id
                        }
                    }
                ]);
                //gu
                if (thismsg == undefined || thismsg == null || thismsg[0] == null || thismsg[0] == undefined) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "msg_id not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'msg_id not found', result: [] });
                    return;
                }
                if (thismsg[0].msg.profile_id != thisdata.profile_id) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "u r not the owner msg", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'You are not msg owner.', result: [] });
                    return;
                }
                await models.rooms.findOneAndUpdate({ '_id': globalService.genMongoId(thisdata.room_id), "msg.msg_id": thisdata.msg_id }, { $set: { "msg.$.is_unsend": true } });


                io.to(thisroom._id.toString()).emit('unsendMessage', { msg_id: thisdata.msg_id });
                cb({ error: '0', msg: 'set unsend success', result: [] });
            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });
        socket.on('deleteMessage', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "deleteMessage";
                if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'msg_id', cb) == false) { return };
                if (dataSocket.chatProfile[thisdata.profile_id] == undefined) {
                    cb({ error: "101", msg: 'node restart. please joinChatRoom again', result: [] });
                    return;
                }

                let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
                if (myprofile == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Wrong your profile id", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Wrong your profile id', result: [] });
                    return;
                }
                let thisroom = await models.rooms.findOne({ _id: globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
                if (thisroom == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "room_id not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Room not found', result: [] });
                    return;
                }

                var thisitem = _.where(thisroom.msg, { msg_id: thisdata.msg_id });
                if (thisitem.length > 1) {
                    var indexof_del = _.indexOf(thisitem[0].profile_id_delete, thisdata.profile_id);
                    if (indexof_del == -1) {
                        await models.rooms.findOneAndUpdate({ '_id': globalService.genMongoId(thisdata.room_id), "msg.msg_id": thisdata.msg_id }, { $push: { 'msg.$.profile_id_delete': thisdata.profile_id } });
                    }
                }

                cb({ error: '0', msg: 'set delete success', result: [] });

            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });
        socket.on('deleteAllMessage', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "deleteAllMessage";
                if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };

                let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
                if (myprofile == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Wrong your profile id", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Wrong your profile id', result: [] });
                    return;
                }
                let thisroom = await models.rooms.findOne({ _id: globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
                if (thisroom == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "room_id not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Room not found', result: [] });
                    return;
                }
                var indexof_profile_id_hide = _.indexOf(thisroom.profile_id_hide, myprofile._id.toString());
                if (indexof_profile_id_hide == -1) {
                    thisroom.profile_id_hide.push(myprofile._id.toString());
                }

                for (var i = 0; i < thisroom.profile_id_in.length; i++) {
                    if (thisroom.profile_id_in[i].profile_id == myprofile._id.toString()) {
                        thisroom.profile_id_in[i].datetime_in = new Date().toISOString();
                    }
                }
                thisroom.save();
                // await models.Rooms.update({
                //     '_id': globalService.genMongoId(thisdata.room_id)
                // }, { $push: { 'msg.$[].profile_id_delete': thisdata.profile_id } });

                cb({ error: '0', msg: 'set delete success', result: [] });

            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });
        socket.on('message', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "message";
                if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'msg_type', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'msg_text', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'msg_image', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'msg_audio', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'msg_cover_video', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'msg_video', cb) == false) { return };
                // if (globalService.checkParamCallback(thisdata, 'content_list', cb) == false) { return };
                if (thisdata.content_list != undefined && typeof thisdata.content_list == "string") {
                    thisdata.content_list = JSON.parse(thisdata.content_list);
                }

                if (dataSocket.chatProfile[thisdata.profile_id] == undefined) {
                    cb({ error: "101", msg: 'node restart. please joinChatRoom again', result: [] });
                    return;
                }

                if (thisdata.msg_type != 'TEXT' && thisdata.msg_type != 'IMAGE' && thisdata.msg_type != 'VIDEO') {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "MSG TYPE must be TEXT, IMAGE, VIDEO", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'MSG TYPE must be TEXT, IMAGE, VIDEO', result: [] });
                    return;
                }

                let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
                if (myprofile == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Wrong your profile id", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Wrong your profile id', result: [] });
                    return;
                }
                let thisroom = await models.rooms.findOne({ _id: globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
                if (thisroom == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "room_id not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Room_id not found', result: [] });
                    return;
                }


                if (thisroom.profile_id_block.find(item => {
                        return item == myprofile._id.toString()
                    }) != undefined && thisroom.room_type == "SINGLE") {
                    cb({ error: '1', msg: 'You have blocked this friend can not send msg', result: [] });
                    return;
                }

                let msg_txt = thisdata.msg_text;
                if (thisdata.msg_type == "IMAGE") {
                    msg_txt = "รูปภาพ";
                } else if (thisdata.msg_type == "VIDEO") {
                    msg_txt = "VDO";
                }
                let new_msg = {
                    "msg_id": globalService.genMongoId(), // mongoid genarate
                    "profile_id": thisdata.profile_id, //เข้าของ msg
                    "msg_type": thisdata.msg_type, // TEXT, IMAGE, VIDEO....
                    "msg_text": msg_txt,
                    "msg_image": thisdata.msg_image,
                    "msg_audio": thisdata.msg_audio, //กรณีไม่ใช่ TEXT เอาไว้เก็บ link
                    "msg_cover_video": thisdata.msg_cover_video, //กรณีเป็น video
                    "msg_video": thisdata.msg_video,
                    "content_list": thisdata.content_list,
                    // "is_unsend": false,
                    // "profile_id_delete": [],//ใส่ profile_id ที่คนนั้นกดลบ msg_id นี้
                    "timestamp": new Date().toISOString(),

                    "profile_name": myprofile.name,
                    "profile_image_url": myprofile.image_url,
                    "is_read": thisroom.profile_id_join.length > 1 ? 1 : 0
                }
                let new_msg_for_cb = {
                    "msg_id": new_msg.msg_id, // mongoid genarate
                    "profile_id": thisdata.profile_id, //เข้าของ msg
                    "msg_type": thisdata.msg_type, // TEXT, IMAGE, VIDEO....
                    "msg_text": msg_txt,
                    "msg_image": thisdata.msg_image,
                    "msg_audio": thisdata.msg_audio, //กรณีไม่ใช่ TEXT เอาไว้เก็บ link
                    "msg_cover_video": thisdata.msg_cover_video, //กรณีเป็น video
                    "msg_video": thisdata.msg_video,
                    // "is_unsend": false,
                    // "profile_id_delete": [],//ใส่ profile_id ที่คนนั้นกดลบ msg_id นี้
                    "timestamp": new Date().toISOString(),

                    "profile_name": myprofile.name,
                    "profile_image_url": myprofile.image_url,
                    "is_read": thisroom.profile_id_join.length > 1 ? 1 : 0
                }

                let friendprofile_id = "";
                let all_friend_profile_id = [];
                thisroom.profile_id_in.find(function(item, i) {
                    if (thisroom.profile_id_in[i].first_msg_id == "") {
                        thisroom.profile_id_in[i].first_msg_id = new_msg.msg_id;
                    }
                    if (item.profile_id == thisdata.profile_id) {
                        thisroom.profile_id_in[i].last_read_msg_id = new_msg.msg_id;
                        thisroom.profile_id_in[i].last_read_msg_timestamp = new Date().toISOString();
                        thisroom.profile_id_in[i].last_send_msg_id = new_msg.msg_id;
                        thisroom.profile_id_in[i].last_send_msg_timestamp = new_msg.timestamp;
                    }

                    if (item.profile_id != myprofile._id.toString()) {
                        friendprofile_id = item.profile_id;
                        var indexof = _.indexOf(thisroom.profile_id_join, item.profile_id);
                        if (indexof == -1) {
                            all_friend_profile_id.push(globalService.genMongoId(item.profile_id));
                        }
                    }

                });

                let can_emit = true;

                //case room SINGEL only ถ้าถูกblockอยู่ คู่สนทนาจะ isdelete true เพื่อให้มองไม่เห็น
                if (thisroom.room_type == "SINGLE") {
                    let friend_profile_id = thisroom.profile_id_block.find(item => {
                        return item != myprofile._id.toString();
                    })
                    if (friend_profile_id != undefined) {
                        new_msg.profile_id_delete.push(friend_profile_id);
                        can_emit = false;
                    }
                } else {

                }
                let all_friend_profile = await models.profiles.find({ _id: { $in: all_friend_profile_id } }, null, { sort: { _id: 1 } });

                if (can_emit == false) { //ถ้าถูกblock จะไม่ emit

                } else {
                    new_msg_for_cb.msg_image = new_msg_for_cb.msg_image != "" ? globalService.httpPath + new_msg_for_cb.msg_image : "";
                    new_msg_for_cb.msg_video = new_msg_for_cb.msg_video != "" ? globalService.httpPath + new_msg_for_cb.msg_video : "";
                    new_msg_for_cb.msg_cover_video = new_msg_for_cb.msg_cover_video != "" ? globalService.httpPath + new_msg_for_cb.msg_cover_video : "";
                    new_msg_for_cb.msg_audio = new_msg_for_cb.msg_audio != "" ? globalService.httpPath + new_msg_for_cb.msg_audio : "";
                    new_msg_for_cb.is_page = (page_profile_id == new_msg_for_cb.profile_id ? true : false);

                    let item_emit = {
                        message: new_msg_for_cb
                    }

                    io.to(thisroom._id.toString()).emit('message', item_emit);

                    let android_registrationIds = [];
                    let ios_registrationIds = [];
                    for (var i = 0; i < all_friend_profile.length; i++) {
                        if (all_friend_profile[i].device_token == "" || all_friend_profile[i].device_token == null) {
                            continue;
                        }
                        if (all_friend_profile[i].lasted_os == "android") {
                            android_registrationIds.push(all_friend_profile[i].device_token);
                        } else if (all_friend_profile[i].lasted_os == "ios") {
                            ios_registrationIds.push(all_friend_profile[i].device_token);
                        }
                    }

                    let datanoti = {
                        "title": myprofile.name,
                        "message": new_msg_for_cb.msg_text,
                        "content_type": 'timeline_chat',
                        "calling_type": "",
                        "room_id": thisroom._id.toString(),
                        "room_name": myprofile.name, //กรณี SINGLE คือชื่อคนโทร กรณี GROUP ก็คือชื่อห้อง
                        "room_image_url": myprofile.image_url, //กรณี SINGLE คือรูปคนโทร กรณี GROUP ก็คือรูปห้อง
                        "profile_id": myprofile._id.toString() //ของตัวเอง(ของคนโทร) อาจเป็น page หรือ doctor
                    }

                    let itemreturn_android = await globalService.sendNotiFCM(datanoti.title, datanoti.message, android_registrationIds, datanoti, 'android');
                    let itemreturn_ios = await globalService.sendNotiFCM(datanoti.title, datanoti.message, ios_registrationIds, datanoti, 'ios');
                }
                //--------------

                thisroom.msg.push(new_msg);



                if (thisroom.profile_id_block.length == 0) {
                    thisroom.profile_id_hide = []; //เมื่อมีใครทักมาต้องปลดให้คู่สนทนากลับมาเห็นเหมือนเดิม
                    thisroom.profile_id_in.find(function(item, i) {
                        io.to(item.profile_id.toString()).emit('chatList', {});
                    });
                }
                thisroom.save();
                cb({ error: "0", msg: "Ok", result: [] });
            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });
        socket.on('readMessage', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "readMessage";
                if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };
                if (dataSocket.chatProfile[thisdata.profile_id] == undefined) {
                    // globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "node restart", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: "101", msg: 'node restart. please joinChatRoom again', result: [] });
                    return;
                }
                let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
                if (myprofile == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Wrong your profile id", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Wrong your profile id', result: [] });
                    return;
                }
                let thisroom = await models.rooms.findOne({ _id: globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
                if (thisroom == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "room_id not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Room not found', result: [] });
                    return;
                }
                let last_msg_id = thisroom.msg.length > 0 ? thisroom.msg[thisroom.msg.length - 1].msg_id : "";
                for (var i = 0; i < thisroom.profile_id_in.length; i++) {
                    if (thisroom.profile_id_in[i].profile_id == myprofile._id.toString()) {
                        thisroom.profile_id_in[i].last_read_msg_id = last_msg_id;
                        thisroom.profile_id_in[i].last_read_msg_timestamp = new Date().toISOString();
                        break;
                    }
                }
                thisroom.save();
                cb({ error: '0', msg: 'set_read_msg success', result: [] });
            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });

        socket.on('pong', function() {
            try {
                dataSocket.event_name = "pong";
                setTimeout(function() {
                    io.to(socket.id).emit('ping', { beat: 1 })
                }, 1000);
            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", "");
                cb({ error: "1", msg: e, result: [] });
            }

        });
        io.to(socket.id).emit('ping', { beat: 1 });

        //เอาไว้ช่วยส่งกรณียิงมาจาก api นอก
        socket.on('emit_message_outside', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "emit_message_outside";
                // if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };
                // if (globalService.checkParamCallback(thisdata, 'message', cb) == false) { return };
                // let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.message.profile_id) }, null, { sort: { _id: 1 } });
                // let thisroom = await models.rooms.findOne({ _id: globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });


                let item_emit = {
                    message: thisdata.message
                }
                io.to(thisdata.room_id.toString()).emit('message', item_emit);
            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
            }
        });

        //--------------for test lazy load msg
        async function get_allmsgLazyLoad(myprofile, thisroom) {
            var morethandate = null;
            var myprofile_id = myprofile.profile_id;
            var friendprofile_id = '';

            if (thisroom.room_type == "SINGLE") {
                let friendprofile = await models.Profiles.findOne({ profile_id: friendprofile_id }, null, { sort: { _id: 1 } });
            }



            let thisroomRead = await models.Rooms.aggregate([
                { $match: { "_id": globalService.genMongoId(thisroom._id) } },
                { $unwind: '$profile_id_in' },
                { $sort: { 'profile_id_in.last_read_msg_timestamp': 1 } },
                {
                    $project: {
                        '_id': 0,
                        'profile_id': "$profile_id_in.profile_id",
                        'is_page': "$profile_id_in.is_page",
                        'datetime_in': "$profile_id_in.datetime_in",
                        'last_read_msg_id': "$profile_id_in.last_read_msg_id",
                        'last_read_msg_timestamp': "$profile_id_in.last_read_msg_timestamp"
                    }
                }
            ])
            var lastmsg_date = ""; //เอาไว้หาข้อความที่อ่านแล้ว ต้องหาของคนอื่น
            let mylast_read_msg_id = "";
            let page_profile_id = "";
            for (var i = 0; i < thisroomRead.length; i++) {
                if (thisroomRead[i].profile_id != myprofile.profile_id) {
                    lastmsg_date = thisroomRead[i].last_read_msg_timestamp;
                    friendprofile_id = thisroomRead[i].profile_id;
                } else if (thisroomRead[i].profile_id == myprofile.profile_id) {
                    morethandate = thisroomRead[i].datetime_in;
                    mylast_read_msg_id = thisroomRead[i].last_read_msg_id;
                }
                if (thisroomRead[i].is_page == true) {
                    page_profile_id = thisroomRead[i].profile_id;
                }
            }
            let end_msg_query = await models.Rooms.aggregate([
                { $unwind: "$msg" },
                {
                    $match: {
                        "_id": globalService.genMongoId(thisroom._id),
                        "msg.msg_id": { "$gte": mylast_read_msg_id }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        profile_id: "$msg.profile_id",
                        msg_id: "$msg.msg_id",
                        msg_type: "$msg.msg_type",
                        msg_text: "$msg.msg_text",
                    }
                },
                { $sort: { 'msg_id': 1 } }, { $limit: 10 }
            ]);
            let end_msg = end_msg_query[end_msg_query.length - 1];
            //--
            let start_msg_query = await models.Rooms.aggregate([
                { $unwind: "$msg" },
                {
                    $match: {
                        "_id": globalService.genMongoId(thisroom._id),
                        "msg.msg_id": { "$lte": mylast_read_msg_id }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        profile_id: "$msg.profile_id",
                        msg_id: "$msg.msg_id",
                        msg_type: "$msg.msg_type",
                        msg_text: "$msg.msg_text",
                    }
                },
                { $sort: { 'msg_id': -1 } }, { $limit: 10 }
            ]);
            let start_msg = start_msg_query[start_msg_query.length - 1];

            let allmsg_inroom = [];
            if (thisroom.msg.length > 0) {
                allmsg_inroom = await models.Rooms.aggregate([{
                        $lookup: {
                            from: 'profiles',
                            localField: 'profile_id',
                            foreignField: 'msg.profile_id',
                            as: 'profileDetail'
                        }
                    },
                    { $unwind: "$msg" },
                    {
                        $match: {
                            $and: [
                                { "msg.msg_id": { "$gte": start_msg.msg_id } },
                                { "msg.msg_id": { "$lte": end_msg.msg_id } }
                            ],
                            "_id": globalService.genMongoId(thisroom._id),
                            "msg.is_unsend": false,
                            "msg.profile_id_delete": { $ne: myprofile.profile_id },
                            "msg.timestamp": { "$gte": morethandate }
                        }
                    },
                    { $sort: { 'msg.timestamp': 1 } },
                    // { $limit: 300 },
                    {
                        $addFields: {
                            "profileDetail": {
                                "$arrayElemAt": [{
                                    "$filter": {
                                        "input": "$profileDetail",
                                        "as": "comp",
                                        "cond": {
                                            "$eq": ["$$comp.profile_id", "$msg.profile_id"]
                                        }
                                    }
                                }, 0]
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            is_page: {
                                $cond: {
                                    if: {
                                        $eq: ["$msg.profile_id", page_profile_id]
                                    },
                                    then: true,
                                    else: false
                                }
                            },
                            profile_id: "$msg.profile_id",
                            profile_name: { $ifNull: ["$profileDetail.profile_name", "$msg.profile_id"] },
                            profile_image_url: "$profileDetail.profile_image_url",
                            msg_id: "$msg.msg_id",
                            msg_type: "$msg.msg_type",
                            msg_text: "$msg.msg_text",
                            msg_image: {
                                $cond: {
                                    if: {
                                        $eq: ["$msg.msg_image", ""]
                                    },
                                    then: "",
                                    else: { $concat: [globalService.httpPath, '$msg.msg_image'] }
                                }
                            },
                            msg_audio: {
                                $cond: {
                                    if: {
                                        $eq: ["$msg.msg_audio", ""]
                                    },
                                    then: "",
                                    else: { $concat: [globalService.httpPath, '$msg.msg_audio'] }
                                }
                            },
                            msg_cover_video: {
                                $cond: {
                                    if: {
                                        $eq: ["$msg.msg_cover_video", ""]
                                    },
                                    then: "",
                                    else: { $concat: [globalService.httpPath, '$msg.msg_cover_video'] }
                                }
                            },
                            msg_video: {
                                $cond: {
                                    if: {
                                        $eq: ["$msg.msg_video", ""]
                                    },
                                    then: "",
                                    else: { $concat: [globalService.httpPath, '$msg.msg_video'] }
                                }
                            },
                            // is_unsend: "$msg.is_unsend",
                            timestamp: "$msg.timestamp",
                            is_read: {
                                $cond: {
                                    if: { $gte: ["$msg.timestamp", new Date(lastmsg_date)] },
                                    then: 0,
                                    else: 1
                                }
                            }
                        }
                    }
                ]);
            }


            let rulereturn = {};
            let rule_setting = await models.Rule_settings.findOne({
                'rule_name': thisroom.rule_name,
                $or: [
                    { 'profile_id_admin': myprofile_id }, { 'profile_id_admin': friendprofile_id }
                ]
            }, null, { sort: { _id: 1 } });
            if (rule_setting != null && rule_setting != undefined) {
                rulereturn = rule_setting.user_setting;
                for (var i = 0; i < rule_setting.profile_id_admin.length; i++) {
                    if (rule_setting.profile_id_admin[i] == myprofile_id) {
                        rulereturn = rule_setting.admin_setting;
                    }
                }

            } else {
                rule_setting = await models.Rule_settings.findOne({
                    'rule_name': 'NORMAL'
                }, null, { sort: { _id: 1 } });
                rulereturn = rule_setting.user_setting;
            }


            //thisroom.msg = null;
            // let background_url = "";
            // if (thisroom.rule_name == "PAGE") {
            //     let value_in = [];
            //     for (var i = 0; i < thisroom.profile_id_in.length; i++) {
            //         value_in.push(thisroom.profile_id_in[i].profile_id);
            //     }
            //     let pageprofile = await models.Profiles.findOne({ profile_background_url: { $ne: '' }, profile_id: { $in: value_in } }, null, { sort: { _id: 1 } });
            //     if (pageprofile != null) {
            //         background_url = pageprofile.profile_background_url;
            //     }
            // }


            return {
                error: "0",
                msg: "OK",
                result: {
                    mylast_read_msg_id: mylast_read_msg_id,
                    // background_url: background_url,
                    // detail: thisroom,
                    message: allmsg_inroom,
                    rule_setting: rulereturn
                }
            }
        }
        socket.on('joinChatRoomLazyLoad', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "joinChatroom2";
                if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };
                let myprofile = await models.Profiles.findOne({ profile_id: thisdata.profile_id }, null, { sort: { _id: 1 } });
                if (myprofile == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Wrong your profile id", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: "1", msg: 'Wrong your profile id', result: [] });
                    return;
                }
                let thisroom = await models.Rooms.findOne({ _id: globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
                if (thisroom == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Room_id not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: "1", msg: 'Room not found', result: [] });
                    return;
                }


                var indexof_profile_id_join = _.indexOf(thisroom.profile_id_join, myprofile.profile_id);
                if (indexof_profile_id_join == -1) {
                    thisroom.profile_id_join.push(myprofile.profile_id);
                }

                // let last_msg_id = thisroom.msg.length > 0 ? thisroom.msg[thisroom.msg.length - 1].msg_id : "";
                // var myprofile_id_in_index = _.findIndex(thisroom.profile_id_in, { profile_id: myprofile.profile_id });
                // thisroom.profile_id_in[myprofile_id_in_index].last_read_msg_id = last_msg_id;
                // thisroom.profile_id_in[myprofile_id_in_index].last_read_msg_timestamp = new Date().toISOString();


                thisroom.create_update.update_date = new Date().toISOString();
                thisroom.save();
                socket.join(thisroom._id.toString());

                dataSocket.chatSocket[socket.id] = { room_id: thisroom._id.toString(), profile_id: myprofile.profile_id };
                if (typeof dataSocket.chatProfile[myprofile.profile_id] == "undefined") {
                    dataSocket.chatProfile[myprofile.profile_id] = []
                }
                if (dataSocket.chatProfile[myprofile.profile_id].indexOf(socket.id) == -1) {
                    dataSocket.chatProfile[myprofile.profile_id].push(socket.id);
                }

                let thisreturn = await get_allmsgLazyLoad(myprofile, thisroom);
                thisroom.msg = null;
                let background_url = "";
                if (thisroom.rule_name == "PAGE") {
                    let value_in = [];
                    for (var i = 0; i < thisroom.profile_id_in.length; i++) {
                        value_in.push(thisroom.profile_id_in[i].profile_id);
                    }
                    let pageprofile = await models.Profiles.findOne({ profile_background_url: { $ne: '' }, profile_id: { $in: value_in } }, null, { sort: { _id: 1 } });
                    if (pageprofile != null) {
                        background_url = pageprofile.profile_background_url;
                    }
                }
                thisreturn.background_url = background_url;
                thisreturn.detail = thisroom;
                // await storage.setItem("data_socket", dataSocket);
                cb(thisreturn);
            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });
        socket.on('messageLazyLoad', async function(thisdata, cb) {
            try {
                dataSocket.event_name = "message";
                if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'msg_type', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'msg_text', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'msg_image', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'msg_audio', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'msg_cover_video', cb) == false) { return };
                if (globalService.checkParamCallback(thisdata, 'msg_video', cb) == false) { return };

                if (dataSocket.chatProfile[thisdata.profile_id] == undefined) {
                    // globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "node restart", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: "101", msg: 'node restart. please joinChatRoom again', result: [] });
                    return;
                }

                if (thisdata.msg_type != 'TEXT' && thisdata.msg_type != 'IMAGE' && thisdata.msg_type != 'VIDEO') {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "MSG TYPE must be TEXT, IMAGE, VIDEO", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'MSG TYPE must be TEXT, IMAGE, VIDEO', result: [] });
                    return;
                }

                let myprofile = await models.Profiles.findOne({ profile_id: thisdata.profile_id }, null, { sort: { _id: 1 } });
                if (myprofile == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Wrong your profile id", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Wrong your profile id', result: [] });
                    return;
                }
                let thisroom = await models.Rooms.findOne({ _id: globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
                if (thisroom == null) {
                    globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "room_id not found", "SOCKET", JSON.stringify(thisdata));
                    cb({ error: '1', msg: 'Room not found', result: [] });
                    return;
                }
                if (thisroom.profile_id_block.find(item => {
                        return item == myprofile.profile_id
                    }) != undefined && thisroom.room_type == "SINGLE") {
                    cb({ error: '1', msg: 'You have blocked this friend can not send msg', result: [] });
                    return;
                }


                let msg_txt = thisdata.msg_text;
                if (thisdata.msg_type == "IMAGE") {
                    msg_txt = "รูปภาพ";
                } else if (thisdata.msg_type == "VIDEO") {
                    msg_txt = "VDO";
                }
                let new_msg = {
                    "msg_id": globalService.genMongoId(), // mongoid genarate
                    "profile_id": thisdata.profile_id, //เข้าของ msg
                    "msg_type": thisdata.msg_type, // TEXT, IMAGE, VIDEO....
                    "msg_text": msg_txt,
                    "msg_image": thisdata.msg_image,
                    "msg_audio": thisdata.msg_audio, //กรณีไม่ใช่ TEXT เอาไว้เก็บ link
                    "msg_cover_video": thisdata.msg_cover_video, //กรณีเป็น video
                    "msg_video": thisdata.msg_video,
                    // "is_unsend": false,
                    // "profile_id_delete": [],//ใส่ profile_id ที่คนนั้นกดลบ msg_id นี้
                    "timestamp": new Date().toISOString(),

                    "profile_name": myprofile.profile_name,
                    "profile_image_url": myprofile.profile_image_url,
                    "is_read": thisroom.profile_id_join.length > 1 ? 1 : 0
                }
                let new_msg_for_cb = {
                    "msg_id": new_msg.msg_id, // mongoid genarate
                    "profile_id": thisdata.profile_id, //เข้าของ msg
                    "msg_type": thisdata.msg_type, // TEXT, IMAGE, VIDEO....
                    "msg_text": msg_txt,
                    "msg_image": thisdata.msg_image,
                    "msg_audio": thisdata.msg_audio, //กรณีไม่ใช่ TEXT เอาไว้เก็บ link
                    "msg_cover_video": thisdata.msg_cover_video, //กรณีเป็น video
                    "msg_video": thisdata.msg_video,
                    // "is_unsend": false,
                    // "profile_id_delete": [],//ใส่ profile_id ที่คนนั้นกดลบ msg_id นี้
                    "timestamp": new Date().toISOString(),

                    "profile_name": myprofile.profile_name,
                    "profile_image_url": myprofile.profile_image_url,
                    "is_read": thisroom.profile_id_join.length > 1 ? 1 : 0
                }
                let page_profile_id = "";
                let all_friend_profile_id = [];
                thisroom.profile_id_in.find(function(item, i) {
                    if (thisroom.profile_id_in[i].first_msg_id == "") {
                        thisroom.profile_id_in[i].first_msg_id = new_msg.msg_id;
                    }
                    if (item.profile_id == thisdata.profile_id) {
                        thisroom.profile_id_in[i].last_read_msg_id = new_msg.msg_id;
                        thisroom.profile_id_in[i].last_read_msg_timestamp = new Date().toISOString();
                        thisroom.profile_id_in[i].last_send_msg_id = new_msg.msg_id;
                        thisroom.profile_id_in[i].last_send_msg_timestamp = new_msg.timestamp;
                    }

                    if (item.profile_id != myprofile.profile_id) {
                        var indexof = _.indexOf(thisroom.profile_id_join, item.profile_id);
                        if (indexof == -1) {
                            all_friend_profile_id.push(item.profile_id);
                        }
                    }
                    if (item.is_page == true) {
                        page_profile_id = item.profile_id;
                    }
                });

                let can_emit = true;
                //case room SINGEL only ถ้าถูกblockอยู่ คู่สนทนาจะ isdelete true เพื่อให้มองไม่เห็น
                if (thisroom.room_type == "SINGLE") {
                    let friend_profile_id = thisroom.profile_id_block.find(item => {
                        return item != myprofile.profile_id
                    })

                    if (friend_profile_id != undefined) {
                        new_msg.profile_id_delete.push(friend_profile_id);
                        can_emit = false;
                    }
                }

                if (can_emit == false) { //ถ้าถูกblock จะไม่ emit

                } else {
                    let last_msg_id = "";
                    if (thisroom.msg.length > 0) {
                        last_msg_id = thisroom.msg[thisroom.msg.length - 1].msg_id;
                    }
                    new_msg_for_cb.msg_image = new_msg_for_cb.msg_image != "" ? globalService.httpPath + new_msg_for_cb.msg_image : "";
                    new_msg_for_cb.msg_video = new_msg_for_cb.msg_video != "" ? globalService.httpPath + new_msg_for_cb.msg_video : "";
                    new_msg_for_cb.msg_cover_video = new_msg_for_cb.msg_cover_video != "" ? globalService.httpPath + new_msg_for_cb.msg_cover_video : "";
                    new_msg_for_cb.msg_audio = new_msg_for_cb.msg_audio != "" ? globalService.httpPath + new_msg_for_cb.msg_audio : "";
                    new_msg_for_cb.is_page = (page_profile_id == new_msg_for_cb.profile_id ? true : false);
                    io.to(thisroom._id.toString()).emit('messageLazyLoad', { last_msg_id: last_msg_id, new_msg: new_msg_for_cb });
                }

                new_msg.is_unsend = false
                new_msg.profile_id_delete = []

                //--------------
                thisroom.msg.push(new_msg);


                if (thisroom.profile_id_block.length == 0) {
                    thisroom.profile_id_hide = []; //เมื่อมีใครทักมาต้องปลดให้คู่สนทนากลับมาเห็นเหมือนเดิม
                    thisroom.profile_id_in.find(function(item, i) {
                        io.to(item.profile_id.toString()).emit('chatList', {});
                    });
                }
                thisroom.save();

                //
                setTimeout(async function() {
                    cb(await get_allmsgLazyLoad(myprofile, thisroom)); //ตัวเอง ui ต้องห้ามรับ socket.on message ให้ล้างห้องแล้ว bind ด้วย cbitem.result.message แล้วเลื่อน scroll มาล่างสุด
                }, 1000);
            } catch (e) {
                globalService.dumpError(e);
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: e, result: [] });
            }
        });
    });
};