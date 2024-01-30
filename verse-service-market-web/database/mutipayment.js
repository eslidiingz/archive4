/*
 Navicat Premium Data Transfer

 Source Server         : multipay-mongodb
 Source Server Type    : MongoDB
 Source Server Version : 40410
 Source Host           : 134.209.108.190:27017
 Source Schema         : mutipayment

 Target Server Type    : MongoDB
 Target Server Version : 40410
 File Encoding         : 65001

 Date: 30/11/2021 17:41:45
*/


// ----------------------------
// Collection structure for admin_users
// ----------------------------
db.getCollection("admin_users").drop();
db.createCollection("admin_users");

// ----------------------------
// Documents of admin_users
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("mutipayment");
db.getCollection("admin_users").insert([ {
    _id: ObjectId("610ba5187ac095b95df14046"),
    username: "magajeud@gmail.com",
    password: "e10adc3949ba59abbe56e057f20f883e",
    email: "magajeud@gmail.com",
    "token_login": "11111",
    "img_url": "",
    remark: "jeudtest",
    name: "jeud",
    "last_login": ISODate("2021-11-30T10:26:11.156Z"),
    "is_delete": false,
    "is_enable": true,
    "created_date": ISODate("2021-08-05T03:57:52.351Z"),
    "created_by": "",
    "updated_date": null,
    "updated_by": "",
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hZ2FqZXVkQGdtYWlsLmNvbSIsIm5hbWUiOiJqZXVkIiwiaWF0IjoxNjM4MjY3OTcxLCJleHAiOjE3ODIyNjc5NzF9.JybQVCCsZA0RaqNM887bRGbtrxVW78F1fVbWcPiYxdU"
} ]);
db.getCollection("admin_users").insert([ {
    _id: ObjectId("61a4905008f41da5c9abcaf1"),
    username: "watcharathat@gmail.com",
    password: "b59c67bf196a4758191e42f76670ceba",
    email: "watcharathat@gmail.com",
    "token_login": "",
    "img_url": "",
    remark: "jeudtest",
    name: "jeud",
    "last_login": ISODate("2021-11-30T10:33:08.253Z"),
    "is_delete": false,
    "is_enable": true,
    "created_date": ISODate("2021-08-05T03:57:52.351Z"),
    "created_by": "",
    "updated_date": null,
    "updated_by": "",
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndhdGNoYXJhdGhhdEBnbWFpbC5jb20iLCJuYW1lIjoiamV1ZCIsImlhdCI6MTYzODI2ODM4OCwiZXhwIjoxNzgyMjY4Mzg4fQ.g1pa2KKFrXb_rJPBzVVIU1TRRtErQKDqBGd3fvUPIjE"
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for system_configs
// ----------------------------
db.getCollection("system_configs").drop();
db.createCollection("system_configs");

// ----------------------------
// Documents of system_configs
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("mutipayment");
db.getCollection("system_configs").insert([ {
    _id: ObjectId("611b57db35f54f9329837c9a"),
    "qr_charge_fee_per": NumberInt("0"),
    "credit_charge_fee_per": NumberInt("3")
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for system_names
// ----------------------------
db.getCollection("system_names").drop();
db.createCollection("system_names");

// ----------------------------
// Documents of system_names
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("mutipayment");
db.getCollection("system_names").insert([ {
    _id: ObjectId("611e10cf35f54f9329f27765"),
    "system_name": "TEST",
    "sec_key": "mipxx",
    "system_ip": "122.155.209.142",
    "full_name": "Dev test",
    remark: "ใช้สำหรับทดสอบเท่านั้น",
    email: "",
    "callback_qr_pay": "",
    "callback_credit_pay": "",
    "redirect_url_credit_pay": "https://www.thairath.co.th/home",
    "is_pay_qr": true,
    "is_pay_credit": true,
    "is_topup_qr": true,
    "is_topup_credit": true,
    "is_wallet_withdraw": true,
    "is_need_for_register": false,
    "is_delete": false,
    "is_enable": true,
    "created_date": null,
    "created_by": "",
    "updated_date": null,
    "updated_by": ""
} ]);
db.getCollection("system_names").insert([ {
    _id: ObjectId("61556e18c23aa9426268cf99"),
    "system_name": "KK",
    "sec_key": "kk1234",
    "system_ip": "188.166.241.231",
    "full_name": "KK test",
    remark: "ใช้สำหรับทดสอบ KK เท่านั้น",
    email: "",
    "callback_qr_pay": "http://188.166.241.231/kk-wallet-callback",
    "callback_credit_pay": "http://188.166.241.231/kk-wallet-callback",
    "redirect_url_credit_pay": "https://web.kingkaster.com/payment/callbackTopup?inv_ref=",
    "is_pay_qr": false,
    "is_pay_credit": false,
    "is_topup_qr": true,
    "is_topup_credit": true,
    "is_wallet_withdraw": false,
    "is_need_for_register": false,
    "is_delete": false,
    "is_enable": true,
    "created_date": null,
    "created_by": "",
    "updated_date": null,
    "updated_by": ""
} ]);
db.getCollection("system_names").insert([ {
    _id: ObjectId("6112554e516b371f38d0b1f3"),
    "system_name": "NEWA",
    "sec_key": "newa123",
    "system_ip": "122.155.209.142",
    "full_name": "พรรคทางเลือกใหม่",
    remark: "ใช้สำหรับการชำระเงิน และเติมเงินเข้ากระเป๋าระบบพรรคทางเลือกใหม่",
    email: "",
    "callback_qr_pay": "",
    "callback_credit_pay": "",
    "redirect_url_credit_pay": "",
    "is_pay_qr": true,
    "is_pay_credit": false,
    "is_topup_qr": false,
    "is_topup_credit": false,
    "is_wallet_withdraw": false,
    "is_need_for_register": false,
    "is_delete": false,
    "is_enable": true,
    "created_date": null,
    "created_by": "",
    "updated_date": null,
    "updated_by": ""
} ]);
db.getCollection("system_names").insert([ {
    _id: ObjectId("611e299135f54f93291303e4"),
    "system_name": "SHMP",
    "sec_key": "shmp123",
    "system_ip": "122.155.209.142",
    "full_name": "Shopteeni MP",
    remark: "",
    email: "magajeud@gmail.com",
    "callback_qr_pay": "",
    "callback_credit_pay": "",
    "redirect_url_credit_pay": "",
    "is_pay_qr": true,
    "is_pay_credit": true,
    "is_topup_qr": false,
    "is_topup_credit": false,
    "is_wallet_withdraw": false,
    "is_need_for_register": false,
    "is_delete": false,
    "is_enable": true,
    "created_date": null,
    "created_by": "",
    "updated_date": null,
    "updated_by": ""
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for wallets
// ----------------------------
db.getCollection("wallets").drop();
db.createCollection("wallets");

// ----------------------------
// Documents of wallets
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("mutipayment");
db.getCollection("wallets").insert([ {
    _id: ObjectId("61a5ffb8dbad071e6a54ae21"),
    tel: "0817439730",
    email: "",
    "account_name": "",
    balance: NumberInt("0"),
    "coin_balance": NumberInt("0"),
    "image_url": "",
    remark: "",
    "lasted_os": "android",
    "device_token": "",
    "otp_ref": "",
    "is_delete": false,
    "is_enable": true,
    "created_date": ISODate("2021-11-30T10:40:56.8Z"),
    "created_by": "",
    "updated_date": null,
    "updated_by": "",
    "system_name_in_use": [
        {
            "bank_detail": {
                "bank_code": "",
                "bank_name": "",
                "account_no": "",
                "account_name": "",
                "bank_branch_name": "",
                "front_book_image_url": ""
            },
            "system_name": "TEST",
            "register_date": ISODate("2021-11-30T10:40:56.8Z"),
            "is_kyc": false,
            _id: ObjectId("61a5ffb8dbad071e6a54ae22")
        }
    ],
    "update_detail": [ ],
    __v: NumberInt("0")
} ]);
db.getCollection("wallets").insert([ {
    _id: ObjectId("61a5ffb8dbad071e6a54ae23"),
    tel: "0811112222",
    email: "",
    "account_name": "",
    balance: NumberInt("0"),
    "coin_balance": NumberInt("0"),
    "image_url": "",
    remark: "",
    "lasted_os": "android",
    "device_token": "",
    "otp_ref": "",
    "is_delete": false,
    "is_enable": true,
    "created_date": ISODate("2021-11-30T10:40:56.819Z"),
    "created_by": "",
    "updated_date": null,
    "updated_by": "",
    "system_name_in_use": [
        {
            "bank_detail": {
                "bank_code": "",
                "bank_name": "",
                "account_no": "",
                "account_name": "",
                "bank_branch_name": "",
                "front_book_image_url": ""
            },
            "system_name": "TEST",
            "register_date": ISODate("2021-11-30T10:40:56.819Z"),
            "is_kyc": false,
            _id: ObjectId("61a5ffb8dbad071e6a54ae24")
        }
    ],
    "update_detail": [ ],
    __v: NumberInt("0")
} ]);
db.getCollection("wallets").insert([ {
    _id: ObjectId("61a5ffb8dbad071e6a54ae25"),
    tel: "0817439738",
    email: "magajeud@gmail.com",
    "account_name": "jeud",
    balance: NumberInt("0"),
    "coin_balance": NumberInt("0"),
    "image_url": "",
    remark: "",
    "lasted_os": "android",
    "device_token": "",
    "otp_ref": "",
    "is_delete": false,
    "is_enable": true,
    "created_date": ISODate("2021-11-30T10:40:56.825Z"),
    "created_by": "",
    "updated_date": null,
    "updated_by": "",
    "system_name_in_use": [
        {
            "bank_detail": {
                "bank_code": "",
                "bank_name": "",
                "account_no": "",
                "account_name": "",
                "bank_branch_name": "",
                "front_book_image_url": ""
            },
            "system_name": "TEST",
            "register_date": ISODate("2021-11-30T10:40:56.825Z"),
            "is_kyc": false,
            _id: ObjectId("61a5ffb8dbad071e6a54ae26")
        }
    ],
    "update_detail": [ ],
    __v: NumberInt("0")
} ]);
session.commitTransaction(); session.endSession();
