
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Table, Tabs, Tab} from "react-bootstrap";
import Accept from "../../components/modal/Accept";

function Setbiding(props) {
    const [showAcceptModal, setAcceptModal] = useState(false);
    const [biddingList, setBiddingList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleCloseAcceptModal = () => {
        setAcceptModal(false);
    };
    const fetchingBiddingList = async () => {
        let mockData = [
            {
                nftContract: "0x2...9a",
                price: "10 BUSD",
                from: "0x4E...02",
                expiration: "5 days ago"
            }
        ]
        setBiddingList(mockData);
    }
    const initialize = async () => {
        setIsLoading(true);
        console.log("Fetching bidding ... ");
        await fetchingBiddingList();
        setIsLoading(false);
    }
    useEffect(() => {
        if(props.page === "biding") initialize();
    }, [props.page])

    return (
        <>
                <Row className="exp-tab px-3">
                    <Tabs defaultActiveKey="Biding list" id="main-tab" className="mb-3 px-0">
                        <Tab eventKey="Biding list" title="Bidding list" >
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
                                            <th className="py-3" ><p className="mb-0 text-white" >Expiration</p></th>
                                            {/* <th className="py-3" ><p className="mb-0 text-white" >Received</p></th> */}
                                            <th className="py-3" ><p className="mb-0 text-white" >Actions</p></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            biddingList.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="pt-4 pb-3 ps-3"><p className="mb-0 text-white">{item.nftContract}</p></td>
                                                        <td className="pt-4 pb-3">
                                                        <p className="mb-0 text-white">{item.price}</p>
                                                        </td>
                                                        {/* <td className="pt-4 pb-3">
                                                        <p className="mb-0 text-white">text</p>
                                                        </td> */}
                                                        {/* <td className="pt-4 pb-3"><p className="mb-0 text-white">text</p></td> */}
                                                        <td className="pt-4 pb-3">
                                                        <p className="mb-0 text-white">{item.from}</p>
                                                        </td>
                                                        <td className="pt-4 pb-3">
                                                        <p className="mb-0 text-white">{item.expiration}</p>
                                                        </td>
                                                        {/* <td className="pt-4 pb-3">
                                                        <p className="mb-0 text-white">text</p>
                                                        </td> */}
                                                        <td className="pt-4 pb-3">
                                                            <button className="btn btn03 btn-hover color-1 w-100" type="btn" onClick={() => setAcceptModal(true)}>Accept</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
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
  export default Setbiding
  