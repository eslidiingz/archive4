import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Redeem from "../modal/Redeem";

function TablesClinic(props) {
    const [showRedeemModal, setShowRedeemModal] = useState(false);

    const handleOpenRedeemModal = () => {
        setShowRedeemModal(true);
    };

    const handleCloseRedeemModal = () => {
        setShowRedeemModal(false);
    };

    return (
        <>
            <table className="table table-bordered table-striped roundedTable" cellspacing="0" border="0" cellpadding="0">
                <thead>
                    <tr>
                        <th>Coupon Code</th>
                        <th>Project / Zone</th>
                        <th>Wallet Address</th>
                        <th className="text-center">Genarate Date</th>
                        <th className="text-center">Expiration Date</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Redeem Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p className="text-top">CPID451a6d5649</p>
                        </td>
                        <td>
                            <p className="text-highlight_tables">1st Presale / Zone 1</p>
                        </td>
                        <td>
                            <p className="text-highlight_tables">0xe408...bc6c</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top">30 AUG 2022</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top">30 OCT 2022</p>
                        </td>
                        <td className="text-center btn_redeemTables">
                            <Button onClick={handleOpenRedeemModal}>
                                <p>Ready to Redeem</p>
                            </Button>
                        </td>
                        <td className="text-center">
                            <p className="text-top">-</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="text-top">CPID451a6d5649</p>
                        </td>
                        <td>
                            <p className="text-highlight_tables">1st Presale / Zone 1</p>
                        </td>
                        <td>
                            <p className="text-highlight_tables">0xe408...bc6c</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top">30 AUG 2022</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top">30 OCT 2022</p>
                        </td>
                        <td className="text-center">
                            <Button className="btn-redeem_gary" disabled>
                                <p>Redeemed</p>
                            </Button>
                        </td>
                        <td className="text-center">
                            <p className="text-top">30 OCT 2022</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="text-top">CPID451a6d5649</p>
                        </td>
                        <td>
                            <p className="text-highlight_tables">1st Presale / Zone 1</p>
                        </td>
                        <td>
                            <p className="text-highlight_tables">0xe408...bc6c</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top">30 AUG 2022</p>
                        </td>
                        <td className="text-center">
                            <p className="text-top">30 OCT 2022</p>
                        </td>
                        <td className="text-center">
                            <Button className="btn-redeem_Expire" disabled>
                                <p>Expire</p>
                            </Button>
                        </td>
                        <td className="text-center">
                            <p className="text-top">-</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Redeem
                show={showRedeemModal}
                onClose={handleCloseRedeemModal}
            />
        </>
    )
}
export default TablesClinic
