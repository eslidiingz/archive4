const express = require('express');
const { URLSearchParams } = require('url')
const moment = require('moment');
const { captureRejectionSymbol } = require('events');

module.exports = function(route, models, globalService, modelService, config) {
    route.post('/getProvince', async function(req, res) {
        try {
            const thisdata = req.body;
            if (!globalService.checkParam(thisdata, 'page', res)) return false;
            if (!globalService.checkParam(thisdata, 'limit', res)) return false;

            let thisqueryopt = {};
            thisqueryopt.skip = thisdata.page == 1 ? 0 : ((thisdata.page - 1) * thisdata.limit);
            thisqueryopt.limit = thisdata.limit;

            let itemreturn = {
                page: thisdata.page,
                limit: thisdata.limit,
                totalrow: 0,
                data: []
            }
            let result_data = await globalService.postgresCon(`SELECT * FROM public."PROVINCE_M"
            ORDER BY "ID" ASC OFFSET ${thisqueryopt.skip} LIMIT  ${thisqueryopt.limit} `);

            let result_total = await globalService.postgresCon(`SELECT * FROM public."PROVINCE_M"
            ORDER BY "ID" ASC`);
            itemreturn.data = result_data.rows;
            itemreturn.totalrow = result_total.rowCount;


            return globalService.responseSuccess(res, "OK", itemreturn);
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(req, globalService.getFullURL(req), globalService.getClientIP(req), e, "API", JSON.stringify(req.body));
            return globalService.responseError(res, e.stack);
        }
    });

    route.post('/getAmphurByProvinceId', async function(req, res) {
        try {
            const thisdata = req.body;
            if (!globalService.checkParam(thisdata, 'page', res)) return false;
            if (!globalService.checkParam(thisdata, 'limit', res)) return false;
            if (!globalService.checkParam(thisdata, 'province_id', res)) return false;

            let thisqueryopt = {};
            thisqueryopt.skip = thisdata.page == 1 ? 0 : ((thisdata.page - 1) * thisdata.limit);
            thisqueryopt.limit = thisdata.limit;

            let itemreturn = {
                page: thisdata.page,
                limit: thisdata.limit,
                totalrow: 0,
                data: []
            }
            let result_data = await globalService.postgresCon(`SELECT * FROM public."AMPHUR_M"
            WHERE "PROVINCE_ID" = ${thisdata.province_id}
            ORDER BY "ID" ASC OFFSET ${thisqueryopt.skip} LIMIT  ${thisqueryopt.limit} `);

            let result_total = await globalService.postgresCon(`SELECT * FROM public."AMPHUR_M"
            WHERE "PROVINCE_ID" = ${thisdata.province_id}
            ORDER BY "ID" ASC`);
            itemreturn.data = result_data.rows;
            itemreturn.totalrow = result_total.rowCount;


            return globalService.responseSuccess(res, "OK", itemreturn);
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(req, globalService.getFullURL(req), globalService.getClientIP(req), e, "API", JSON.stringify(req.body));
            return globalService.responseError(res, e.stack);
        }
    });
    route.post('/getTambonByAmphurId', async function(req, res) {
        try {
            const thisdata = req.body;
            if (!globalService.checkParam(thisdata, 'page', res)) return false;
            if (!globalService.checkParam(thisdata, 'limit', res)) return false;
            if (!globalService.checkParam(thisdata, 'amphur_id', res)) return false;

            let thisqueryopt = {};
            thisqueryopt.skip = thisdata.page == 1 ? 0 : ((thisdata.page - 1) * thisdata.limit);
            thisqueryopt.limit = thisdata.limit;

            let itemreturn = {
                page: thisdata.page,
                limit: thisdata.limit,
                totalrow: 0,
                data: []
            }
            let result_data = await globalService.postgresCon(`SELECT * FROM public."TAMBON_M"
            WHERE "AMPHUR_ID" = ${thisdata.amphur_id}
            ORDER BY "ID" ASC OFFSET ${thisqueryopt.skip} LIMIT  ${thisqueryopt.limit} `);

            let result_total = await globalService.postgresCon(`SELECT * FROM public."TAMBON_M"
            WHERE "AMPHUR_ID" = ${thisdata.amphur_id}
            ORDER BY "ID" ASC`);
            itemreturn.data = result_data.rows;
            itemreturn.totalrow = result_total.rowCount;


            return globalService.responseSuccess(res, "OK", itemreturn);
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(req, globalService.getFullURL(req), globalService.getClientIP(req), e, "API", JSON.stringify(req.body));
            return globalService.responseError(res, e.stack);
        }
    });

}