import React, { useEffect, useState } from "react";
import Mainlayout from "/components/layouts/Mainlayout";
import TableVoucher from "/components/tables/TableVoucher";
import { useSession } from "next-auth/react";
import { getPartnerVouchers } from "../../../models/PartnerVoucher";

function VoucherIndex() {
  const { data: session, status } = useSession();

  const [vouchers, setVouchers] = useState([]);

  const initialize = async () => {
    setVouchers(
      (await getPartnerVouchers(`{partner_id: {_eq: ${session?.user?.id}}}`))
        .data
    );

    let _v = {
      contact_address: "0x986DA31E5ccF30dd63C967ca237b16F5d4C05561",
      created_at: "2022-07-05T09:04:38.451595+00:00",
      detail: "This camplain is have discount 500 baht",
      discount_price: 500,
      id: 1,
      is_active: true,
      name: "Discount 500 baht",
      note: null,
      partner_id: 26,
      project_id: 0,
      updated_at: "2022-07-05T09:04:38.451595+00:00",
      voucher_slug: "GOPN",
      zone_id: 0,
    };
  };

  useEffect(() => {
    initialize();
  }, [session]);

  return (
    <Mainlayout>
      <div className="container">
        <div className="d-flex justify-content-between mb-4">
          <h3 className="text-white">Voucher list</h3>
          <div>
            <button className="btn btn-primary">Create Voucher</button>
          </div>
        </div>

        <TableVoucher vouchers={vouchers} />
      </div>
    </Mainlayout>
  );
}

export default VoucherIndex;
