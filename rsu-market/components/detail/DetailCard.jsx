import { BigNumber } from "ethers";
import { GetShortAddress } from "../../utils/ethers/connect-metamask";

const DetailCard = ({ order, feeRate }) => {
  return (
    <>
      <div className="layout_main-acc">
        <p className="text-tittle-des">
          <i className="fas fa-list-alt mx-2"></i>Detail
        </p>
      </div>

      <div className="layout-des_table-detailpage pb-lg-3">
        <table>
          <tbody>
            <tr>
              <td style={{ width: "100%" }}>
                <p className="text-detail-acc">Contract Address</p>
              </td>
              <td>
                <p className="text-detail-acc_link" align="right">
                  {order?.data?.nftContract
                    ? GetShortAddress(order?.data?.nftContract)
                    : ""}
                </p>
              </td>
            </tr>
            <tr>
              <td style={{ width: "100%" }}>
                <p className="text-detail-acc">Token ID</p>
              </td>
              <td>
                <p className="text-detail-acc_link" align="right">
                  {order?.data?.tokenId
                    ? BigNumber.from(order?.data?.tokenId).toNumber()
                    : null}
                </p>
              </td>
            </tr>
            <tr>
              <td style={{ width: "100%" }}>
                <p className="text-detail-acc">Token Standard</p>
              </td>
              <td>
                <p className="text-detail-acc" align="right">
                  ERC-721
                </p>
              </td>
            </tr>
            <tr>
              <td style={{ width: "100%" }}>
                <p className="text-detail-acc">Chain</p>
              </td>
              <td>
                <p className="text-detail-acc" align="right">
                  BSC
                </p>
              </td>
            </tr>
            <tr>
              <td style={{ width: "100%" }}>
                <p className="text-detail-acc">Creator Fees</p>
              </td>
              <td>
                <p className="text-detail-acc" align="right">
                  {feeRate}%
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DetailCard;
