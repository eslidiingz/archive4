import LatestBidList from "./LatestBidList";

const LatestBid = () => {
  return (
    <>
      <p className="text-detail_ex mt-4">Latest Bids</p>
      <div className="row layout-profile-lates_ex">
        <LatestBidList />
      </div>
    </>
  );
};

export default LatestBid;
