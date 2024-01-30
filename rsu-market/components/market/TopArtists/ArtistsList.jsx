const ArtistsList = ({ index }) => {
  return (
    <div className="col-12 col-sm-6 col-lg-3 my-2">
      <div className="d-flex gap-3">
        <div className="d-flex gap-2 align-items-center ">
          <p className="text09" align="center">
            {index}
          </p>
          <img src="assets/rsu-image/user/Ellipse_3-1.svg" width={45} alt="" />
        </div>
        <div className="col">
          <p className="text09 twoline-dot">Lorem Ipsum</p>
          <div className="text09-2">
            <img src="assets/rsu-image/icons/diamond.svg" />
            <span className="text10">$ 522,456</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistsList;
