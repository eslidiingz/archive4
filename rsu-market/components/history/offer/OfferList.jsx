import Link from "next/link";

const Offer = () => {
  return (
    <tr>
      <td className="pt-4 pb-3">
        <div className="d-flex align-items-start gap-2 ">
          <img width={10} alt="" src="/assets/rsu-image/icons/coin.svg" />
          <div>
            <p className="mb-0">500</p>
          </div>
        </div>
      </td>

      <td className="pt-4 pb-3">
        <div className=" d-flex gap-2 align-items-start ">
          <p className="mb-0">$ 25,000.77</p>
        </div>
      </td>
      <td className="pt-4 pb-3">
        <p className="mb-0">42% below</p>
      </td>
      <td className="pt-4 pb-3">
        <p className="mb-0">about 10 hours</p>
      </td>
      <td className="pt-4 pb-3">
        <Link href={""}>
          <div className=" d-flex gap-2 align-items-start ">
            <p className="mb-0 ci-purple textprofile-table textprofile-des_link">
              Xeroca
            </p>
          </div>
        </Link>
      </td>
    </tr>
  );
};

export default Offer;
