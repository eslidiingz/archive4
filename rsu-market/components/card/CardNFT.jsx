import Link from "next/link";
import { Badge } from "react-bootstrap";

const CardNFT = (props) => {
  return (
    <>
      <div className="card text-white">
        <div className="set-img-frame">
          <img
            className="card-img-top img-card w-100 h-100 fit-cover"
            src={props.img || ""}
          />
        </div>
        <div className="w-full">
          <div className="d-flex justify-content-between">
            <div className="collectionName">
              <Link href={props.link || "#"}>
                <h4>{props.name}</h4>
                {/* <a>{props.collectionName}</a> */}
              </Link>
            </div>
          </div>

          <p className="text05 mt-2">{props.description}</p>
          <p className="text05 mt-2" align="right">
            {props.price}
          </p>
          <p className="text13" align="right">
            {props.time}
          </p>
          {props.tags && (
            <div className="tags">
              {props.tags.map((tag, index) => {
                return (
                  <>
                    <Badge className="me-1" bg="secondary" key={index}>
                      {tag.text}
                    </Badge>
                  </>
                );
              })}
            </div>
          )}

          {props.icon == true && (
            <>
              <div className="row">
                <div className="col-6 mt-2">
                  <i className="fas fa-heart layout04">
                    <p className="text14" align="left">
                      &nbsp;{props.iconheart}
                    </p>
                    &nbsp;&nbsp;<i className="fas fa-eye"></i>
                  </i>
                </div>
                <div className="col-6 mt-2">
                  <p className="text15" align="right">
                    <img src="assets/rsu-image/icons/diamond.svg" />
                    &nbsp;&nbsp;{props.diamond}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default CardNFT;
