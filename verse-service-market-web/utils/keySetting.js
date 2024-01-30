//mongoose, dirupload
const md5 = require("md5");
const fs = require("fs");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const moment = require("moment");

const Cryptr = require("cryptr");
const cryptr = new Cryptr("1q2w3e4r5t");
const jwt_secret = "SP1q2w3e";
const CryptoJS = require("crypto-js");

const bcrypt = require("bcrypt");

var keySetting = {
	system_type: "PROD",
	yaamoPath: "https://api-korat-center.mip.co.th/public/",

	httpPath: "https://api.nipponjob.space/api_wallet/",

	twoC2P_merchantID: "014011000036411",
	jwt_secret_sha_2c2p: "F4D20E2A9CE74604B3D6D93AFD0FA82D90E0097004B02A1292BB7929EA099196",
	payment_token_2c2p: "https://pgw.2c2p.com/payment/4.1/PaymentToken",

	billingId: "010556202649901",
	url_endpoint: "https://api.partners.scb/partners/v1",
	applicationKey: "l76ad2094501954f87944b8334b6d24b1d",
	applicationSecret: "dd05bdbda12a4ae5ad89d8e14536b948",
};
module.exports = keySetting;
