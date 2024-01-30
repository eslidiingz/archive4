import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Config from "../../configs/config";
import { useWalletContext } from "../../context/wallet";
import useLoading from "../../hooks/useLoading";
import { allowanced, approveToken } from "../../models/Token";
import { GetShortAddress } from "../../utils/ethers/connect-metamask";
import { smartContact } from "../../utils/providers/connector";
import ButtonState from "../button/ButtonState";

function ConfirmCheckout({ title, data, order, fee }) {
  const { wallet } = useWalletContext();
  const { toggle, loading } = useLoading();
  const [allowance, setAllowance] = useState(null);
  const getAllowance = useCallback(async () => {
    const allowance = await allowanced(
      wallet,
      Config.MARKETPLACE_CA,
      order?.data?.tokenAddress,
      false
    );

    setAllowance(formatEther(allowance));
  }, []);

  const allowanceToken = async (index) => {
    toggle(index, true);

    try {
      const transaction = await approveToken(
        Config.MARKETPLACE_CA,
        order?.data?.tokenAddress,
        false
      );

      console.log(transaction);
      toggle(index, false);
    } catch (error) {
      toggle(index, false);
    }
  };

  const buyNFT = async (index) => {
    toggle(index, true);
    try {
      const contract = smartContact(
        Config.MARKETPLACE_CA,
        Config.MARKETPLACE_ABI,
        false,
        "buyNFT"
      );

      const orderId = BigNumber.from(order?.data?.orderId).toNumber();

      const transaction = await contract.buyOrder(orderId);
      const { blockHash } = await transaction.wait();

      if (blockHash) {
        toggle(index, false);
      }
    } catch (error) {
      toggle(index, false);
    }
  };

  useEffect(() => {
    getAllowance();
  }, [getAllowance]);

  return (
    <>
      <Modal.Header className="modal-headers" closeButton>
        <Modal.Title>
          <p align="center" className="text-makeanoff-h_ex">
            {title}
          </p>
        </Modal.Title>
      </Modal.Header>
      <hr className="hr-detailpage" />
      <Modal.Body>
        <div className="row">
          <div className="col-xl-12">
            <div className="layout-deatilpage-modal">
              <p className="text-deatilpage-modal">Item</p>
              <hr />
            </div>
            <div className="row layout-deatilpage-modal2">
              <div className="col-xl-2">
                <img src={data?.image} className="img-deatilpage-modal" />
              </div>
              <div className="col-xl-4 layout-modal_main">
                <div className="d-flex">
                  <h4 className="text-tittle-deatilpage-modal">
                    {data?.creator ? GetShortAddress(data?.creator) : null}
                  </h4>
                  <img
                    className="i-purple"
                    alt=""
                    width={20}
                    src="/assets/rsu-image/icons/verify-black.svg"
                  />
                </div>
                <p className="text-buy-deatilpage-modal">{data?.name}</p>
                <p className="text-buy-deatilpage-modal2">
                  Creator Fees: {fee}%
                </p>
              </div>
              <div className="col-xl-6 layout-token" align="right">
                <div className="d-flex layout-diamonds">
                  <img
                    src="/assets/rsu-image/icons/diamond.svg"
                    className="img-token"
                  />
                  <p className="layout-token-deatilpage">
                    {order?.data?.price
                      ? formatEther(order?.data?.price)
                      : null}
                  </p>
                </div>
                {/* <p className="layout-token-deatilpage text-token">$53,200.90</p> */}
              </div>
              <hr />
            </div>
          </div>
          <div className="col-xl-6 layout-deatilpage-modal2">
            <p className="text-deatilpage-modal">Total</p>
          </div>
          <div className="col-xl-6 layout-deatilpage-modal2" align="right">
            <div className="d-flex layout-diamonds">
              <img
                src="/assets/rsu-image/icons/diamond.svg"
                className="img-token"
              />
              <p className="layout-token-deatilpage2">
                {order?.data?.price ? formatEther(order?.data?.price) : null}
              </p>
            </div>
            {/* <p className="layout-token-deatilpage text-token">$53,200.90</p> */}
          </div>
          {/* <div className="col-xl-12 layout-deatilpage-modal2">
            <input type="checkbox" id="html" name="fav_language" value="HTML" />
            <label for="html" className="text-deatilpage-modal2">
              ข้อตกลงในการใช้งาน{" "}
              <Link href="">
                <u className="text-modal">อ่านข้อตกลง</u>
              </Link>
            </label>
          </div> */}
        </div>
      </Modal.Body>
      <Modal.Footer align="center" style={{ display: "block" }}>
        {console.log(loading)}
        {allowance > 0 ? (
          <ButtonState
            style={"btn-profile02_ex btn-deatilpage color-1 mb-4"}
            text={title}
            loading={loading.index === "buy" && loading.status === true}
            onFunction={() => buyNFT("buy")}
          />
        ) : (
          <ButtonState
            style={"btn-profile02_ex btn-deatilpage color-1 mb-4"}
            text={"Approve"}
            loading={loading.index === "approve" && loading.status === true}
            onFunction={() => allowanceToken("approve")}
          />
        )}
      </Modal.Footer>
    </>
  );
}
export default ConfirmCheckout;
