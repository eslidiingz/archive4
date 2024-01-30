import { useState } from "react";
import React from "react";
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import Spinner from "../../components/Spinner";
import Mainlayout from "../../components/layouts/Mainlayout";
import Search from "../../components/form/Search";
import Project from "../../components/modal/Project";
import TablesProjectc from "../../components/tables/TablesProject";
import Pagination from 'react-bootstrap/Pagination';

const AdminProject = () => {
    const [showProjectModal, setShowProjectModal] = useState(false);

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

    const handleOpenProjectModal = () => {
        setShowProjectModal(true);
    };

    const handleCloseProjectModal = () => {
        setShowProjectModal(false);
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
                                <Button onClick={handleOpenProjectModal}>
                                    <p>Add Project</p>
                                </Button>
                            </div>
                            <Project
                                show={showProjectModal}
                                onClose={handleCloseProjectModal}
                            />
                        </div>
                        <div className="col-12 mt-3">
                            <div className="bg_tables">
                                <div className="overflow">
                                    <TablesProjectc />
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

export default AdminProject;
AdminProject.layout = Mainlayout;