const express = require('express');
const route = express.Router();
// const { URLSearchParams } = require('url')
const moment = require('moment')


const config = require('../../systems/config/config')
const globalService = require('./../../utils/globalService');
const models = require('./../../schema/index.js');
const modelService = require('./../../utils/modelService')(models, globalService);


// require('./profiles.api')(route, models, globalService, modelService, config);
require('./admin.api')(route, models, globalService, modelService, config);

//about chat
//ถ้าเป็น room_type: SINGLE จะตรวจว่ามีห้องหรือไม่จาก profile_id คู่สนทนา ถ้าไม่มีถึงสร้างถ้ามีแล้วจะส่ง room_id กลับไป
//ถ้าเป็น room_type: GROUP จะสร้างห้องใหม่เสอม
async function do_create_chatroom(myprofile, friendprofile, about_room, room_type) {
    let newroom = {
        create_update: {
            create_date: new Date().toISOString(),
            update_date: new Date().toISOString(),
        },
        room_type: room_type,
        is_delete: false,
        is_enable: true,
        room_name: about_room.room_type == "SINGLE" ? "ห้องของ " + myprofile.name + " และ " + friendprofile.name : about_room.room_name,
        room_image_url: about_room.room_image_url,
        profile_id_block: [],
        profile_id_hide: [],
        profile_id_in: [{
            "profile_id": myprofile._id.toString(), //profileid ref to tb.profile
            "datetime_in": new Date().toISOString(), // วันที่เข้าห้อง
            "first_msg_id": "", // msg_id แรกที่ได้รับหลังเข้าห้อง
            "last_send_msg_id": "", // msg_id ที่ตัวเองส่งล่าสุด
            "last_send_msg_timestamp": null,
            "last_read_msg_id": "",
            "last_read_msg_timestamp": new Date().toISOString()
        }, {
            "profile_id": friendprofile._id.toString(), //profileid ref to tb.profile
            "datetime_in": new Date().toISOString(), // วันที่เข้าห้อง
            "first_msg_id": "", // msg_id แรกที่ได้รับหลังเข้าห้อง
            "last_send_msg_id": "", // msg_id ที่ตัวเองส่งล่าสุด
            "last_send_msg_timestamp": null,
            "last_read_msg_id": "",
            "last_read_msg_timestamp": new Date().toISOString()
        }],
        profile_id_join: [],
        msg: []
    }
    let new_room = await new models.rooms(newroom).save();
    return new_room;
}
route.post('/createChatroom', async function(req, res) {
    try {
        const thisdata = req.body;
        if (globalService.checkParam(thisdata, 'profile_id', res) == false) { return };
        if (globalService.checkParam(thisdata, 'friend_profile_id', res) == false) { return };
        if (globalService.checkParam(thisdata, 'room_type', res) == false) { return }; //GROUP,SINGLE
        if (globalService.checkParam(thisdata, 'device_token', res) == false) { return };
        if (globalService.checkParam(thisdata, 'device_id', res) == false) { return };
        if (globalService.checkParam(thisdata, 'os', res) == false) { return };
        // if(globalService.checkParam(thisdata,'room_name',res)== false){return};
        // if(globalService.checkParam(thisdata,'room_image_url',res)== false){return};

        if (thisdata.profile_id == "" || thisdata.friend_profile_id == "") {
            globalService.sendLineNotifyErr(req, globalService.getFullURL(req), globalService.getClientIP(req), "profile_id or friend_profile_id is empty string", "API", JSON.stringify(req.body));
            return res.status(200).json({ error: "1", msg: 'profile_id or friend_profile_id is empty string', result: [] });
        }

        let mydata = {
            device_token: thisdata.device_token,
            device_id: thisdata.device_id,
            lasted_socket_id: '',
            lasted_os: thisdata.os,
        }
        let myprofile = await models.profiles.findOne({
            _id: globalService.genMongoId(thisdata.profile_id),
            is_delete: false,
            is_enable: true
        }, null, { sort: { _id: 1 } });

        if (myprofile == null) {
            globalService.sendLineNotifyErr(req, globalService.getFullURL(req), globalService.getClientIP(req), "profile " + thisdata.profile_id + " not found in db", "API", JSON.stringify(req.body));
            return res.status(200).json({ error: "1", msg: 'your profile not found', result: [] });
        }
        let frienddata = {
            device_token: '',
            device_id: '',
            lasted_socket_id: '',
            lasted_os: '',
        }
        let friendprofile = await models.profiles.findOne({
            _id: globalService.genMongoId(thisdata.friend_profile_id),
            is_delete: false,
            is_enable: true
        }, null, { sort: { _id: 1 } });
        if (friendprofile == null) {
            globalService.sendLineNotifyErr(req, globalService.getFullURL(req), globalService.getClientIP(req), "profile " + thisdata.friend_profile_id + " not found in db", "API", JSON.stringify(req.body));
            return res.status(200).json({ error: "1", msg: 'your friend profile not found', result: [] });
        }


        let about_room = {
            room_name: thisdata.room_name,
            room_image_url: thisdata.room_image_url
        }
        if (thisdata.room_type == "SINGLE") {
            let foundroom = await models.rooms.findOne({
                room_type: thisdata.room_type,
                $and: [
                    { 'profile_id_in.profile_id': myprofile.profile_id }, { 'profile_id_in.profile_id': friendprofile.profile_id }
                ]
            }, null, { sort: { _id: 1 } });

            if (foundroom != null) {
                return res.status(200).json({ error: "0", msg: 'Ok', result: foundroom._id });
            } else {
                let newroom = await do_create_chatroom(myprofile, friendprofile, about_room, "SINGLE");
                return res.status(200).json({ error: "0", msg: 'Ok', result: newroom._id });
            }
        } else {
            //กรณีroomเป็น GROUP
            //group ต้องรับ room_name
            if (thisdata.room_name == "" || thisdata.room_name == null) {
                return res.status(200).json({ error: "1", msg: 'การสร้างห้องแบบกลุ่มต้องตั้งชื่อห้องด้วย', result: [] });
            }
            let newroom_group = await do_create_chatroom(myprofile, friendprofile, about_room, "GROUP");
            return res.status(200).json({ error: "0", msg: 'Ok', result: newroom_group._id });
        }
    } catch (e) {
        globalService.dumpError(e);
        globalService.sendLineNotifyErr(req, globalService.getFullURL(req), globalService.getClientIP(req), e, "API", JSON.stringify(req.body));
        res.status(200).json({ error: "1", msg: e, result: [] });
    }
});


module.exports = route;

//FUNCTION Other