import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Project(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="modal_project">
                <Modal
                    show={props.show}
                    onHide={props.onClose}
                    size="lg"
                    className="layout_modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row project_modal">
                            <div className="col-12 mb-3">
                                <label for="NameProject" className="topic-modal_project">Name Project</label>
                                <input type="text" className="form-control" name="NameProject"/>
                                <label for="DetailProject" className="topic-modal_project">Detail Project</label>
                                <textarea className="form-control project_detail-input" aria-label="With textarea" name="DetailProject" ></textarea>
                            </div>
                            <div className="col-lg-6">
                                <label for="Project" className="topic-modal_project">Project</label>
                                <input type="text" className="form-control" name="Project" />
                            </div>
                            <div className="col-lg-6">
                                <label for="Zone" className="topic-modal_project">Zone</label>
                                <input type="text" className="form-control" name="Zone" />
                            </div>
                            <div className="col-lg-6">
                                <label for="openPreSellDate" className="topic-modal_project">Open Pre-Sell</label>
                                <input type="date" className="form-control" name="openPreSellDate"/>
                            </div>
                            <div className="col-lg-6">
                                <label for="StartPlanting" className="topic-modal_project">Start planting</label>
                                <input type="date" className="form-control" name="StartPlanting" />
                            </div>
                            <div className="col-lg-6">
                                <label for="PalntingTime" className="topic-modal_project">Palnting Time</label>
                                <input type="text" className="form-control" name="PalntingTime" />
                            </div>
                            <div className="col-lg-6">
                                <label for="Price" className="topic-modal_project">Price</label>
                                <input type="text" className="form-control" name="Price" />
                            </div>
                            <div className="col-lg-6">
                                <label for="DateUse" className="topic-modal_project">Date to use</label>
                                <input type="date" className="form-control" name="DateUse" />
                            </div>
                            <div className="col-lg-6">
                                <label for="AmountLife" className="topic-modal_project">Amount Left</label>
                                <input type="text" className="form-control" name="AmountLife" />
                            </div>
                            <div className="d-flex justify-content-center my-4">
                                <Button onClick={props.onClose} className="btn-close_project">
                                    <p className="text-btn_modal-c">Cancel</p>
                                </Button>
                                <Button className="btn-confirm_project">
                                    <p>ยืนยัน</p>
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>

                </Modal>
            </div>
        </>
    );
}
export default Project
