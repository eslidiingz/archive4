import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ModalClinic from "../modal/ModalClinic";


function TablesUser(props) {
    const [showClinicModal, setShowClinicModal] = useState(false);
    const handleOpenClinicModal = () => {
        setShowClinicModal(true);
    };

    const handleCloseClinicModal = () => {
        setShowClinicModal(false);
    };
    return (
        <>
            <table className="table table-bordered table-striped roundedTable" cellspacing="0" border="0" cellpadding="0">
                <thead>
                    <tr>
                        <th>UserID</th>
                        <th>Clinic Name</th>
                        <th className="text-center">Tel</th>
                        <th className="text-center">Project  Name</th>
                        <th className="text-center">Zone</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p className="text-top">1</p>
                        </td>
                        <td>
                            <p className="text-top">Test X</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top">062-545-5956</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top">Pre-Sell Project</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top">Z1</p>
                        </td>
                        <td className="text-center">
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <Button className="btn-edit_project"  onClick={handleOpenClinicModal}>
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
            <ModalClinic
                                show={showClinicModal}
                                onClose={handleCloseClinicModal}
                            />
        </>
    )
}
export default TablesUser
