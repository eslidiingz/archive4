import Link from "next/link";

const DescriptionCard = ({ creator, description }) => {
  return (
    <>
      <div className="layout-des-detailpage">
        <p className="text-tittle-des">
          <i className="fas fa-align-left mx-2"></i> Description
        </p>
      </div>
      <div className="layout-des_sub-detailpage">
        <div className="d-flex pb-lg-2 pt-lg-3">
          <p className="textprofile-des">Created by</p>
          <Link href={""}>
            <p className="textprofile-des_link">{creator}</p>
          </Link>
          <img
            className="i-purple"
            alt=""
            width={20}
            src="/assets/rsu-image/icons/verify-black.svg"
          />
        </div>
        <p className="text-deatile-des">{description}</p>
      </div>
    </>
  );
};

export default DescriptionCard;
