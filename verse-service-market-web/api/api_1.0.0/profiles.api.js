const express = require('express');
const { URLSearchParams } = require('url')
const moment = require('moment');
const { captureRejectionSymbol } = require('events');

module.exports = function(route, models, globalService, modelService, config) {
    /*================== START API DEALER  ==================*/
    route.post('/profiles/getOneById', async function(req, res) {
        try {
            const thisdata = req.body
            if (!globalService.checkParam(thisdata, 'profile_id', res)) return false;
            let this_profile = await models.profiles.findOne({ '_id': globalService.genMongoId(thisdata.profile_id), 'is_delete': false, 'is_enable': true }, {}, { sort: { _id: 1 } });
            if (this_profile == null) {
                return globalService.responseError(res, "profile_id not found.");
            }
            return globalService.responseSuccess(res, "OK", this_profile);

        } catch (e) {
            return globalService.responseError(res, e.stack);
        }
    });
    route.post('/profiles/add', async function(req, res) {
        try {
            const thisdata = req.body
                // request param

            if (!globalService.checkParam(thisdata, 'username', res)) return false;
            if (!globalService.checkParam(thisdata, 'password', res)) return false;
            if (!globalService.checkParam(thisdata, 'remark', res)) return false;

            if (thisdata.username.length <= 3) {
                return globalService.responseError(res, "username is too short. it must be more than 3 chr");
            }
            if (thisdata.password.length <= 0) {
                return globalService.responseError(res, "password can not be empty.");
            }
            let pwd_md5 = globalService.md5(thisdata.password);
            let new_profile = {
                username: thisdata.username,
                password: pwd_md5,
                remark: thisdata.remark,
            }

            const resSave = await new models.profiles(new_profile).save();
            if (resSave) {
                return globalService.responseSuccess(res, "OK", resSave);
            }
            return globalService.responseError(res, "Save Error");
        } catch (e) {
            return globalService.responseError(res, e.stack);
        }
    });
    route.post('/profiles/edit', async function(req, res) {
        try {
            const thisdata = req.body
                // request param
            if (!globalService.checkParam(thisdata, 'profile_id', res)) return false;
            // if (!globalService.checkParam(thisdata, 'username', res)) return false;
            // if (!globalService.checkParam(thisdata, 'password', res)) return false;
            if (!globalService.checkParam(thisdata, 'remark', res)) return false;

            let this_profile = await models.profiles.findOne({ '_id': globalService.genMongoId(thisdata.profile_id) }, {}, { sort: { _id: 1 } });
            if (this_profile == null) {
                return globalService.responseError(res, "Data not found.");
            }
            if (thisdata.password != null) {
                if (thisdata.password.length <= 0) {
                    return globalService.responseError(res, "password can not be empty.");
                }
                let pwd_md5 = globalService.md5(thisdata.password);
                this_profile.password = pwd_md5;
            }


            this_profile.remark = thisdata.remark;
            this_profile.updated_date = new Date();
            this_profile.save();
            return globalService.responseSuccess(res, "OK", this_profile);
        } catch (e) {
            return globalService.responseError(res, e.stack);
        }
    });
    route.post('/profiles/delete', async function(req, res) {
        try {
            const thisdata = req.body
                // request param
            if (!globalService.checkParam(thisdata, 'profile_id', res)) return false;

            let this_profile = await models.profiles.findOne({ '_id': globalService.genMongoId(thisdata.profile_id) }, {}, { sort: { _id: 1 } });
            if (this_profile == null) {
                return globalService.responseError(res, "Data not found.");
            }
            this_profile.is_delete = true;
            this_profile.updated_date = new Date();
            this_profile.save();

            return globalService.responseSuccess(res, "OK", this_profile);
        } catch (e) {
            return globalService.responseError(res, e.stack);
        }
    });

    route.post('/profiles/searchByname', async function(req, res) {
        try {
            const thisdata = req.body
            if (!globalService.checkParam(thisdata, 'search_text', res)) return false;
            if (!globalService.checkParam(thisdata, 'xpage', res)) return false;
            if (!globalService.checkParam(thisdata, 'xlimit', res)) return false;

            var thisqueryopt = {
                // sort: { '_id': -1 } 
            }
            thisqueryopt.skip = thisdata.xpage == 1 ? 0 : ((thisdata.xpage - 1) * thisdata.xlimit);
            thisqueryopt.limit = thisdata.xlimit;
            let all_profile_count = await models.profiles.find({
                'is_delete': false,
                'is_enable': true,
                $or: [
                    { 'name': { $regex: new RegExp(thisdata.search_text.toLowerCase(), "i") } },
                    { 'remark': { $regex: new RegExp(thisdata.search_text.toLowerCase(), "i") } }
                ]
            }, { "_id": 1 }, {}).count();

            let all_profile = await models.Houses.find({
                'is_delete': false,
                'is_enable': true,
                $or: [
                    { 'name': { $regex: new RegExp(thisdata.search_text.toLowerCase(), "i") } },
                    { 'remark': { $regex: new RegExp(thisdata.search_text.toLowerCase(), "i") } }
                ]
            }, {}, thisqueryopt);

            // return globalService.responseSuccess(res, "OK", all_houses);
            return globalService.responseSuccessList(res, "OK", all_profile, total = all_profile_count, limit = thisdata.xlimit, page = thisdata.xpage);
        } catch (e) {
            return globalService.responseError(res, e.stack);
        }
    });

}