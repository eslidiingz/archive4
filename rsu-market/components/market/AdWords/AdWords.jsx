const AdWords = ({ icon, title, description }) => {
  return (
    <div className="col-lg-6 ">
      <div className="layout02 ps-4">
        <img src={icon} className="img02" />
        <p className="text12 twoline-dot mb-3">{title}</p>
        <p className="text09-2 twoline-dot2">{description}</p>
      </div>
    </div>
  );
};

export default AdWords;
