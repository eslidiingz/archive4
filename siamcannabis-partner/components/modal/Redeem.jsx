import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Redeem(props) {
    const [show, setShow] = useState(false);
    const [btnUseCoupon, setBtnUseCoupon] = useState(false);

    const onChangeBtn = (e) => {
        setBtnUseCoupon(!btnUseCoupon);
    };

    return (
        <>
            <div className="modal_redeem">
                <Modal show={props.show} onHide={props.onClose} size="lg" className="layout_modal" s>
                    <Modal.Header closeButton>
                        <Modal.Title>Redeem Coupon</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-lg-6 col-12 mb-3 d-flex justify-content-center">
                                <div className="row mb-3 bg_coupon">
                                    <div className="col-3">
                                    </div>
                                    <div className="col-9">
                                        <p className="text-main_coupon">- 15%</p>
                                        <div className="d-flex mx-3 mb-sm-2">
                                            <p className="text-detail_coupon w-50">Project 1</p>
                                            <p className="text-detail_coupon w-50 ms-3">Zone 1</p>
                                        </div>
                                        <div className="d-flex mx-3 mb-3">
                                            <p className="text-detail_coupon w-50">Code : <span>CC00001</span></p>
                                            <p className="text-detail_coupon w-50 ms-sm-3">Exp : xx/xx/xxxx</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <p className="text-topic_coupon">Coupon Code</p>
                                <label className="text-info_coupon">CC0001</label>
                                <p className="text-topic_coupon">Coupon Detail</p>
                                <p className="text_detail-coupon mb-4">Discount 15% for sample products.</p>
                                <Button onClick={props.onClose} className="btn_modal-c">
                                    <p className="text-btn_modal-c">Cancel</p>
                                </Button>
                                {btnUseCoupon ?

                                    <Button
                                        className="btn-use_redeemG"
                                        onClick={onChangeBtn}
                                    >
                                        <p>This Coupon already used</p>
                                    </Button>
                                    :
                                    <Button
                                        className="btn-use_redeem"
                                        onClick={onChangeBtn}
                                    >
                                        <p>Use this Coupon</p>
                                    </Button>
                                }

                                <p className="text-topic_coupon mt-3">Conditions</p>
                                <ul>
                                    <li className="text_detail-coupon">A discount can be restricted to one product, some products, or be used for all products.</li>
                                    <li className="text_detail-coupon">A discount can require a coupon code be entered during the order process (or passed in through the order process).</li>
                                    <li className="text_detail-coupon">A discount can also be restricted to a certain date range.</li>
                                    <li className="text_detail-coupon">A discount can be limited to only appear for certain link sources or certain order environments.</li>
                                    <li className="text_detail-coupon">For subscription products, a discount can be restricted to only the first period of the subscription (which might be used to offer someone a free or discounted trial of the product) or can be used for both the first and additional subscription periods.</li>
                                    <li className="text_detail-coupon">Limited Use Conditions include requiring a minimum order total, requiring a minimum number of products in the order, or limited a discount to only be valid once per email address.</li>
                                </ul>
                            </div>
                        </div>
                    </Modal.Body>

                </Modal>
            </div>
        </>
    );
}
export default Redeem
