const express = require("express");
const route = express.Router();
const moment = require("moment");
var schedule = require("node-schedule");

const config = require("../../systems/config/config");
const globalService = require("./../../utils/globalService");
const models = require("./../../schema/index.js");
const modelService = require("./../../utils/modelService")(
  models,
  globalService
);
const _ = require("underscore");
const fetch = require("node-fetch");
const { formatDate } = require("../../utils/Utils");

const multipayUrl = `https://wallet.multipay.finance/1.0.0`;
// const systemUrl = `https://ticket.multiverse2021.io`;
const systemUrl = `https://tyvm.multiverse2021.io`;
const systemName = `CX`; // CNBx SYSTEM NAME
const shopTel = `0851993754`; // MEX WALLET

// FUNCTION
async function decode2C2P(response) {
  let itemdecode = Buffer.from(response, "base64").toString("ascii");
  let start = itemdecode.indexOf("}{") + 1;
  let end = itemdecode.indexOf("respDesc");
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
    Accept: "*/*",
    "Cache-Control": "no-cache",
    sec_token: _sec_token,
  };

  const res = await fetch(multipayUrl + _url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(_content),
  });

  let resJson = await res.json();
  console.log(" === callMultiPay resJson ", resJson);

  return resJson;
};

const handleSseClientResponse = async (_req, response, eventName) => {
  console.log(" === eventName ", eventName);
  console.log(
    " === response.data.verse_invoice_no ",
    response.data.verse_invoice_no
  );
  console.log(" === sseClients ", sseClients);

  let client = sseClients[response.data.verse_invoice_no];

  client.write(`event: ${eventName}\n`);
  client.write(`data: ${JSON.stringify(response)}\n\n`);
  client.end();

  sseClients = sseClients.filter((item, index) => {
    return index != response.data.verse_invoice_no;
  });
};

const diffTime = (dt2, dt1) => {
  var diff = dt2.getTime() - dt1.getTime();
  return diff;
};
// FUNCTION END

// REDIRECT
route.get("/callback", async function (req, res) {
  console.log(" === /callback GET ", req.body);
  let r = await decode2C2P(req.body.paymentResponse);
  console.log(" === /callback GET response ", r);
  res.redirect(`${systemUrl}/payment/result?inv_ref=${r.invoiceNo}`);
});
route.post("/callback", async function (req, res) {
  console.log(" === /callback GET ", req.body);
  let r = await decode2C2P(req.body.paymentResponse);
  console.log(" === /callback GET response ", r);
  res.redirect(`${systemUrl}/payment/result?inv_ref=${r.invoiceNo}`);
});
// REDIRECT END

// SSE CLIENTS
var sseClients = [];

route.get("/sse/:inv", async function (req, res) {
  let key = req.params.inv;

  let resTransaction = await models.mexpay_transactions.findOne(
    { verse_invoice_no: key },
    {},
    {}
  );
  var callback_endpoint = resTransaction.callback_endpoint
    ? resTransaction.callback_endpoint
    : systemUrl;

  console.log("now", new Date(formatDate(new Date())));
  console.log("expiry_date", new Date(resTransaction.expiry_date));

  console.log(
    diffTime(
      new Date(resTransaction.expiry_date),
      new Date(formatDate(new Date()))
    )
  );

  setTimeout(() => {
    console.log(" === SSE TIMEOUT ", key);
    // console.log(" === SSE TIMEOUT callback_endpoint ", callback_endpoint);

    // REMOVE PAYMENY SESSION จ่ายช้า
    fetch(`${callback_endpoint}/api/payment/expire`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invoice_no: req.params.inv,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(" === PAYMENT EXPIRED ");
        console.log(res);
        console.log(" === PAYMENT EXPIRED END ");
      });

    let payment_response = {
      success: false,
      data: {},
    };
    res.write(`event: payment-timeout\n`);
    res.write(`data: ${JSON.stringify(payment_response)}\n\n`);
    res.end();

    console.log(" === SSE TIMEOUT END ", key);
  }, diffTime(new Date(resTransaction.expiry_date), new Date(formatDate(new Date())))); // 5 นาที

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  });
  sseClients[key] = res;

  console.log(" SSE CLIENT : ", key);

  req.on("close", () => {
    console.log(" SSE CLOSE :", key);
    sseClients = sseClients.filter((item, index) => {
      return index != key;
    });
  });
});
// SSE CLIENTS END

route.post("/verse_credit_callback", async function (_req, _res) {
  let response = {};

  console.log(" === from multipay ", _req.body);

  try {
    if (_req.body.error == "0") {
      let row = await models.mexpay_transactions
        .findOneAndUpdate(
          {
            inv_ref_full: _req.body.data.invoiceNo,
          },
          {
            is_success: true,
            is_enabled: true,
            updated_at: new Date().toISOString(),
          }
        )
        .exec();

      payment_response = {
        success: true,
        invoice_no: row.verse_invoice_no,
        data: row,
      };
    } else {
      let row = await models.mexpay_transactions
        .findOneAndUpdate(
          {
            inv_ref_full: _req.body.data.invoiceNo,
          },
          {
            is_success: false,
            is_enabled: false,
            updated_at: new Date().toISOString(),
          }
        )
        .exec();

      payment_response = {
        success: false,
        invoice_no: row.verse_invoice_no,
        data: row,
      };
    }

    console.log(" === payment_response ", payment_response);
    handleSseClientResponse(_req, payment_response, "payment-credit-response");

    // PAYMENT CALLBACK
    let callback_url = payment_response.data.callback_endpoint
      ? payment_response.data.callback_endpoint
      : systemUrl;
    const resPaymentCallback = await fetch(
      `${callback_url}/api/payment/callback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment_response),
      }
    );
    const resPaymentCallbackJson = await resPaymentCallback.json();
    console.log(" === resPaymentCallbackJson ", resPaymentCallbackJson);

    response = {
      success: true,
      result: payment_response,
    };
  } catch (error) {
    console.log(" === verse_credit_callback ERROR ", error);
    response = {
      success: false,
      error: "Something Wrong",
    };
  } finally {
    _res.json(response);
  }
});

route.post("/verse_qr_callback", async function (_req, _res) {
  let response = {};

  console.log(" === from multipay qr ", _req.body);

  try {
    let payment_response;

    if (_req.body.error == "0") {
      let row = await models.mexpay_transactions
        .findOneAndUpdate(
          {
            inv_ref_full: _req.body.data.billPaymentRef1,
          },
          {
            is_success: true,
            is_enabled: true,
            updated_at: new Date().toISOString(),
          }
        )
        .exec();

      payment_response = {
        success: true,
        invoice_no: row.verse_invoice_no,
        data: row, // data.inv_ref คือเอาไว้ ref
      };
    } else {
      let row = await models.mexpay_transactions
        .findOneAndUpdate(
          {
            inv_ref_full: _req.body.data.billPaymentRef1,
          },
          {
            is_success: false,
            is_enabled: false,
            updated_at: new Date().toISOString(),
          }
        )
        .exec();

      payment_response = {
        success: false,
        invoice_no: row.verse_invoice_no,
        data: row, // data.inv_ref คือเอาไว้ ref
      };
    }

    console.log(" === payment_response ", payment_response);
    handleSseClientResponse(_req, payment_response, "payment-qr-response");

    // PAYMENT CALLBACK
    let callback_url = payment_response.data.callback_endpoint
      ? payment_response.data.callback_endpoint
      : systemUrl;
    const resPaymentCallback = await fetch(
      `${callback_url}/api/payment/callback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment_response),
      }
    );
    const resPaymentCallbackJson = await resPaymentCallback.json();
    console.log(" === resPaymentCallbackJson ", resPaymentCallbackJson);

    response = {
      success: true,
      result: payment_response,
    };
  } catch (error) {
    console.log(" === verse_credit_callback ERROR ", error);
    response = {
      success: false,
      error: "Something Wrong",
    };
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
    description,
    callback_endpoint,
  } = _req.body;

  let response;

  try {
    console.log(" === genLinkCreditPayment ");

    let data = {
      system_name: systemName,
      verse_uid: verse_uid,
      verse_user_uid: verse_user_uid,
      verse_invoice_no: verse_invoice_no,
      is_enabled: false,
      callback_endpoint: callback_endpoint,
      created_at: new Date().toISOString(),
    };
    console.log(" === data ", data);
    const res = await new models.mexpay_transactions(data).save();
    console.log(" === res ", res);
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
      const resMultiPay = await callMultiPay(
        `/genLinkCreditPayment_2C2P`,
        multipayData
      );
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
          msg: resMultiPay.msg,
        };
      }
    } else {
      response = {
        success: false,
        error: "Save Transaction Failed",
      };
    }
  } catch (error) {
    console.log(" === genLinkCreditPayment ERROR ", error);
    response = {
      success: false,
      error: "Something Wrong",
    };
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
    description,
    callback_endpoint,
  } = _req.body;

  let response;

  try {
    console.log(" _req.body ", _req.body);

    let data = {
      system_name: systemName,
      verse_uid: verse_uid,
      verse_user_uid: verse_user_uid,
      verse_invoice_no: verse_invoice_no,
      is_enabled: false,
      callback_endpoint: callback_endpoint,
      expiry_date: formatDate(
        new Date().setMinutes(new Date().getMinutes() + 5)
      ),
      created_at: new Date().toISOString(),
    };
    console.log(" === data ", data);
    const res = await new models.mexpay_transactions(data).save();
    console.log(" === res ", res);
    if (res) {
      let multipayData = {
        tel: "0811234567",
        amt: amount,
        system_name: systemName,
        inv_ref: res.inv_ref, // สร้างตอน Save
        name: "Mex Verse",
        email: "mex@gmail.com",
        expiryDate: data.expiry_date,
        sub_inv_ref_list: [
          {
            shop_tel: shopTel,
            sub_inv_ref: "A",
            amt: amount,
            system_name: systemName,
          },
        ],
      };
      console.log(" === multipayData ", multipayData);
      const resMultiPay = await callMultiPay(
        `/SCBPayment_GenQR_WithOptional`,
        multipayData
      );
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
          msg: resMultiPay.msg,
        };
      }
    } else {
      response = {
        success: false,
        error: "Save Transaction Failed",
      };
    }
  } catch (error) {
    console.log(" === genLinkCreditPayment ERROR ", error);
    response = {
      success: false,
      error: "Something Wrong",
    };
  } finally {
    _res.json(response);
  }
});

route.post("/getTransactionByInv", async function (_req, _res) {
  let { inv_ref } = _req.body;

  let response;

  try {
    let resTransaction = await models.mexpay_transactions.findOne(
      { inv_ref_full: inv_ref },
      {},
      {}
    );
    if (resTransaction) {
      response = {
        success: true,
        result: resTransaction,
      };
    } else {
      response = {
        success: false,
        error: "Cannot find invoice",
      };
    }
  } catch (error) {
    response = {
      success: false,
      error: "Something Wrong",
    };
  } finally {
    _res.json(response);
  }
});

route.post("/getTransactionByVerseInv", async function (_req, _res) {
  let { verse_uid, verse_invoice_no } = _req.body;

  let response;

  try {
    let resTransaction = await models.mexpay_transactions.findOne(
      {
        verse_uid: verse_uid,
        verse_invoice_no: verse_invoice_no,
      },
      {},
      {}
    );
    if (resTransaction) {
      response = {
        success: true,
        result: resTransaction,
      };
    } else {
      response = {
        success: false,
        error: "Cannot find invoice",
      };
    }
  } catch (error) {
    response = {
      success: false,
      error: "Something Wrong",
    };
  } finally {
    _res.json(response);
  }
});

module.exports = route;
