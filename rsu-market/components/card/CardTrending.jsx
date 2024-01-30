import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";

function CardTrending({ nftAddress, tokenId, price }) {
  const [isActive, setActive] = useState(false);
  const [metadata, setMetadata] = useState(null);

  const callMetadata = useCallback(async () => {
    const fetchMetadata = async () => {
      // if (!tokenId) return;
      const response = await fetch(
        `/api/metadata?token_id=${BigNumber.from(tokenId).toString()}`
      );
      const metadata = await response.json();
      console.log(metadata);

      setMetadata(metadata);
    };

    await fetchMetadata();
  }, []);

  useEffect(() => {
    callMetadata();
  }, [callMetadata]);

  return (
    <>
      <Link href={`/detail/${nftAddress}/${tokenId}`}>
        <div className="card text-white ">
          <div className="w-full">
            <div className="position-relative">
              <a className="cursor-pointer">
                <img
                  className="card-img-top img-card"
                  style={{ maxHeight: "280px" }}
                  src={
                    metadata?.image || "/assets/rsu-image/music/music-demo.png"
                  }
                  alt="Card image"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src =
                      "/assets/rsu-image/music/music-demo.png";
                  }}
                />
              </a>

              <div className="absolute-img-play">
                <a className="w-full cursor-pointer">
                  <img
                    className="card-img-top img-card"
                    src="/assets/rsu-image/icons/play.svg"
                    alt="Card image"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="w-full">
            <p className="text05 mt-2">{metadata?.name || "empty name"}</p>
            {price ? (
              <>
                <p className="text05 mt-2" align="right">
                  Price
                </p>

                <div className="row">
                  <div className="col-12 mt-2">
                    <div className="d-flex gap-2 align-items-center justify-content-end pt-1">
                      <img
                        alt=""
                        width={13}
                        src="/assets/rsu-image/icons/diamond.svg"
                      />
                      <p className="text15" align="right">
                        {formatEther(price)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </Link>
    </>
  );
}
export default CardTrending;
