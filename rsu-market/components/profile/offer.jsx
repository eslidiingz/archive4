
import { id } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Table, Tabs, Tab} from "react-bootstrap";
import Accept from "../../components/modal/Accept";
import Config from "../../configs/config";
import { useWalletContext } from "../../context/wallet";
import { getLogsEvent } from "../../utils/logs/getLogs";
import { shortWallet } from "../../utils/misc";
import { smartContact } from "../../utils/providers/connector";



function SetOffer(props) {
    const [showAcceptModal, setAcceptModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { wallet } = useWalletContext();
    const [offersReceived, setOffersReceived] = useState([]);
    const handleCloseAcceptModal = () => {
        setAcceptModal(false);
    };
    const fetchingOfferReceived = async () => {
        const marketplaceContract = smartContact(Config.MARKETPLACE_CA, Config.MARKETPLACE_ABI, true);
        const topics = [
            id(`CreateOfferEvent(address,address,address,uint256,uint256,uint256,bool)`)
            // id(`CancelOfferEvent ( address, address, address, uint256, uint256, uint256, uint256, bool )`),
            // id(`AcceptOfferEvent ( address, address, uint256, address, uint256, uint256, uint256, bool, bool, bool )`)
          ];
        const offerList = await getLogsEvent(marketplaceContract, Config.MARKETPLACE_CA, Config.MARKETPLACE_BLOCK_START, topics);
        let offerData = offerList.map((item) => item.args);
        console.log(offerData);
        setOffersReceived(offerData)

        // let offers = await marketplaceContract.offers(wallet, 0);
    }
    const initialize = async () => {
        setIsLoading(true);
        console.log("Fetching offers ...")
        await fetchingOfferReceived();
        setIsLoading(false);
    }
    useEffect(() => {
        if(props.page === "offer") initialize();
    }, [props.page])

    return (
      <>
                <Row className="exp-tab px-3">
                    <Tabs defaultActiveKey="Offer Received" id="main-tab" className="mb-3 px-0">
                        <Tab eventKey="Offer Received" title="Offer Received" >
                            <Col md={12} className="exp-table px-0">
                                <div className="table-responsive">
                                    <Table borderless responsive hover >
                                        <thead>
                                            <tr className="bd-bottom text-white" >
                                                <th className="py-3 ps-3 " ><p className="mb-0 text-white" >Item</p></th>
                                                <th className="py-3" ><p className="mb-0 text-white" >Unit Price</p></th>
                                                {/* <th className="py-3" ><p className="mb-0 text-white" >USD Unit Price</p></th> */}
                                                {/* <th className="py-3" ><p className="mb-0 text-white" >Floor Difference</p></th> */}
                                                <th className="py-3" ><p className="mb-0 text-white" >From</p></th>
                                                {/* <th className="py-3" ><p className="mb-0 text-white" >Expiration</p></th> */}
                                                {/* <th className="py-3" ><p className="mb-0 text-white" >Received</p></th> */}
                                                <th className="py-3" ><p className="mb-0 text-white" >Actions</p></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {offersReceived.length == 0 && (
                                                 <tr>
                                                    <td colSpan={4} style={{textAlign: "center"}}><i>No data</i></td>
                                                </tr>
                                            )}
                                            {offersReceived.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="pt-4 pb-3 ps-3"><p className="mb-0 text-white">{shortWallet(item.nftContrat)}</p></td>
                                                        <td className="pt-4 pb-3">
                                                            <p className="mb-0 text-white">10 (BUSD)</p>
                                                        </td>
                                                        {/* <td className="pt-4 pb-3">
                                                            <p className="mb-0 text-white">text</p>
                                                        </td>
                                                        <td className="pt-4 pb-3"><p className="mb-0 text-white">text</p></td> */}
                                                        <td className="pt-4 pb-3">
                                                            <p className="mb-0 text-white">From</p>
                                                        </td>
                                                        {/* <td className="pt-4 pb-3">
                                                            <p className="mb-0 text-white">text</p>
                                                        </td>
                                                        <td className="pt-4 pb-3">
                                                            <p className="mb-0 text-white">text</p>
                                                        </td> */}
                                                        <td className="pt-4 pb-3">
                                                            <button className="btn btn03 btn-hover color-1 w-100" type="btn"onClick={() => setAcceptModal(true)} >Accept</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Tab>
                        <Tab eventKey="Offer Made" title="Offer Made">
                        <Col md={12} className="exp-table px-0">
                                <div className="table-responsive">
                                    <Table borderless responsive hover >
                                        <thead>
                                        <tr className="bd-bottom text-white" >
                                            <th className="py-3 ps-3 " ><p className="mb-0 text-white" >Item</p></th>
                                            <th className="py-3" ><p className="mb-0 text-white" >Unit Price</p></th>
                                            <th className="py-3" ><p className="mb-0 text-white" >USD Unit Price</p></th>
                                            <th className="py-3" ><p className="mb-0 text-white" >Floor Difference</p></th>
                                            <th className="py-3" ><p className="mb-0 text-white" >From</p></th>
                                            <th className="py-3" ><p className="mb-0 text-white" >Expiration</p></th>
                                            <th className="py-3" ><p className="mb-0 text-white" >Received</p></th>
                                            <th className="py-3" ><p className="mb-0 text-white" >Actions</p></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="pt-4 pb-3 ps-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                                <button className="btn btn-danger w-100" type="btn">Cancle</button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Tab>
                    </Tabs>
                </Row>
                <Accept
                    onClose={handleCloseAcceptModal}
                    show={showAcceptModal}
                />


      </>
    )
  }
  export default SetOffer
  