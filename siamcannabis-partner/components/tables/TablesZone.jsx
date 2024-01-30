import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ModalZone from "../modal/ModalZone";


function TablesZone(props) {
    const [showZoneModal, setShowZoneModal] = useState(false);
    const handleOpenZoneModal = () => {
        setShowZoneModal(true);
    };

    const handleCloseZoneModal = () => {
        setShowZoneModal(false);
    };
    return (
        <>
            <table className="table table-bordered table-striped roundedTable" cellspacing="0" border="0" cellpadding="0">
                <thead>
                    <tr>
                        <th>Zone</th>
                        <th>Name Project</th>
                        <th className="text-center">Detail Project</th>
                        <th className="text-center">Open Pre-Sell</th>
                        <th className="text-center">Start planting</th>
                        <th className="text-center">Palnting Time</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Date to use</th>
                        <th className="text-center">Amount Left</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td>
                            <p className="text-top">Z1,Z2</p>
                        </td>
                        <td>
                            <p className="text-top">Pre-Sell Project</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top"> 1st Pre-Sell ...</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top"> 1 Jul - 31 Aug 2022</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top"> 1 Sep 2022</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top"> + 180 Days</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top"> 300 USDC</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top">28 Feb 2023</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top">980</p>
                        </td>
                        <td className="text-center">
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <Button className="btn-edit_project" onClick={handleOpenZoneModal}>
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
                            <p className="text-top">Z1,Z2</p>
                        </td>
                        <td>
                            <p className="text-top">Pre-Sell Project</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top"> 1st Pre-Sell ...</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top"> 1 Jul - 31 Aug 2022</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top"> 1 Sep 2022</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top"> + 180 Days</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top"> 300 USDC</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top">28 Feb 2023</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top">980</p>
                        </td>
                        <td className="text-center">
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <Button className="btn-edit_project" onClick={handleOpenZoneModal}>
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
            <ModalZone
                show={showZoneModal}
                onClose={handleCloseZoneModal}
            />
        </>
    )
}
export default TablesZone
