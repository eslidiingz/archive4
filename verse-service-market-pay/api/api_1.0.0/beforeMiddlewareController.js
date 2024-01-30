const express = require("express");
const route = express.Router();
const moment = require("moment");
var schedule = require("node-schedule");

const config = require("../../systems/config/config");
const globalService = require("./../../utils/globalService");
const models = require("./../../schema/index.js");
const modelService = require("./../../utils/modelService")(models, globalService);
const _ = require("underscore");
const fetch = require("node-fetch");



const multipayUrl = `https://wallet.multipay.finance/1.0.0`;
const systemName = `MV`; // MEX VERSE SYSTEM NAME
const shopTel = `0851993754`; // MEX WALLET



// FUNCTION
async function decode2C2P(response) {

	let itemdecode = Buffer.from(response, 'base64').toString('ascii');
	let start = itemdecode.indexOf("}{") + 1;
	let end = itemdecode.indexOf('respDesc');
	let xxx = itemdecode.substring(start, end);

	let yyy = xxx.substring(0, xxx.length - 2);
	yyy = yyy + "}";
	let itemresult = JSON.parse(yyy);

	return itemresult;

	// response  {
	// 	locale: null,
	// 	invoiceNo: '1663129942MexVerse',
	// 	channelCode: 'CC',
	// 	respCode: '2000'
	// }

}

const callMultiPay = async (_url, _content, _sec_token = "") => {
	const headers = {
		"Content-Type": "application/json",
		"Accept": "*/*",
		"Cache-Control": "no-cache",
		"sec_token": _sec_token,
	};

	const res = await fetch(multipayUrl + _url, {
		method: "POST",
		headers: headers,
		body: JSON.stringify(_content),
	});

	return await res.json();
};

const handleSseClientResponse = async (_req, response, eventName) => {

	console.log(" === eventName ", eventName);
	console.log(" === response.data.verse_invoice_no ", response.data.verse_invoice_no);
	console.log(" === sseClients ", sseClients)

	let client = sseClients[response.data.verse_invoice_no];

	client.write(`event: ${eventName}\n`);
	client.write(`data: ${JSON.stringify(response)}\n\n`);
	client.end();

	sseClients = sseClients.filter((item, index) => { return index != response.data.verse_invoice_no })

}
// FUNCTION END



// REDIRECT
route.get("/callback", async function (req, res) {
	console.log(" === /callback GET ", req.body)
	let r = await decode2C2P(req.body.paymentResponse)
	console.log(" === /callback GET response ", r)
	res.redirect(`https://cms.multiverseexpert.io/payment_success?inv_ref=${r.invoiceNo}`);
});
route.post("/callback", async function (req, res) {
	console.log(" === /callback GET ", req.body)
	let r = await decode2C2P(req.body.paymentResponse)
	console.log(" === /callback GET response ", r)
	res.redirect(`https://cms.multiverseexpert.io/payment_success?inv_ref=${r.invoiceNo}`);
});
// REDIRECT END



// SSE CLIENTS
var sseClients = [];

route.get('/sse/:inv', async function (req, res) {

	let key = req.params.inv

	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Connection': 'keep-alive',
		'Cache-Control': 'no-cache'
	});
	sseClients[key] = res;

	console.log(" SSE CLIENT : ", key)

	req.on('close', () => {
		console.log(" SSE CLOSE :", key)
		sseClients = sseClients.filter((item, index) => { return index != key })
	});
});
// SSE CLIENTS END



route.post("/verse_credit_callback", async function (_req, _res) {

	let response = {};

	console.log(" === from multipay ", _req.body)

	var io = _req.app.get('socketio');
	var sse = _req.app.get('sse');

	try {

		if( _req.body.error == "0" ){

			let row = await models.mexpay_transactions.findOneAndUpdate(
				{
					inv_ref_full: _req.body.data.invoiceNo
				}, 
				{
					is_success: true,
					is_enabled: true,
					updated_at: new Date().toISOString()
				}
			).exec();

			payment_response = {
				success: true,
				data: row
			}

		}else{

			let row = await models.mexpay_transactions.findOneAndUpdate(
				{
					inv_ref_full: _req.body.data.invoiceNo
				}, 
				{
					is_success: false,
					is_enabled: false,
					updated_at: new Date().toISOString()
				}
			).exec();

			payment_response = {
				success: false,
				data: row
			}

		}

		console.log(" === payment_response ", payment_response)
		io.to(_req.body.data.invoiceNo).emit("payment-credit-response", payment_response);
		sse.send(payment_response, "payment-credit-response");
		handleSseClientResponse(_req, payment_response, "payment-credit-response");

		const resPaymentCallback = await fetch(`https://ecom-api.multiverseexpert.io/api/v1/invoice/payment/callback`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(payment_response)
		})
		const resPaymentCallbackJson = await resPaymentCallback.json();
		console.log(" === resPaymentCallbackJson ", resPaymentCallbackJson)

		response = {
			success: true,
			result: payment_response
		}

	} catch (error) {
		console.log(" === verse_credit_callback ERROR ", error)
		response = {
			success: false,
			error: "Something Wrong"
		}
	} finally {
		_res.json(response);
	}

});

route.post("/verse_qr_callback", async function (_req, _res) {

	let response = {};

	console.log(" === from multipay qr ", _req.body);

	var io = _req.app.get('socketio');
	var sse = _req.app.get('sse');

	try {

		let payment_response

		if( _req.body.error == "0" ){

			let row = await models.mexpay_transactions.findOneAndUpdate(
				{
					inv_ref_full: _req.body.data.billPaymentRef1
				}, 
				{
					is_success: true,
					is_enabled: true,
					updated_at: new Date().toISOString()
				}
			).exec();

			payment_response = {
				success: true,
				data: row
			}

		}else{

			let row = await models.mexpay_transactions.findOneAndUpdate(
				{
					inv_ref_full: _req.body.data.billPaymentRef1
				}, 
				{
					is_success: false,
					is_enabled: false,
					updated_at: new Date().toISOString()
				}
			).exec();

			payment_response = {
				success: false,
				data: row
			}

		}

		io.to(_req.body.data.billPaymentRef1).emit("payment-qr-response", payment_response);
		sse.send(payment_response, "payment-qr-response");
		handleSseClientResponse(_req, payment_response, "payment-qr-response");

		const resPaymentCallback = await fetch(`https://ecom-api.multiverseexpert.io/api/v1/invoice/payment/callback`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(payment_response)
		})
		const resPaymentCallbackJson = await resPaymentCallback.json();
		console.log(" === resPaymentCallbackJson ", resPaymentCallbackJson)

		response = {
			success: true,
			result: payment_response
		}

	} catch (error) {
		console.log(" === verse_credit_callback ERROR ", error)
		response = {
			success: false,
			error: "Something Wrong"
		}
	} finally {
		_res.json(response);
	}

});



route.post("/genLinkCreditPayment", async function (_req, _res) {

	let {
		verse_uid,
		verse_user_uid,
		verse_invoice_no,
		amount,
		description
	} = _req.body;

	let response

	try {

		let data = {
			system_name: systemName,
			verse_uid: verse_uid,
			verse_user_uid: verse_user_uid,
			verse_invoice_no: verse_invoice_no,
			is_enabled: false,
			created_at: new Date().toISOString()
		}
		console.log(" === data ", data)
		const res = await new models.mexpay_transactions(data).save();
		console.log(" === res ", res)
		if (res) {

			let multipayData = {
				system_name: systemName,
				name: "Mex Verse",
				email: "mex@gmail.com",
				tel: "0811234567",
				amt: amount,
				payment_method: "credit",
				description: description,
				inv_ref: res.inv_ref, // สร้างตอน Save
				sub_inv_ref_list: [
					{
						shop_tel: shopTel,
						sub_inv_ref: "A",
						amt: amount,
						system_name: systemName,
					},
				],
			};
			const resMultiPay = await callMultiPay(`/genLinkCreditPayment_2C2P`, multipayData);
			console.log("%c === resMultiPay === ", "color: lime", resMultiPay);
			if (resMultiPay.error == "0") {
				response = {
					success: true,
					result: {
						invoice_ref: resMultiPay.result.inv_ref,
						invoice_ref_full: `${resMultiPay.result.inv_ref}${systemName}`,
						payment_link: resMultiPay.result.link_data.webPaymentUrl,
					},
				};
			} else {
				response = {
					success: false,
					error: "Multipay Error",
					msg: resMultiPay.msg
				};
			}

		} else {
			response = {
				success: false,
				error: "Save Transaction Failed"
			}
		}

	} catch (error) {
		console.log(" === genLinkCreditPayment ERROR ", error)
		response = {
			success: false,
			error: "Something Wrong"
		}
	} finally {
		_res.json(response);
	}

});



route.post("/genQrPayment", async function (_req, _res) {

	let {
		verse_uid,
		verse_user_uid,
		verse_invoice_no,
		amount,
		description
	} = _req.body;

	let response

	try {

		let data = {
			system_name: systemName,
			verse_uid: verse_uid,
			verse_user_uid: verse_user_uid,
			verse_invoice_no: verse_invoice_no,
			is_enabled: false,
			created_at: new Date().toISOString()
		}
		console.log(" === data ", data)
		const res = await new models.mexpay_transactions(data).save();
		console.log(" === res ", res)
		if (res) {

			let multipayData = {
				tel: "0811234567",
				amt: amount,
				system_name: systemName,
				inv_ref: res.inv_ref, // สร้างตอน Save
				name: "Mex Verse",
				email: "mex@gmail.com",
				expireDate: new Date().toISOString(),
				sub_inv_ref_list: [
					{
						shop_tel: shopTel,
						sub_inv_ref: "A",
						amt: amount,
						system_name: systemName
					}
				]
			};
			const resMultiPay = await callMultiPay(`/SCBPayment_GenQR`, multipayData);
			console.log("%c === resMultiPay === ", "color: lime", resMultiPay);
			if (resMultiPay.error == "0") {
				response = {
					success: true,
					result: {
						invoice_ref: resMultiPay.result.inv_ref,
						invoice_ref_full: `${resMultiPay.result.inv_ref}${systemName}`,
						QR_Image64: resMultiPay.result.QR_Image64,
					},
				};
			} else {
				response = {
					success: false,
					error: "Multipay Error",
					msg: resMultiPay.msg
				};
			}

		} else {
			response = {
				success: false,
				error: "Save Transaction Failed"
			}
		}

	} catch (error) {
		console.log(" === genLinkCreditPayment ERROR ", error)
		response = {
			success: false,
			error: "Something Wrong"
		}
	} finally {
		_res.json(response);
	}

});



route.post("/getTransactionByInv", async function (_req, _res) {

	let { inv_ref } = _req.body;

	let response

	try {
		let resTransaction = await models.mexpay_transactions.findOne({ 'inv_ref_full': inv_ref }, {}, {});
		if( resTransaction ){
			response = {
				success: true,
				result: resTransaction
			}
		}else{
			response = {
				success: false,
				error: "Cannot find invoice"
			}
		}
	} catch (error) {
		response = {
			success: false,
			error: "Something Wrong"
		}
	} finally {
		_res.json(response);
	}

});



route.post("/getTransactionByVerseInv", async function (_req, _res) {

	let { verse_uid, verse_invoice_no } = _req.body;

	let response

	try {
		let resTransaction = await models.mexpay_transactions.findOne({
			'verse_uid': verse_uid,
			'verse_invoice_no': verse_invoice_no
		}, {}, {});
		if( resTransaction ){
			response = {
				success: true,
				result: resTransaction
			}
		}else{
			response = {
				success: false,
				error: "Cannot find invoice"
			}
		}
	} catch (error) {
		response = {
			success: false,
			error: "Something Wrong"
		}
	} finally {
		_res.json(response);
	}

});



module.exports = route;
