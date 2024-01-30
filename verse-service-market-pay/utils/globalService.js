//mongoose, dirupload
const md5 = require("md5");
const fs = require("fs");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const moment = require("moment");
require("dotenv").config();

const Cryptr = require("cryptr");
const cryptr = new Cryptr("1q2w3e4r5t");
const jwt_secret = "SP1q2w3e";
const CryptoJS = require("crypto-js");

const bcrypt = require("bcrypt");
const keySetting = require("./keySetting");
//mongoose, dirupload
var GlobalService = {
	system_type: keySetting.system_type, //"PROD","UAT"

	httpPath: keySetting.httpPath,

	twoC2P_merchantID: keySetting.twoC2P_merchantID,
	jwt_secret_sha_2c2p: keySetting.jwt_secret_sha_2c2p,
	payment_token_2c2p: keySetting.payment_token_2c2p,

	getBcryptHash: function (human_str) {
		const hash = bcrypt.hashSync(human_str, 5);
		return hash;
	},
	checkBcryptHash: function (human_str, hash) {
		return bcrypt.compareSync(human_str, hash);
	},
	//จะได้ enCodeAES ที่ไม่เหมือนกันทุกรอบ
	//<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"></script>
	// var encrypted = CryptoJS.AES.encrypt(myString, myPassword);
	// var decrypted = CryptoJS.AES.decrypt(encrypted, myPassword);
	enCodeAES: function (text, key) {
		var ciphertext = CryptoJS.AES.encrypt(text, key).toString();
		return ciphertext;
	},
	deCodeAES: function (entext, key) {
		var bytes = CryptoJS.AES.decrypt(entext, key);
		var originalText = bytes.toString(CryptoJS.enc.Utf8);
		return originalText;
	},

	draw: function () {
		var Canvas = require("canvas"),
			Image = Canvas.Image,
			canvas = new Canvas(200, 200),
			ctx = canvas.getContext("2d");

		ctx.font = "30px Impact";
		ctx.rotate(0.1);
		ctx.fillText("Awesome!", 50, 100);

		return canvas;
	},
	//*****how to use จะได้ encodeStr ที่เหมือนกันทุกรอบ
	// const myEnTest = globalService.encodeStr('keyStr');
	// let en = myEnTest('splanet');
	// const myDeText = globalService.decodeStr('keyStr');
	// let de = myDeText(en);

	stringReplaceAll: function (str, txt, bytxt) {
		const search = txt;
		const replacer = new RegExp(search, "g");
		let itemreturn = str.replace(replacer, bytxt);
		return itemreturn;
	},

	SCB_QR: {
		// transRef คือqr ที่ได้หลังจ่าย 0046000600000101030140225202108264IgHBYWLKhqOcx15S5102TH91044CAF = 202108264IgHBYWLKhqOcx15S
		//requestUId คือ guid gen สดทุกครั้ง

		billingId: keySetting.billingId,
		url_endpoint: keySetting.url_endpoint,

		applicationKey: keySetting.applicationKey,
		applicationSecret: keySetting.applicationSecret,

		auth: async function (thisguid) {
			var form = {
				applicationKey: this.applicationKey,
				applicationSecret: this.applicationSecret,
			};
			var raw = JSON.stringify(form);

			let headers = {
				"Content-Type": "application/json",
				resourceOwnerId: this.applicationKey,
				requestUId: thisguid,
				"accept-language": "EN",
			};

			const url = this.url_endpoint + `/oauth/token`;
			try {
				const response = await fetch(url, {
					method: "POST", // or 'PUT'
					body: raw,
					headers: headers,
					redirect: "follow",
				});
				const result = await response.json();
				return result;
			} catch (error) {
				console.log("error", error);
			}
		},
		genQR: async function (Bearer, datab, thisguid) {
			var raw = JSON.stringify(datab);

			let headers = {
				"Content-Type": "application/json",
				authorization: "Bearer " + Bearer,
				resourceOwnerId: this.applicationKey,
				requestUId: thisguid,
				"accept-language": "EN",
			};

			const url = this.url_endpoint + `/payment/qrcode/create`;
			try {
				const response = await fetch(url, {
					method: "POST", // or 'PUT'
					body: raw,
					headers: headers,
					redirect: "follow",
				});
				const result = await response.json();
				return result;
			} catch (error) {
				console.log("error", error);
			}
		},

		auth_test: async function (thisguid) {
			var form = {
				applicationKey: "l7c5ae5ef4ab4d470a8c5ae3da5e31a394",
				applicationSecret: "471942d6dbf94b019a10705f4cdd4015",
			};
			var raw = JSON.stringify(form);

			let headers = {
				"Content-Type": "application/json",
				resourceOwnerId: "l7c5ae5ef4ab4d470a8c5ae3da5e31a394",
				requestUId: thisguid,
				"accept-language": "EN",
			};

			const url = `https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token`;
			try {
				const response = await fetch(url, {
					method: "POST", // or 'PUT'
					body: raw,
					headers: headers,
					redirect: "follow",
				});
				const result = await response.json();
				return result;
			} catch (error) {
				console.log("error", error);
			}
		},
		genQR_test: async function (Bearer, datab, thisguid) {
			var raw = JSON.stringify(datab);

			let headers = {
				"Content-Type": "application/json",
				authorization: "Bearer " + Bearer,
				resourceOwnerId: "l7c5ae5ef4ab4d470a8c5ae3da5e31a394",
				requestUId: thisguid,
				"accept-language": "EN",
			};

			const url = `https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create`;
			try {
				const response = await fetch(url, {
					method: "POST", // or 'PUT'
					body: raw,
					headers: headers,
					redirect: "follow",
				});
				const result = await response.json();
				return result;
			} catch (error) {
				console.log("error", error);
			}
		},

		billpaymentTransactions: async function (Bearer, transRef, sendingBank, thisguid) {
			let headers = {
				"Content-Type": "application/json",
				authorization: "Bearer " + Bearer,
				resourceOwnerId: this.applicationKey,
				requestUId: thisguid,
				"accept-language": "EN",
			};

			const url = this.url_endpoint + `/payment/billpayment/transactions/${transRef}?sendingBank=${sendingBank}`;
			try {
				const response = await fetch(url, {
					method: "GET", // or 'PUT'
					headers: headers,
					redirect: "follow",
				});
				const result = await response.json();
				return result;
			} catch (error) {
				console.log("error", error);
			}
		},
		billpaymentInquiry: async function (Bearer, inv_ref, process_type, thisguid) {
			let headers = {
				"Content-Type": "application/json",
				authorization: "Bearer " + Bearer,
				resourceOwnerId: this.applicationKey,
				requestUId: thisguid,
				"accept-language": "EN",
			};

			const url = this.url_endpoint + `/payment/billpayment/inquiry?eventCode=00300100&billerId=${this.billingId}&transactionDate=2021-08-26&reference1=${inv_ref}&reference2=${process_type}`;
			try {
				const response = await fetch(url, {
					method: "GET", // or 'PUT'
					headers: headers,
					redirect: "follow",
				});
				const result = await response.json();
				return result;
			} catch (error) {
				console.log("error", error);
			}
		},
	},

	twoc2p_pay_credit: async function (path, ddd) {
		const url = path;
		try {
			const formData = new URLSearchParams();
			// formData.append("paymentRequest", ddd);

			// return await new Promise(async function(resolve, reject) {
			//     const response = await fetch(url, {
			//         method: 'POST', // or 'PUT'
			//         body: formData,
			//         // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			//         redirect: 'follow'
			//     })
			//     let result = await response.text();
			//     resolve(result);
			// });

			//-----------------

			// return formData;

			return await new Promise(function (resolve, reject) {
				var form = {
					paymentRequest: ddd,
				};
				var querystring = require("querystring");
				var formData = querystring.stringify(form);
				var contentLength = formData.length;
				var request = require("request");

				request(
					{
						headers: {
							"Content-Length": contentLength,
							"Content-Type": "application/x-www-form-urlencoded",
						},
						uri: url,
						body: formData,
						method: "POST",
					},
					function (aaa, bbb, ccc) {
						// console.log("se: ", aaa, bbb, ccc);
						// let xxx = await res.json();
						resolve({ aaa, bbb, ccc });
					}
				);
			});

			//-------------
			// var form = {
			//     "paymentRequest": ddd
			// };
			// var request = require('request');
			// // return formData;

			// var raw = JSON.stringify(form);
			// return await new Promise(function(resolve, reject) {
			//     request({
			//         headers: {
			//             'Content-Type': 'application/x-www-form-urlencoded'
			//         },
			//         uri: url,
			//         body: raw,
			//         method: 'POST'
			//     }, function(aaa, bbb, ccc, ddd, eee) {
			//         console.log("se: ", aaa, bbb, ccc, ddd, eee);
			//         // let xxx = await res.json();
			//         resolve({ aaa, bbb, ccc, ddd, eee });

			//     });
			// });
		} catch (error) {
			console.log("error", error);
		}
	},
	twoc2p_deJWT: async function (token, jwt_secret) {
		if (token) {
			var jwt = require("jsonwebtoken");
			return await new Promise(function (resolve, reject) {
				jwt.verify(token, jwt_secret, function (err, decoded) {
					if (err) {
						resolve({ error: "1", msg: "wrong token" });
					} else {
						//console.log("x:"+JSON.stringify(decoded));
						resolve(decoded);
					}
				});
			});
		} else {
			return { error: "1", msg: "no token" };
		}
	},
	twoc2p_call: async function (path, ddd) {
		const url = path;
		try {
			return await new Promise(function (resolve, reject) {
				var datax = {
					payload: ddd,
				};
				var raw = JSON.stringify(datax);
				var request = require("request");
				request(
					{
						headers: { Accept: "text/plain", "Content-Type": "application/*+json" },
						uri: url,
						body: raw,
						method: "POST",
					},
					function (aaa, bbb, ccc) {
						// console.log("se: ", aaa, bbb, ccc);
						// let xxx = await res.json();
						resolve({ aaa, bbb, ccc });
					}
				);
			});

			//-------------
			// var form = {
			//     "paymentRequest": ddd
			// };
			// var request = require('request');
			// // return formData;

			// var raw = JSON.stringify(form);
			// return await new Promise(function(resolve, reject) {
			//     request({
			//         headers: {
			//             'Content-Type': 'application/x-www-form-urlencoded'
			//         },
			//         uri: url,
			//         body: raw,
			//         method: 'POST'
			//     }, function(aaa, bbb, ccc, ddd, eee) {
			//         console.log("se: ", aaa, bbb, ccc, ddd, eee);
			//         // let xxx = await res.json();
			//         resolve({ aaa, bbb, ccc, ddd, eee });

			//     });
			// });
		} catch (error) {
			console.log("error", error);
		}
	},

	callAPIThirdParty: async function (url, formdata, option, pay_type) {
		// var form = {
		//     "applicationKey": this.applicationKey,
		//     "applicationSecret": this.applicationSecret
		// };
		var datasend = {
			error: option,
			pay_type: pay_type, //"QR" , "CREDIT"
			msg: option == "1" ? "ชำระไม่สำเร็จ" : "ชำระสำเร็จแล้ว",
			data: formdata,
		};
		var raw = JSON.stringify(datasend);

		let headers = {
			"Content-Type": "application/json",
			"accept-language": "EN",
		};

		try {
			const response = await fetch(url, {
				method: "POST", // or 'PUT'
				body: raw,
				headers: headers,
				redirect: "follow",
			});
			const result = await response.json();
			return result;
		} catch (error) {
			console.log("error", error);
		}
	},

	fetchAPIExample: async function (path, formData) {
		// const formData = new URLSearchParams()

		// formData.append("telephone", data.telephone);
		// formData.append("account_no", "N2O");
		// formData.append("amount", data.amount);
		// formData.append("action", "DOCTOR_CONSULT");

		const url = `http://xxxxx/${path}`;
		try {
			const response = await fetch(url, {
				method: "POST", // or 'PUT'
				body: formData,
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				redirect: "follow",
			});
			const { error, result, msg, time } = await response.json();
			return { error, result, msg };
		} catch (error) {
			console.log("error", error);
		}
	},
	getFullURL: function (req) {
		return req.protocol + "://" + req.get("host") + req.originalUrl;
	},
	getClientIP: function (req) {
		let client_ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
		let arr = client_ip.split(",");
		return arr[0];
	},

	responseSuccess: function (res, msg, result = []) {
		res.status(200)
			.json({
				error: "0",
				msg: msg,
				result: result,
			})
			.end();
	},
	responseSuccessList: function (res, msg, result = [], total = 0, limit = 10, page = 1) {
		if (total === 0) {
			total = result.length;
		}

		res.status(200)
			.json({
				error: "0",
				msg: msg,
				result: result,
				total: total,
				limit: limit,
				page: page,
			})
			.end();
	},
	responseError: function (res, msg, result = [], error = "1") {
		if (msg != undefined && msg.length > 300) {
			msg = msg.substring(0, 300) + "....";
		}
		res.status(200)
			.json({
				error: error,
				msg: msg,
				result: result,
			})
			.end();
	},

	sendLineNotifyErr: function (client, URL, IP, err, err_type, thisreq) {
		//err_type can be API, SOCKET
		// return;
		const lineAPI = require("line-api");
		const LINE_NOTIFY_TOKEN = "PfHJJarHZOFjNJ5hgqzAjhKi4qxHenavuPFjwzZTcJf"; //error man
		// const LINE_NOTIFY_TOKEN = "3Mq6F7FCj2iFeJAFfT5J57fF2pvMKMDNxT6i2lbVMm8";// error MIP
		const lineNotify = new lineAPI.Notify({ token: LINE_NOTIFY_TOKEN });
		let err_msg = "";
		if (err.stack) {
			if (err.stack.length > 300) {
				err_msg = err.stack.substring(0, 300) + "....";
			} else {
				err_msg = err.stack;
			}
		}
		if (err.message == undefined) {
			err_msg = err;
		}
		var thisOS = "";
		if (err_type == "API") {
			thisOS = client.headers["user-agent"];
		} else if (err_type == "SOCKET") {
			thisOS = client.handshake.headers["user-agent"];
		}
		// thisOS = thisOS.substring(0, 50) + '....';
		// lineNotify.status().then(()=>{console.log(lineNotify.ratelimit)})
		const lineNotifyMessage = "😒 " + err_type + " Err: " + (err.message == undefined ? "error handle" : err.message) + "\n " + "***Wallet มี error รายละเอียดตามนี้***" + "\n " + " Detail: " + err_msg + "\n " + "---------" + "\n " + " From URL: " + URL + "\n " + " By IP: " + IP + "\n " + " OS: " + thisOS + "\n " + " req: " + thisreq;
		lineNotify.send({
			message: lineNotifyMessage,
			// sticker: 'smile', // shorthand
			// sticker : { packageId: 1, id: 2 } // exact ids
			// image: 'test.jpg' // local file
			// image: { fullsize: 'http://example.com/1024x1024.jpg', thumbnail: 'http://example.com/240x240.jpg' } // remote url
		});
	},
	dumpError: function (err) {
		if (typeof err === "object") {
			if (err.message) {
				console.log("\nMessage: " + err.message + " @" + new Date().toISOString());
			}
			if (err.stack) {
				console.log("\nStacktrace:");
				console.log("========== @" + new Date().toISOString() + " ==========");
				console.log(err.stack);
			}
		} else {
			console.log("dumpError :: argument is not an object");
		}
	},
	//ใช้กับ api
	checkParamArray: (json_obj, prop_arr, res) => {
		let itemreturn = true;
		let prop_strs = [];
		for (const prop of prop_arr) {
			if (typeof json_obj[prop] === "undefined") {
				itemreturn = false;
				prop_strs.push(prop);
			}
		}
		if (itemreturn == false) {
			res.send({ error: "1", msg: prop_strs + " is undefined", result: [] });
			return false;
		}

		return true;
	},
	//ใช้กับ api
	checkParam: function (json_obj, prop, res) {
		var itemreturn = true;
		if (typeof json_obj[prop] === "undefined") {
			itemreturn = false;
		}
		if (itemreturn == false) {
			res.send({ error: "1", msg: prop + " is undefined(จำเป็นต้องส่งมา ห้ามnull)", result: [] });
			return false;
		}
		return true;
	},

	signJWT: async function (user) {
		// user = {
		//     username : "xxxx",
		//     name : "xxxx"
		// }
		try {
			var jwt = require("jsonwebtoken");
			var token = jwt.sign(user, jwt_secret, {
				expiresIn: 144000000, // expires in 24 hours
			});
			return { error: "0", msg: "Sign ok", data: token };
		} catch (e) {
			return { error: "1", msg: e.stack };
		}
	},
	decodeJWT: async function (token) {
		if (token) {
			var jwt = require("jsonwebtoken");
			return await new Promise(function (resolve, reject) {
				jwt.verify(token, jwt_secret, function (err, decoded) {
					if (err) {
						resolve({ error: "1", msg: "wrong token" });
					} else {
						//console.log("x:"+JSON.stringify(decoded));
						resolve({
							error: "0",
							msg: "right token",
							username: decoded.username,
							name: decoded.name,
						});
					}
				});
			});
		} else {
			return { error: "1", msg: "no token" };
		}
	},
	sendSMSThaiBulk: async function (phone, message) {
		try {
			const options = {
				apiKey: "f2321614854d77a74dcb68cc13a45b26",
				apiSecret: "0e55f7a8b75d22fdc756c5a6ae0bb01e",
			};
			const thaibulksmsApi = require("thaibulksms-api");
			const sms = thaibulksmsApi.sms(options);

			let body = {
				msisdn: phone,
				message: "jeud",
				sender: message,
				// scheduled_delivery: '',
				force: "corporate",
			};
			return await new Promise(async function (resolve, reject) {
				const response = await sms.sendSMS(body);
				resolve(response);
			});
		} catch (e) {
			return e;
		}
	},
	sendOTPThaiBulk: async function (phoneNumber) {
		try {
			const thaibulksmsApi = require("thaibulksms-api");
			const options = {
				apiKey: process.env.OTP_API_KEY,
				apiSecret: process.env.OTP_SECRET_KEY,
			};
			const otp = thaibulksmsApi.otp(options);

			const response = await otp.request(phoneNumber);
			return response;
		} catch (e) {
			console.log(e);
			return false;
		}
	},
	sendOTPVerifyThaiBulk: async function (token, pin) {
		try {
			const thaibulksmsApi = require("thaibulksms-api");
			const options = {
				apiKey: process.env.OTP_API_KEY,
				apiSecret: process.env.OTP_SECRET_KEY,
			};
			const otp = thaibulksmsApi.otp(options);

			const response = await otp.verify(token, pin);
			console.log("zz:" + response);
			return response;
		} catch (e) {
			console.log(e);
			return false;
		}
	},

	checkAvaliableString: function (txt) {
		function isVowel(char) {
			if (char.length == 1) {
				var vowels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
				var isVowel = vowels.indexOf(char) >= 0 ? true : false;

				return isVowel;
			}
		}
		if (txt == null || txt == undefined) {
			return 0;
		}
		var oritxtlength = txt.length;
		var result = 0;

		for (var i = 0; i < oritxtlength; i++) {
			if (isVowel(txt[i]) == true) {
				result = result + 1;
			}
		}
		return result;
	},

	dirUpload: function () {
		return __dirname;
	},
	md5: function (str) {
		return md5(str);
	},
	randomString: function (len) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < len; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	},
	randomNumber: function (len) {
		var text = "";
		var possible = "0123456789";

		for (var i = 0; i < len; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	},

	sendMail: function (mailto, subject, detail, mailtype) {
		var nodemailer = require("nodemailer");
		var smtpTransport = nodemailer.createTransport({
			service: "gmail",
			host: "smtp.gmail.com",
			auth: {
				user: "no-reply@shopteenii.com",
				pass: "dev@2Mip",
			},
		});
		var mailOptions = {
			from: "no-reply@shopteenii.com",
			to: mailto,
			subject: subject,
			//text : detail//'พบมีผู้ไม่ประสงค์ดีก่อกวน server ของเรา \r\n จาก IP '+ this.ip
			//html : detail// returnเป็น html
		};
		if (mailtype == "text") {
			mailOptions.text = detail;
		} else {
			mailOptions.html = detail;
		}

		smtpTransport.sendMail(mailOptions, function (error, response) {
			if (error) {
				console.log(error);
				//res.end("error");
			} else {
				console.log("Message sent: " + response + " to : " + mailto);
				//res.end("sent");
			}
		});
		//---------------------------------
	},
	genMongoId: function (str) {
		if (str != "" && str != null && str != undefined) {
			return mongoose.Types.ObjectId(str);
		} else {
			return mongoose.Types.ObjectId();
		}
	},
	genGuid: function (genType) {
		//genType ["time","random"]
		if (genType == "time") {
			// Generate a v1 UUID (time-based)
			const uuidV1 = require("uuid/v1");
			let itemreturn = uuidV1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
			return itemreturn;
		} else if (genType == "random") {
			// Generate a v4 UUID (random)
			const uuidV4 = require("uuid/v4");
			let itemreturn = uuidV4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
			return itemreturn;
		}
	},
	arrUnique: function (arr) {
		const _ = require("underscore");
		var cleaned = [];
		arr.forEach(function (itm) {
			var unique = true;
			cleaned.forEach(function (itm2) {
				if (_.isEqual(itm, itm2)) unique = false;
			});
			if (unique) cleaned.push(itm);
		});
		return cleaned;
	},
	sendNoti_GCM: async function (title, body, registrationIds, context) {
		//google old tool..
		const gcm = require("node-gcm");
		var message = new gcm.Message();
		var sender = new gcm.Sender("XXX"); //old

		var message = new gcm.Message({
			priority: "high",
			contentAvailable: true,
			delayWhileIdle: false,
			timeToLive: 3,
			dryRun: false,
			notification: {
				title: title,
				icon: "myicon",
				body: body,
				// sound: "alarm.mp3",
				sound: "alarm_sound.mp3",
			},
		});

		await sender.send(message, registrationIds, true, function (err, result) {
			//true = with retries in JSON format,false = without retries in plain-text format
			if (err) {
				console.error("error : " + err);
			} else {
				console.log("done : " + JSON.stringify(result));
			}
		});
	},
	decodeBase64Image: function (dataString) {
		var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
		var response = {};

		if (matches.length !== 3) {
			return new Error("Invalid input string");
		}

		response.type = matches[1];
		response.data = new Buffer.from(matches[2], "base64");

		return response;
	},
	SHA256: function (s) {
		var chrsz = 8;
		var hexcase = 0;

		function safe_add(x, y) {
			var lsw = (x & 0xffff) + (y & 0xffff);
			var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return (msw << 16) | (lsw & 0xffff);
		}

		function S(X, n) {
			return (X >>> n) | (X << (32 - n));
		}

		function R(X, n) {
			return X >>> n;
		}

		function Ch(x, y, z) {
			return (x & y) ^ (~x & z);
		}

		function Maj(x, y, z) {
			return (x & y) ^ (x & z) ^ (y & z);
		}

		function Sigma0256(x) {
			return S(x, 2) ^ S(x, 13) ^ S(x, 22);
		}

		function Sigma1256(x) {
			return S(x, 6) ^ S(x, 11) ^ S(x, 25);
		}

		function Gamma0256(x) {
			return S(x, 7) ^ S(x, 18) ^ R(x, 3);
		}

		function Gamma1256(x) {
			return S(x, 17) ^ S(x, 19) ^ R(x, 10);
		}

		function core_sha256(m, l) {
			var K = new Array(0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0xfc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x6ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2);
			var HASH = new Array(0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19);
			var W = new Array(64);
			var a, b, c, d, e, f, g, h, i, j;
			var T1, T2;
			m[l >> 5] |= 0x80 << (24 - (l % 32));
			m[(((l + 64) >> 9) << 4) + 15] = l;
			for (var i = 0; i < m.length; i += 16) {
				a = HASH[0];
				b = HASH[1];
				c = HASH[2];
				d = HASH[3];
				e = HASH[4];
				f = HASH[5];
				g = HASH[6];
				h = HASH[7];
				for (var j = 0; j < 64; j++) {
					if (j < 16) W[j] = m[j + i];
					else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
					T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
					T2 = safe_add(Sigma0256(a), Maj(a, b, c));
					h = g;
					g = f;
					f = e;
					e = safe_add(d, T1);
					d = c;
					c = b;
					b = a;
					a = safe_add(T1, T2);
				}
				HASH[0] = safe_add(a, HASH[0]);
				HASH[1] = safe_add(b, HASH[1]);
				HASH[2] = safe_add(c, HASH[2]);
				HASH[3] = safe_add(d, HASH[3]);
				HASH[4] = safe_add(e, HASH[4]);
				HASH[5] = safe_add(f, HASH[5]);
				HASH[6] = safe_add(g, HASH[6]);
				HASH[7] = safe_add(h, HASH[7]);
			}
			return HASH;
		}

		function str2binb(str) {
			var bin = Array();
			var mask = (1 << chrsz) - 1;
			for (var i = 0; i < str.length * chrsz; i += chrsz) {
				bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - (i % 32));
			}
			return bin;
		}

		function Utf8Encode(string) {
			string = string.replace(/\r\n/g, "\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if (c > 127 && c < 2048) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		}

		function binb2hex(binarray) {
			var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
			var str = "";
			for (var i = 0; i < binarray.length * 4; i++) {
				str += hex_tab.charAt((binarray[i >> 2] >> ((3 - (i % 4)) * 8 + 4)) & 0xf) + hex_tab.charAt((binarray[i >> 2] >> ((3 - (i % 4)) * 8)) & 0xf);
			}
			return str;
		}
		s = Utf8Encode(s);
		return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
	},
	isNumeric: function (n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	},
	pagination: function ({ totalCount, pageSize, page }) {
		if (!totalCount && !pageSize && !page) return;
		totalCount = parseInt(totalCount);
		pageSize = parseInt(pageSize);
		page = parseInt(page);

		let isPrev, isNext;
		const totalCurrent = page * pageSize;
		if (totalCurrent < totalCount) {
			isNext = true;
		} else if (totalCurrent >= totalCount) {
			isNext = false;
		}

		if (page <= 1) {
			isPrev = false;
		} else {
			isPrev = true;
		}

		return {
			count: totalCount,
			isPrev,
			isNext,
		};
	},
};

module.exports = GlobalService;
