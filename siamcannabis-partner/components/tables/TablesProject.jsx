import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Project from "../modal/Project";


function TablesProjectc(props) {
    const [showProjectModal, setShowProjectModal] = useState(false);

    const handleOpenProjectModal = () => {
        setShowProjectModal(true);
    };

    const handleCloseProjectModal = () => {
        setShowProjectModal(false);
    }
    return (
        <>
            <table className="table table-bordered table-striped roundedTable" cellspacing="0" border="0" cellpadding="0">
                <thead>
                    <tr>
                        <th>Name Project</th>
                        <th>Detail Project</th>
                        <th className="text-center">Zone</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p className="text-top">Pre-Sell Project</p>
                        </td>
                        <td>
                            <p className="text-top">1st Pre-Sell Project will open for sale in 2 zones, Starting to plant cannabis together on 1 Sep....</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top">Z1,Z2</p>
                        </td>
                        <td className="text-center">
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <Button className="btn-edit_project" onClick={handleOpenProjectModal}>
                                    <i className="fas fa-pencil"></i>
                                </Button>
                                <Button className="btn-trash_project">
                                    <i className="fas fa-trash-alt"></i>
                                </Button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="text-top">Pre-Sell Project</p>
                        </td>
                        <td>
                            <p className="text-top">1st Pre-Sell Project will open for sale in 2 zones, Starting to plant cannabis together on 1 Sep....</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top">Z1,Z2</p>
                        </td>
                        <td className="text-center">
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <Button className="btn-edit_project" onClick={handleOpenProjectModal}>
                                    <i className="fas fa-pencil"></i>
                                </Button>
                                <Button className="btn-trash_project">
                                    <i className="fas fa-trash-alt"></i>
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Project
                show={showProjectModal}
                onClose={handleCloseProjectModal}
            />
        </>
    )
}
export default TablesProjectc
