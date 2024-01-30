//mongoose, dirupload
const md5 = require('md5');
const fs = require('fs');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const moment = require('moment');

const Cryptr = require('cryptr');
const cryptr = new Cryptr('1q2w3e4r5t');
const jwt_secret = 'SP1q2w3e';
const CryptoJS = require('crypto-js');

const bcrypt = require('bcrypt');

var keySetting = {
    "system_type" : "PROD",//"PROD","UAT"
    "yaamoPath": "https://api-korat-center.mip.co.th/public/",

    "httpPath": "https://api.nipponjob.space/api_wallet/",//"http://18.140.65.176:4005/", <--uat
    // "httpPath": "https://wallet.multipay.finance/",//"http://18.140.65.176:4005/", <--prod
    
    "twoC2P_merchantID" : "014011000036411",
    //"jwt_secret_sha_2c2p" : "F9A99139DC81407E5E21E428E4F0E1F78C47BF0393407048AC149786397DEC02",//demo 
    "jwt_secret_sha_2c2p" : "F4D20E2A9CE74604B3D6D93AFD0FA82D90E0097004B02A1292BB7929EA099196",//pro 
    //"payment_token_2c2p" : "https://sandbox-pgw.2c2p.com/payment/4.1/PaymentToken",//demo
    "payment_token_2c2p" : "https://pgw.2c2p.com/payment/4.1/PaymentToken",//pro

    "billingId": "010556202649901",// <--prod
    // "url_endpoint": 'https://api-uat.partners.scb/partners/v1', //uat
    "url_endpoint": 'https://api.partners.scb/partners/v1', //pro
    // "applicationKey": "l7bca4a9c2d6f645709eb88c9c4eb96121",// <--uat resourceOwnerID
    // "applicationSecret": "07043e39438f45cfacc208edb9852669",// <--uat
    "applicationKey" : "l76ad2094501954f87944b8334b6d24b1d",// <--prod
    "applicationSecret": "dd05bdbda12a4ae5ad89d8e14536b948",// <--prod

}
module.exports = keySetting;
