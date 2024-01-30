import React, { useState } from 'react';
import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Clinic(props) {

    const options = [
        { value: 'zone1', label: 'zone1' },
        { value: 'zone2', label: 'zone2' },
        { value: 'zone3', label: 'zone3' }
      ]
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
                        <Modal.Title>Add Zone</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row project_modal">
                            <div className="col-12 mb-3">
                                <label for="NameProject" className="topic-modal_project">UserID</label>
                                <input type="text" className="form-control" name="NameUser" value="2" disabled />
                            </div>
                            <div className="col-lg-6">
                                <label for="Project" className="topic-modal_project">Clinic Name</label>
                                <input type="text" className="form-control" name="Project" />
                            </div>
                            <div className="col-lg-6">
                                <label for="Zone" className="topic-modal_project">Zone</label>
                                <Select
                                        isMulti
                                        options={options}
                                        name="colors"
                                        className="basic-multi-selec form-controlt"
                                        classNamePrefix="select"
                                    />
                            </div>
                            <div className="col-lg-6">
                                <label for="openPreSellDate" className="topic-modal_project">Tel</label>
                                <input type="text" className="form-control" name="Tel" />
                            </div>
                            <div className="col-lg-6">
                                <label for="StartPlanting" className="topic-modal_project">Project Name</label>
                                <input type="text" className="form-control" name="NameProject" />
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
export default Clinic
