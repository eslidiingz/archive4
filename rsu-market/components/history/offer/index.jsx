import { Table } from "react-bootstrap";
import Offer from "./OfferList";

const OfferList = () => {
  return (
    <>
      <div className="layout-des-detailpage">
        <p className="text-tittle-des">
          <i className="fas fa-list-ul mx-2"></i> Offer
        </p>
      </div>
      <div className="layout-des_sub-detailpage">
        <div className="col-12 exp-table">
          <Table borderless responsive hover>
            <thead>
              <tr className="bd-bottom">
                <th className="py-3">
                  <p className="mb-0">Price</p>
                </th>
                <th className="py-3">
                  <p className="mb-0">USD Price</p>
                </th>
                <th className="py-3">
                  <p className="mb-0">Floor Difference</p>
                </th>
                <th className="py-3">
                  <p className="mb-0">Expirtion</p>
                </th>
                <th className="py-3">
                  <p className="mb-0">From</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <Offer />
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default OfferList;
