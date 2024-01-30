const LatestBidList = () => {
  return (
    <div className="col-sm-12 mb-2">
      <div className="row box layout-profile-lates02_ex">
        <div className="col-2 col-1s">
          <img src="/assets/rsu-image/user/Ellipse.svg" className="img01-1" />
        </div>
        <div className="col-3 col-3s">
          <p className="text_profile_ex">Papaya</p>
          <p className="text_profile_ex02">0.05 ETH</p>
        </div>
        <div className="col-6 col-3s" align="right">
          <p className="text_profile_ex" style={{ color: "transparent" }}>
            Owned by
          </p>
          <p className="text-detail03_ex">12 min ago</p>
        </div>
      </div>
    </div>
  );
};

export default LatestBidList;
