"use strict"
const _ = require("underscore");
// const storage = require('node-persist');
//กรณีคนไข้โทรหาหมอ และหมอ joinInApp อยู่จะสั่นเฉพาะเครื่องของหมอจริงๆเท่านั้น และเครื่องสวมทุกเครื่องจะไม่ได้รับ noti (mode ปกติ)
//กรณีคนไข้โทรหาหมอ และหมอไม่ได้ joinInApp เครื่องหมอและเครื่องสวมสิทธิทุกเครื่องจะได้ noti เมื่อคนไข้ยกเลิกการโทร(ก่อนหมอรับสาย)จะได้รับ noti 'content_type': 'cancel_call' ทุกเครื่อง
//กรณีอื่นๆ เช่น คนโทรหาคน, หมอโทรหาคนไข้, PAGEโทรหาคน เครื่องปลายทางมี profile เดียว จะเข้า mode ปกติ ถ้า joinInApp อยู่เครื่องจะสั่น ถ้าไม่ได้ joinInApp จะได้ noti
//คนโทรหาPAGE ไม่มีนะครับ

//ปัจจุบัน 2020/jan/05 ยังไม่รองรับการโทรในห้องกลุ่ม
module.exports = function(io, socket, globalService, models, modelService, dataSocket, storage) {
    // callSocket [socket.id] = profile_id, room_id(*ถ้า!=""แสดงว่ากำลังถูกเรียกหรือมีการคุยสายอยู่..)
    // callProfile [profile.id] = [socket.id]
    // callRoom [room_id] = calling_detail_id , calling_type, sockets : [socket.id], profile_id : [profile_id]*callingมีใครเคยคุยบ้าง
    socket.on('joinInApp', async function(thisdata, cb) {
        try {
            dataSocket.event_name = "joinInApp";
            if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
            if (globalService.checkParamCallback(thisdata, 'device_token', cb) == false) { return };
            if (globalService.checkParamCallback(thisdata, 'device_id', cb) == false) { return };
            if (globalService.checkParamCallback(thisdata, 'os', cb) == false) { return };

            let myprofile_check = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
            if (myprofile_check == null) {
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "Wrong your profile id", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: 'Wrong your profile id', result: [] });
                return;
            }

            let mydata = {
                device_token: thisdata.device_token,
                device_id: thisdata.device_id,
                lasted_socket_id: socket.id,
                lasted_os: thisdata.os,
            }
            let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
            if (myprofile == false) {
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "profile " + thisdata.profile_id + " not found in timeline db", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: 'profile not found', result: [] });
                return;
            } else {
                dataSocket.callSocket[socket.id] = { room_id: "", profile_id: myprofile._id.toString() };
                if (typeof dataSocket.callProfile[myprofile._id.toString()] == "undefined") {
                    dataSocket.callProfile[myprofile._id.toString()] = [];
                }
                if (dataSocket.callProfile[myprofile._id.toString()].indexOf(socket.id) == -1) {
                    dataSocket.callProfile[myprofile._id.toString()].push(socket.id);
                }
            }

            delete dataSocket.callNotiProfile[thisdata.profile_id];
            // await storage.setItem("data_socket", dataSocket);
            let itemreturn = {
                limit_waiting_call: 15000,
                limit_calling_time: 1800000
            }
            cb({ error: "0", msg: 'Join inApp success', result: itemreturn });
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
            cb({ error: "1", msg: e, result: [] });
        }
    });
    socket.on('leaveInApp', async function(thisdata, cb) {
        try {
            dataSocket.event_name = "leaveInApp";
            if (dataSocket.callSocket[socket.id] == undefined) {
                // globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "node restart", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "102", msg: 'node restart. please handle', result: [] });
                return;
            }
            let profile_id = dataSocket.callSocket[socket.id].profile_id;
            let room_id = dataSocket.callSocket[socket.id].room_id;

            delete dataSocket.callNotiProfile[profile_id];
            delete dataSocket.callSocket[socket.id];
            var index = dataSocket.callProfile[profile_id].indexOf(socket.id);
            if (index > -1) {
                dataSocket.callProfile[profile_id].splice(index, 1);

            }
            if (dataSocket.callProfile[profile_id].length == 0) {
                delete dataSocket.callProfile[profile_id];
            }

            //กรณีอยู่ดีๆเราปิดapp และมีการคุยค้างอยู่ ต้องแจ้งให้คู่สนทนาหลุดด้วย
            if (room_id != "" && dataSocket.callRoom[room_id] != undefined) {
                var indexOfSocket = _.indexOf(dataSocket.callRoom[room_id].sockets, socket.id);
                if (indexOfSocket > -1) {
                    dataSocket.callRoom[room_id].sockets.splice(indexOfSocket, 1);
                }
                if (dataSocket.callRoom[room_id].sockets.length <= 1) {
                    // calling_detail_id
                    let thisroom = await models.rooms.findOne({ 'room_type': 'SINGLE', '_id': globalService.genMongoId(room_id) }, null, { sort: { _id: 1 } });
                    if (dataSocket.callRoom[room_id].calling_detail_id != null) { //ถ้ามีคุยสายค้างอยู่แล้ว leaveInApp ต้องสรุปการโทร แต่ถ้าไม่มีสายค้างก็ leaveInApp ออกไปเลย
                        let thiscalling_detail = await modelService.updateCallingDetailToDb(dataSocket.callRoom[room_id].calling_detail_id, "สายหลุด");
                        await modelService.pushMessageEndCall(thiscalling_detail.calling_type, thisroom, profile_id, "สายหลุด");
                    }

                    delete dataSocket.callRoom[room_id];
                    io.to("call_" + room_id.toString()).emit('leaveCall', { room_id: room_id });
                }
            }
            // await storage.setItem("data_socket", dataSocket);
            cb({ error: "0", msg: 'Leave inApp success', result: [] });
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
            cb({ error: "1", msg: e, result: [] });
        }
    });

    //brockโทรหาจืด
    socket.on('callingInApp', async function(thisdata, cb) {
        try {
            dataSocket.event_name = "callingInApp";
            if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return }; //brook
            if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return }; //room
            if (globalService.checkParamCallback(thisdata, 'calling_type', cb) == false) { return }; //can be "VOICE_CALL", "VIDEO_CALL"
            if (thisdata.calling_type != "VOICE_CALL" && thisdata.calling_type != "VIDEO_CALL") {
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "calling_type can br VIDEO_CALL, VOICE_CALL only", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: 'calling_type can br VIDEO_CALL, VOICE_CALL only', result: [] });
                return;
            }
            if (dataSocket.callProfile[thisdata.profile_id] == undefined) {
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "node restart", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "102", msg: 'node restart. please handle', result: [] });
                return;
            }

            let thisroom = await models.rooms.findOne({
                'room_type': 'SINGLE',
                '_id': globalService.genMongoId(thisdata.room_id)
            }, null, { sort: { _id: 1 } });
            if (thisroom == null) {
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "room_id not found", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: 'Room not found', result: [] });
                return;
            }
            let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
            if (myprofile == null) {
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "profile_id not found", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: 'Wrong your profile id', result: [] });
                return;
            }

            var friendprofile_id_in = _.filter(thisroom.profile_id_in, function(value) {
                return value.profile_id != thisdata.profile_id;
            });
            let friendprofile_id = friendprofile_id_in[0].profile_id;
            let friendprofile = await models.profiles.findOne({ _id: globalService.genMongoId(friendprofile_id) }, null, { sort: { _id: 1 } });
            if (friendprofile == null) {
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "friend_profile_id not found", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: 'Wrong your friend profile id', result: [] });
                return;
            }

            let friend_sockets = dataSocket.callProfile[friendprofile._id.toString()];
            let cb_msg = "Ok";
            let friend_socket_avaliable = false;
            //บรรทัดต่อไปนี้คือ feature 1profile ใช้หลาย device 
            if (friend_sockets != undefined) {
                //กรณีมีเครื่องจืดซักเครื่อง on socket อยู่

                for (var i = 0; i < friend_sockets.length; i++) {
                    if (dataSocket.callSocket[friend_sockets[i]] == null) { //กันกรณี socket เพื่อนหลุดและลบออกไม่ทัน
                        continue;
                    }
                    if (dataSocket.callSocket[friend_sockets[i]].room_id == "") {
                        //ส่ง socket brook เครื่องที่โทรออกให้จืดทุกเครื่อง เฉพาะเครื่องที่ยังไม่ถูกเรียก(room_id=="") และทำให้เข้าหน้ารอสาย
                        dataSocket.callSocket[friend_sockets[i]] = { room_id: thisroom._id.toString(), profile_id: friendprofile_id };
                        io.to(friend_sockets[i]).emit('callingInApp', { 'calling_type': thisdata.calling_type, 'call_socket_id': socket.id, 'room_id': thisroom._id.toString(), 'friend_profile_id': myprofile._id.toString(), 'friend_profile_name': myprofile.name, 'friend_profile_image_url': myprofile.image_url }); //คืน profile my name image_url, my.profile_id 

                        friend_socket_avaliable = true;
                    }
                }
            } else {
                friend_socket_avaliable = true;
                //ถ้าเข้าที่นี่ ต้องทำ send noti เพื่อกระตุกให้เข้าโหมดรอรับสาย ให้เครื่องจืดทุกเครื่อง
                if (dataSocket.callNotiProfile[friendprofile_id]) {
                    dataSocket.callSocket[socket.id] = { room_id: "", profile_id: thisdata.profile_id };
                    let new_msg = await modelService.pushMessageEndCall(thisdata.calling_type, thisroom, thisdata.profile_id, "สายไม่ว่าง");
                    // await storage.setItem("data_socket", dataSocket);
                    new_msg.profile_name = myprofile.name;
                    new_msg.profile_image_url = myprofile.image_url;
                    new_msg.is_read = thisroom.profile_id_join.length > 1 ? 1 : 0;

                    let item_emit = {
                        message: new_msg
                    }
                    io.to(thisroom._id.toString()).emit('message', item_emit);
                    cb({ error: "1", msg: "สายไม่ว่าง", result: { call_socket_id: socket.id } });
                } else {
                    dataSocket.callNotiProfile[friendprofile_id] = true;
                    let datanoti = { //ส่งไปหาจืด
                        'title': myprofile.name,
                        'message': "มีสายเรียกเข้าถึงคุณ",
                        'content_type': 'call',
                        'calling_type': thisdata.calling_type,
                        'call_socket_id': socket.id,
                        'room_id': thisroom._id.toString(),
                        'friend_profile_id': myprofile._id.toString(), //profile_id brook
                        'friend_profile_name': myprofile.name,
                        'friend_profile_image_url': myprofile.image_url
                    }
                    let android_registrationIds = [];
                    let ios_registrationIds = [];
                    if (friendprofile.lasted_os == "ios") {
                        ios_registrationIds = [friendprofile.device_token];
                    } else if (friendprofile.lasted_os == "android") {
                        android_registrationIds = [friendprofile.device_token];
                    }

                    let itemreturn_ios = await globalService.sendNotiFCM(datanoti.title, datanoti.message, ios_registrationIds, datanoti, 'ios');
                    let itemreturn_android = await globalService.sendNotiFCM(datanoti.title, datanoti.message, android_registrationIds, datanoti, 'android');


                }

                cb_msg = "No one online.";
            }
            if (friend_socket_avaliable) {
                dataSocket.callSocket[socket.id] = { room_id: thisroom._id.toString(), profile_id: thisdata.profile_id };
                //กรณีมีเครื่องจืดอย่างน้อง1 เครื่องสามารถรอสายได้ ให้เครื่อง brook join room ทิ้งไว้โดยส่ง cb ข้อมูลของจืดกลับไปแสดงที่เครื่อง brook
                socket.join("call_" + thisroom._id.toString());

                dataSocket.callRoom[thisroom._id.toString()] = { "calling_detail_id": null, "calling_type": thisdata.calling_type, "sockets": [], "profile_id": [] };
                dataSocket.callRoom[thisroom._id.toString()].sockets.push(socket.id);

                var indexOfSocket = _.indexOf(dataSocket.callRoom[thisdata.room_id].profile_id, thisdata.profile_id);
                if (indexOfSocket == -1) {
                    dataSocket.callRoom[thisdata.room_id].profile_id.push(thisdata.profile_id);
                }
                // await storage.setItem("data_socket", dataSocket);
                //call_socket_id ของ brook(คนโทร) cb กลับไปให้ตัวเองด้วย
                cb({ error: "0", msg: cb_msg, result: { 'call_socket_id': socket.id, 'room_id': thisroom._id, 'friend_profile_id': friendprofile._id.toString(), 'friend_profile_name': friendprofile.name, 'friend_profile_image_url': friendprofile.image_url } }); //คืน profile friend name image_url, friend.profile_id 
            } else {
                //กรณีเครื่องจืดทุกเครื่องกำลังคุยสายอยู่ ไม่มีเครื่องว่างเลย.
                dataSocket.callSocket[socket.id] = { room_id: "", profile_id: thisdata.profile_id };
                let new_msg = await modelService.pushMessageEndCall(thisdata.calling_type, thisroom, thisdata.profile_id, "สายไม่ว่าง");
                // await storage.setItem("data_socket", dataSocket);
                new_msg.profile_name = myprofile.name;
                new_msg.profile_image_url = myprofile.image_url;
                new_msg.is_read = thisroom.profile_id_join.length > 1 ? 1 : 0;

                let item_emit = {
                    message: new_msg
                }
                io.to(thisroom._id.toString()).emit('message', item_emit);
                cb({ error: "1", msg: "สายไม่ว่าง", result: { call_socket_id: socket.id } });
            }


        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
            cb({ error: "1", msg: e.message, result: [] });
        }

    });
    //jeudรับสาย
    socket.on('acceptCall', async function(thisdata, cb) {
        try {
            dataSocket.event_name = "acceptCall";
            if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
            if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };
            if (globalService.checkParamCallback(thisdata, 'call_socket_id', cb) == false) { return }; //เครื่อง brookที่โทร
            if (globalService.checkParamCallback(thisdata, 'calling_type', cb) == false) { return };

            if (dataSocket.callProfile[thisdata.profile_id] == undefined) {
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "node restart", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "102", msg: 'node restart. please handle', result: [] });
                return;
            }
            if (dataSocket.callRoom[thisdata.room_id] == undefined) {
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "wrong room_id in datasocket", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "102", msg: 'wrong room_id', result: [] });
                return;
            }

            let thisroom = await models.rooms.findOne({ '_id': globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
            if (thisroom == null) {
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "room_id not found", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: 'Room not found', result: [] });
                return;
            }

            var friendprofile_id_in = _.filter(thisroom.profile_id_in, function(value) {
                return value.profile_id != thisdata.profile_id;
            });
            let myprofile_id = thisdata.profile_id;
            let friendprofile_id = friendprofile_id_in[0].profile_id;

            let my_sockets = dataSocket.callProfile[thisdata.profile_id];
            if (dataSocket.callSocket[thisdata.call_socket_id] == undefined) {
                //กรณีจืดรับสายแต่เครื่อง brook ที่ใช้โทรหายไปแล้ว ต้องให้เครื่องจืดทุกเครื่องที่เกี่ยวกับห้องนี้ leaveCall ให้หมด
                for (var i = 0; i < my_sockets.length; i++) {
                    if (dataSocket.callSocket[my_sockets[i]].room_id == thisdata.room_id) {
                        io.to(my_sockets[i]).emit('leaveCall', { room_id: thisdata.room_id });
                    }
                }
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "friend has disappeared", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: 'friend has disappeared', result: [] });
                return;
            }

            for (var i = 0; i < my_sockets.length; i++) {
                //กรณีรับสายตามปกติ ต้องทำให้เครื่องของจืดที่ไม่ใช่เครื่องที่รับสาย และเครื่องที่ไม่ได้กำลังคุยอยู่กะคนอื่น พวกนี้หยุดสั่น เพื่อเข้าสู่โหมดปกติ
                if (my_sockets[i] != socket.id) { //เครื่องจืดที่ไม่ได้รับสาย
                    if (dataSocket.callSocket[my_sockets[i]].room_id == thisdata.room_id) { //เครื่องจืดที่กำลังถูกเรียกที่การโทรนี้
                        io.to(my_sockets[i]).emit('leaveCall', { room_id: thisdata.room_id }); //leave call ให้หมด
                    }
                }

            }
            dataSocket.callSocket[socket.id] = { room_id: thisdata.room_id, profile_id: thisdata.profile_id };
            dataSocket.callSocket[thisdata.call_socket_id] = { room_id: thisdata.room_id, profile_id: friendprofile_id };

            let new_calling_detail = await modelService.saveCallingDetailToDb(thisdata.room_id, thisroom.room_type, thisdata.calling_type, [friendprofile_id, myprofile_id]);
            io.to(thisdata.call_socket_id).emit('acceptCall', { 'room_id': thisroom._id, 'calling_detail_id': new_calling_detail._id.toString() }); //เพื่อให้ brook รู้ว่าจืดรับสายแล้ว
            socket.join("call_" + thisroom._id.toString()); //เครื่องจืดที่รับสาย join ซะ

            dataSocket.callRoom[thisroom._id.toString()].calling_detail_id = new_calling_detail._id.toString();
            dataSocket.callRoom[thisroom._id.toString()].sockets.push(socket.id);
            var indexOfSocket = _.indexOf(dataSocket.callRoom[thisroom._id.toString()].profile_id, thisdata.profile_id);
            if (indexOfSocket == -1) {
                dataSocket.callRoom[thisroom._id.toString()].profile_id.push(thisdata.profile_id);
            }


            delete dataSocket.callNotiProfile[myprofile_id];
            delete dataSocket.callNotiProfile[friendprofile_id];
            //----กรณีรับสาย เครื่องอื่นๆต้องได้ noti ปิดการโทร กรณีมีหลาย device ที่ใช้ profile_id เดียวกัน เมื่อก่อนใช้กับหมอที่ สามารถสวมสิทธิ์ได้
            // if (thisroom.rule_name == "DOCTOR" && friendprofile_id_in[0].is_page != true) { //เป็นห้องหมอ  คนไข้โทรหาหมอและหมอกดปฏิเสธสาย หมอเครื่องอื่นๆต้องได้รับ noti ปิดการโทร
            //     let thisdoctor_register = await models.Doctor_registers.findOne({ profile_id: myprofile_id }, null, { sort: { _id: 1 } });

            //     let ios_registrationIds = [];
            //     let android_registrationIds = [];
            //     for (var i = 0; i < thisdoctor_register.profile_device_tokens.length; i++) {
            //         if (thisdoctor_register.profile_device_tokens[i].os == "android") {
            //             android_registrationIds.push(thisdoctor_register.profile_device_tokens[i].device_token);
            //         } else if (thisdoctor_register.profile_device_tokens[i].os == "ios") {
            //             ios_registrationIds.push(thisdoctor_register.profile_device_tokens[i].device_token);
            //         }
            //     }
            //     let datanoti = {
            //         'title': 'ยกเลิกการโทรสาย',
            //         'message': "ยกเลิกการโทรสายแล้ว",
            //         'content_type': 'cancel_call',
            //         'room_id': thisroom._id.toString(),
            //         'rule_name': thisroom.rule_name
            //     }
            //     let itemreturn_ios = await globalService.sendNotiFCM(datanoti.title, datanoti.message, ios_registrationIds, datanoti, 'ios');
            //     let itemreturn_android = await globalService.sendNotiFCM(datanoti.title, datanoti.message, android_registrationIds, datanoti, 'android');
            // }
            // await storage.setItem("data_socket", dataSocket);
            cb({ error: "0", msg: "Ok", result: thisroom._id, calling_detail_id: new_calling_detail._id.toString() });
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
            cb({ error: "1", msg: e, result: [] });
        }
    });

    //msg อยู่ฝั่งคนโทร (brook)
    //ปฏิเสธสาย=คนรับกดวาง push msg "ยกเลิกการโทร"  type : REJECT
    //ยกเลิก calling push msg "ยกเลิกการโทร"  type : CANCLE
    //ไม่ได้รับสาย push msg "ไม่ได้รับสาย" type : NOT_ACCEPT 
    //req call_socket_id -> soket -> profile -> send message
    //jeud หรือbrook กดปฏิเสธสาย หรือหมดเวลารอรับสาย ขณะกำลัง calling.
    socket.on('cancelCall', async function(thisdata, cb) {
        try {
            dataSocket.event_name = "cancelCall";

            if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return }; //profile เครื่องที่ทำ event เข้ามา
            if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };
            if (globalService.checkParamCallback(thisdata, 'cancel_type', cb) == false) { return }; // REJECT, CANCEL, NOT_ACCEPT
            if (globalService.checkParamCallback(thisdata, 'call_socket_id', cb) == false) { return }; //เครื่องคู่สนทนา
            if (globalService.checkParamCallback(thisdata, 'calling_type', cb) == false) { return };

            if (dataSocket.callProfile[thisdata.profile_id] == undefined) {
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "node restart", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "102", msg: 'node restart. please handle', result: [] });
                return;
            }
            let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
            let thisroom = await models.rooms.findOne({ 'room_type': 'SINGLE', '_id': globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
            if (thisroom == null) {
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "room_id not found", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: 'Room not found', result: [] });
                return;
            }

            var friendprofile_id_in = _.filter(thisroom.profile_id_in, function(value) {
                return value.profile_id != thisdata.profile_id;
            });

            delete dataSocket.callNotiProfile[thisdata.profile_id];
            delete dataSocket.callNotiProfile[friendprofile_id_in[0].profile_id];

            let new_msg_text = "";
            let new_msg_profile_id = "";
            if (thisdata.cancel_type == "REJECT") { // คนรับกดปฏิเสธสาย jeud กด..
                //ฝั่งคนรับมีได้มากกว่า 1 Device
                //ค่าที่ส่งมา profile คือของคนรับ
                //นำค่า Profile Id ไปหา soket (device:n) เพื่อเเจ้งทุก Device ให้ stop
                let profileReceipt = thisdata.profile_id
                var all_socket = dataSocket.callProfile[profileReceipt];
                for (var i = 0; i < all_socket.length; i++) {
                    //เครื่องจืดทุกเครื่อง ที่ทำงานอยู่ห้องนี้ หยุดสั่น และเข้าสู่โหมดปกติ
                    io.to(all_socket[i]).emit('leaveCall', { room_id: thisdata.room_id });
                }
                //---------ใช้กรณี 1profile ใช้หลาย device เมื่อก่อนใช้กรณีหมอที่สวมสิทธิ์กันได้
                // let datanoti = {
                //     'title': 'ยกเลิกการโทรสาย',
                //     'message': "ยกเลิกการโทรสายแล้ว",
                //     'content_type': 'cancel_call',
                //     'room_id': thisroom._id.toString()
                // }
                // if (thisroom.rule_name == "DOCTOR" && friendprofile_id_in[0].is_page == false) { //เป็นห้องหมอ  คนไข้โทรหาหมอและหมอกดปฏิเสธสาย หมอเครื่องอื่นๆต้องได้รับ noti ปิดการโทร
                //     let thisdoctor_register = await models.Doctor_registers.findOne({ profile_id: myprofile.profile_id }, null, { sort: { _id: 1 } });
                //     let ios_registrationIds = [];
                //     let android_registrationIds = [];
                //     for (var i = 0; i < thisdoctor_register.profile_device_tokens.length; i++) {
                //         if (thisdoctor_register.profile_device_tokens[i].os == "android") {
                //             android_registrationIds.push(thisdoctor_register.profile_device_tokens[i].device_token);
                //         } else if (thisdoctor_register.profile_device_tokens[i].os == "ios") {
                //             ios_registrationIds.push(thisdoctor_register.profile_device_tokens[i].device_token);
                //         }
                //     }
                //     let itemreturn_ios = await globalService.sendNotiFCM(datanoti.title, datanoti.message, ios_registrationIds, datanoti, 'ios');
                //     let itemreturn_android = await globalService.sendNotiFCM(datanoti.title, datanoti.message, android_registrationIds, datanoti, 'android');
                // }
                //---------
                if (dataSocket.callSocket[thisdata.call_socket_id] != undefined) {
                    //ให้เครื่อง brook ที่โทรหาหยุดสั่น และเข้าสู่โหมดปกติ
                    io.to(thisdata.call_socket_id).emit('leaveCall', { room_id: thisdata.room_id });
                }

                new_msg_text = "ปฏิเสธสาย";
                new_msg_profile_id = thisdata.profile_id;
            } else if (thisdata.cancel_type == "CANCEL") { //คนโทรกดยกเลิก brook กด
                //ฝั่งคนโทร เท่านั้นที่จะยิงมา ซึ่งจะมีเพียง 1 เครือง
                //ค่าที่ส่งมา profile คือของคนโทร
                //ดังนั้นจะต้อง ส่ง emit stop ไปให้เพื่อน ซึ่งเพื่อนอาจจะมีได้มากกว่า 1 เครื่อง
                //หาเพื่อน FriendProileId ได้จาก Room เเละ เช็คว่าไม่ตรงกับ ProfileID ตัวเอง
                //เงื่อนไข เพื่อนจะต้องไม่ได้กำลังคุยอยุ่ห้องใดๆ เลย
                var profileCalling = friendprofile_id_in[0].profile_id;
                var all_socket_friend = dataSocket.callProfile[profileCalling];
                if (all_socket_friend != undefined) {
                    // ให้เครื่องจืดทุกเครื่องที่กำลังทำงานอยู่ห้องนี้ หยุดสั่น และเข้าสู่โหมดปกติ
                    for (var i = 0; i < all_socket_friend.length; i++) {
                        io.to(all_socket_friend[i]).emit('leaveCall', { room_id: thisdata.room_id });
                        if (dataSocket.callSocket[all_socket_friend[i]] != undefined && dataSocket.callSocket[all_socket_friend[i]].room_id == thisdata.room_id) {

                        }

                    }
                }
                if (dataSocket.callProfile[profileCalling] == undefined) {
                    //เครื่องจืดไม่ได้ joinInApp อยู่
                    let datanoti = {
                        'title': 'ยกเลิกการโทรสาย',
                        'message': "ยกเลิกการโทรสายแล้ว",
                        'content_type': 'cancel_call',
                        'room_id': thisroom._id.toString()
                    }
                    if (1 == 0) { //thisroom.rule_name == "DOCTOR" && friendprofile_id_in[0].is_page == true เป็นห้องหมอ และคนไข้กดยกเลิกสาย
                        //ส่งไปหาจืด(คุณหมอ)
                        // let thisdoctor_register = await models.Doctor_registers.findOne({ profile_id: friendprofile_id_in[0].profile_id }, null, { sort: { _id: 1 } });
                        // let ios_registrationIds = [];
                        // let android_registrationIds = [];
                        // for (var i = 0; i < thisdoctor_register.profile_device_tokens.length; i++) {
                        //     if (thisdoctor_register.profile_device_tokens[i].os == "android") {
                        //         android_registrationIds.push(thisdoctor_register.profile_device_tokens[i].device_token);
                        //     } else if (thisdoctor_register.profile_device_tokens[i].os == "ios") {
                        //         ios_registrationIds.push(thisdoctor_register.profile_device_tokens[i].device_token);
                        //     }
                        // }
                        // let itemreturn_ios = await globalService.sendNotiFCM(datanoti.title, datanoti.message, ios_registrationIds, datanoti, 'ios');
                        // let itemreturn_android = await globalService.sendNotiFCM(datanoti.title, datanoti.message, android_registrationIds, datanoti, 'android');
                    } else {
                        //ห้องปกติ ปลายทาง profile ตรงไปตรงมา
                        let friendprofile = await models.profiles.findOne({ _id: globalService.genMongoId(profileCalling) }, null, { sort: { _id: 1 } });
                        if (friendprofile.lasted_os == "ios") {
                            let ios_registrationIds = [friendprofile.device_token];
                            let itemreturn_ios = await globalService.sendNotiFCM(datanoti.title, datanoti.message, ios_registrationIds, datanoti, 'ios');
                        } else if (friendprofile.lasted_os == "android") {
                            let android_registrationIds = [friendprofile.device_token];
                            let itemreturn_android = await globalService.sendNotiFCM(datanoti.title, datanoti.message, android_registrationIds, datanoti, 'android');
                        }
                    }
                }
                //ให้เครื่อง brook ที่โทรหาหยุดสั่น และเข้าสู่โหมดปกติ
                io.to(socket.id).emit('leaveCall', { room_id: thisdata.room_id });
                new_msg_text = "ยกเลิกการโทร";
                new_msg_profile_id = thisdata.profile_id;
            } else if (thisdata.cancel_type == "NOT_ACCEPT") { //brook กด
                //เกิดจังหวะที่คนโทร รอจนหมดเวลา รอสาย
                //ค่าที่ส่งมา Profile ID คือของคนที่โทร
                var profileCalling = friendprofile_id_in[0].profile_id;
                var all_socket_friend = dataSocket.callProfile[profileCalling];
                if (all_socket_friend != undefined) {
                    //เครื่องจืดทุกเครื่อง ที่อยู่ระหว่างรอรับสายเฉพาะห้องนี้ ทุกเครื่องหยุดสั่น และเข้าสู่โหมดปกติ
                    for (var i = 0; i < all_socket_friend.length; i++) {
                        io.to(all_socket_friend[i]).emit('leaveCall', { room_id: thisdata.room_id }); //เครื่องจืดทุกเครื่องที่กำลังทำงานอยู่ห้องนี้หยุดสั่น
                        if (dataSocket.callSocket[all_socket_friend[i]] != undefined && dataSocket.callSocket[all_socket_friend[i]].room_id == thisdata.room_id) {

                        }

                    }
                }
                if (dataSocket.callProfile[profileCalling] == undefined) {
                    //เครื่องจืดไม่ได้ joinInApp อยู่ ต้องยกเลิก noti สายเข้า
                    let datanoti = {
                        'title': 'ยกเลิกการโทรสาย',
                        'message': "ยกเลิกการโทรสายแล้ว",
                        'content_type': 'cancel_call',
                        'room_id': thisroom._id.toString()
                    }
                    if (0 == 1) { //thisroom.rule_name == "DOCTOR" && friendprofile_id_in.is_page == true เป็นห้องหมอ และคนไข้กดยกเลิกสาย
                        //ส่งไปหาจืด(คุณหมอ)
                        // let thisdoctor_register = await models.Doctor_registers.findOne({ profile_id: friendprofile_id_in.profile_id }, null, { sort: { _id: 1 } });
                        // let ios_registrationIds = [];
                        // let android_registrationIds = [];
                        // for (var i = 0; i < thisdoctor_register.profile_device_tokens.length; i++) {
                        //     if (thisdoctor_register.profile_device_tokens[i].os == "android") {
                        //         android_registrationIds.push(thisdoctor_register.profile_device_tokens[i].device_token);
                        //     } else if (thisdoctor_register.profile_device_tokens[i].os == "ios") {
                        //         ios_registrationIds.push(thisdoctor_register.profile_device_tokens[i].device_token);
                        //     }
                        // }
                        // let itemreturn_ios = await globalService.sendNotiFCM(datanoti.title, datanoti.message, ios_registrationIds, datanoti, 'ios');
                        // let itemreturn_android = await globalService.sendNotiFCM(datanoti.title, datanoti.message, android_registrationIds, datanoti, 'android');
                    } else {
                        //ห้องปกติ ปลายทาง profile ตรงไปตรงมา
                        let friendprofile = await models.profiles.findOne({ _id: globalService.genMongoId(profileCalling) }, null, { sort: { _id: 1 } });
                        if (friendprofile.lasted_os == "ios") {
                            let ios_registrationIds = [friendprofile.device_token];
                            let itemreturn_ios = await globalService.sendNotiFCM(datanoti.title, datanoti.message, ios_registrationIds, datanoti, 'ios');
                        } else if (friendprofile.lasted_os == "android") {
                            let android_registrationIds = [friendprofile.device_token];
                            let itemreturn_android = await globalService.sendNotiFCM(datanoti.title, datanoti.message, android_registrationIds, datanoti, 'android');
                        }
                    }
                }
                //ให้เครื่อง brook ที่โทรหาหยุดสั่น และเข้าสู่โหมดปกติ
                io.to(socket.id).emit('leaveCall', { room_id: thisdata.room_id });
                new_msg_text = "ไม่ได้รับสาย";
                new_msg_profile_id = thisdata.profile_id;
            }

            let new_msg = await modelService.pushMessageEndCall(thisdata.calling_type, thisroom, new_msg_profile_id, new_msg_text);
            new_msg.profile_name = myprofile.name;
            new_msg.profile_image_url = myprofile.image_url;
            new_msg.is_read = thisroom.profile_id_join.length > 1 ? 1 : 0;

            let item_emit = {
                message: new_msg
            }

            io.to(thisroom._id.toString()).emit('message', item_emit);

            cb({ error: "0", msg: "Ok", result: { room_id: thisdata.room_id } });
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
            cb({ error: "1", msg: e, result: [] });
        }
    });

    socket.on('leaveCall', async function(thisdata, cb) {
        try {
            dataSocket.event_name = "leaveCall";
            if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
            if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };

            if (dataSocket.callProfile[thisdata.profile_id] == undefined) {
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "node restart", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "102", msg: 'node restart. please handle', result: [] });
                return;
            }
            delete dataSocket.callNotiProfile[thisdata.profile_id];
            socket.leave("call_" + thisdata.room_id.toString());

            dataSocket.callSocket[socket.id] = { room_id: "", profile_id: thisdata.profile_id };

            if (dataSocket.callRoom[thisdata.room_id] != undefined) { //กรณีคนสุดท้าย leaveCall จะ err เพราะ ลบทิ้งไปก่อน.
                var indexOfSocket = _.indexOf(dataSocket.callRoom[thisdata.room_id].sockets, socket.id);
                if (indexOfSocket > -1) {
                    dataSocket.callRoom[thisdata.room_id].sockets.splice(indexOfSocket, 1);
                }
                if (dataSocket.callRoom[thisdata.room_id].sockets.length <= 1) { //เมื่อวางสายจนหมดหรือเหลือคนสุดท้าย ต้องลบ callRoom ทิ้ง
                    delete dataSocket.callRoom[thisdata.room_id];
                }
            }
            // await storage.setItem("data_socket", dataSocket);
            cb({ error: "0", msg: "Ok", result: [] });
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
            cb({ error: "1", msg: e, result: [] });
        }
    });

    socket.on('hangUp', async function(thisdata, cb) {
        try {
            dataSocket.event_name = "hangUp";
            if (globalService.checkParamCallback(thisdata, 'profile_id', cb) == false) { return };
            if (globalService.checkParamCallback(thisdata, 'room_id', cb) == false) { return };
            if (globalService.checkParamCallback(thisdata, 'calling_detail_id', cb) == false) { return };

            if (dataSocket.callProfile[thisdata.profile_id] == undefined) {
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "node restart", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "102", msg: 'node restart. please handle', result: [] });
                return;
            }
            let thiscalling_detail_check = await models.calling_details.findOne({ _id: globalService.genMongoId(thisdata.calling_detail_id) }, null, { sort: { _id: 1 } });
            if (thiscalling_detail_check == null) {
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "calling_detail_id not found", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: 'calling_detail_id not found', result: [] });
                return;
            }

            let thisroom = await models.rooms.findOne({ 'room_type': 'SINGLE', '_id': globalService.genMongoId(thisdata.room_id) }, null, { sort: { _id: 1 } });
            if (thisroom == null) {
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "room_id not found", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: 'Room not found', result: [] });
                return;
            }

            var friendprofile_id_in = _.filter(thisroom.profile_id_in, function(value) {
                return value.profile_id != thisdata.profile_id;
            });
            let myprofile_id = thisdata.profile_id;
            let myprofile = await models.profiles.findOne({ _id: globalService.genMongoId(thisdata.profile_id) }, null, { sort: { _id: 1 } });
            let friendprofile_id = friendprofile_id_in[0].profile_id;
            delete dataSocket.callNotiProfile[myprofile_id];
            delete dataSocket.callNotiProfile[friendprofile_id];

            if (dataSocket.callProfile[friendprofile_id] != undefined) {
                var all_socket_friend = dataSocket.callProfile[friendprofile_id];
                for (var i = 0; i < all_socket_friend.length; i++) {
                    if (dataSocket.callSocket[all_socket_friend[i]] != undefined && dataSocket.callSocket[all_socket_friend[i]].room_id == thisdata.room_id) {
                        io.to(all_socket_friend[i]).emit('leaveCall', { room_id: thisdata.room_id }); //เครื่องเพื่อนที่กำลังคุยอยู่ในห้องนี้ จริงๆจะเจอเครื่องเดียว
                    }
                }
            }
            let thiscalling_detail = await modelService.updateCallingDetailToDb(thisdata.calling_detail_id, "วางสาย");
            if (thiscalling_detail == false) {
                globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, "calling_detail_id not found", "SOCKET", JSON.stringify(thisdata));
                cb({ error: "1", msg: 'calling_detail_id not found', result: [] });
                return;
            }
            let new_msg = await modelService.pushMessageEndCall(thiscalling_detail.calling_type, thisroom, thisdata.profile_id, "วางสาย");

            new_msg.profile_name = myprofile.name;
            new_msg.profile_image_url = myprofile.image_url;
            new_msg.is_read = thisroom.profile_id_join.length > 1 ? 1 : 0;
            let item_emit = {
                message: new_msg
            }
            io.to(thisroom._id.toString()).emit('message', item_emit);

            io.to(socket.id).emit('leaveCall', { room_id: thisdata.room_id }); //เครื่องเราที่กำลังคุยอยู่
            cb({ error: "0", msg: "Ok", result: [] });
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
            cb({ error: "1", msg: e, result: [] });
        }
    });
    socket.on('checkSocket', async function(thisdata, cb) {
        try {
            dataSocket.event_name = "checkSocket";
            cb({ error: "0", msg: "Ok", result: dataSocket });
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
            cb({ error: "1", msg: e, result: [] });
        }
    });

    socket.on('clearStorage', async function(thisdata, cb) {
        try {
            dataSocket.event_name = "clearStorage";
            await storage.clear();
            cb({ error: "0", msg: "clearStorage Ok", result: [] });
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(socket, dataSocket.event_name, socket.request.headers.host, e, "SOCKET", JSON.stringify(thisdata));
            cb({ error: "1", msg: e, result: [] });
        }
    });

}