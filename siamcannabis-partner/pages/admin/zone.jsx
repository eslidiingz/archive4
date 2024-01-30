import { useState } from "react";
import React from "react";
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import Spinner from "../../components/Spinner";
import Mainlayout from "../../components/layouts/Mainlayout";
import Search from "../../components/form/Search";
import ModalZone from "../../components/modal/ModalZone";
import TablesZone from "../../components/tables/TablesZone";
import Pagination from 'react-bootstrap/Pagination';

const AdminZone = () => {
   

    // const [loading, setLoading] = useState(false);
    let active = 1;
    let items = [];
    for (let number = 1; number <= 3; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }
    const [showZoneModal, setShowZoneModal] = useState(false);
    const handleOpenZoneModal = () => {
        setShowZoneModal(true);
    };

    const handleCloseZoneModal = () => {
        setShowZoneModal(false);
    };

    return (
        <>
            <section>
                <div className="container fix-container">
                    <div className="row">
                        <div className="col-md-5 col-12 mb-3 redeem">
                            <div className="row layout_redeem">
                                <div className="col-9">
                                    <Search
                                        placeholder="Search Coupon ID or Wallet Address.."
                                    />
                                </div>
                                <div className="col-3">
                                    <Button>
                                        <p className="w-100">Search</p>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 col-12 d-flex align-items-center justify-content-end ">
                            <div className="modal_project">
                                <Button onClick={handleOpenZoneModal}>
                                    <p>Add Zone</p>
                                </Button>
                            </div>
                            <ModalZone
                                show={showZoneModal}
                                onClose={handleCloseZoneModal}
                            />
                        </div>
                        <div className="col-12 mt-3">
                            <div className="bg_tables">
                                <div className="overflow">
                                    <TablesZone />
                                </div>
                                <div className="d-flex justify-content-center mt-4">
                                    <Pagination><Pagination.First className="set-next" />{items}<Pagination.Last className="set-next" /></Pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default AdminZone;
AdminZone.layout = Mainlayout;
