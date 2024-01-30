import React, { useEffect, useState } from "react";
import UserTableList from "/components/Users/UserTableList";
import { approveUserVerify, getUsers } from "../../models/User";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import AdminLayout from "/components/Layouts/Admin/AdminLayout";
import PartnersTableList from "../../components/Partners/PartnersTableList";
import { getPartners, GET_ALL_PARTNERS } from "../../models/Partner";
import Link from "next/link";
import PartnerTableApprove from "../../components/Partners/PartnerTableApprove";


function UserPage() {
  const [handleFetchAllPartners] = useLazyQuery(GET_ALL_PARTNERS, {fetchPolicy: 'network-only'});

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [partners, setPartners] = useState([]);

  const initialize = async () => {
    try{
      setIsPageLoading(true);
      await fetchPartners();
    }finally{
      setIsPageLoading(false);
    }
  };

  const fetchPartners = async () => {
    const responsePartner = await handleFetchAllPartners({variables:{isApproved: false}});
    setPartners(responsePartner.data.partners);
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      <AdminLayout pageTitle="Partners">
        <div className="text-right">
          <Link href="/partners/AddPartner">
              <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-add">Add Partners</button>
          </Link>
        </div>
        <section>
          <PartnerTableApprove
            title={<TableTitle heading="Waiting for approve to verify" />}
            data={partners.filter((u) => !u.is_approve)}
            onPartnersUpdated={fetchPartners}
            loading={isPageLoading}
          />
        </section>

        <hr className="my-8" />

        <section>
          <h3></h3>
          <PartnersTableList
            title={<TableTitle heading="Partners verified" />}
            data={partners.filter((u) => u.is_approve)}
          />
        </section>
      </AdminLayout>
    </>
  );
}

export default UserPage;

function TableTitle(props) {
  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          {props.heading && (
            <h1 className="text-xl font-semibold text-gray-700">
              {props.heading}
            </h1>
          )}
          {props.description && (
            <p className="mt-2 text-sm text-gray-700">{props.description}</p>
          )}
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {props.action && props.action}
        </div>
      </div>
    </>
  );
}
