/** @format */

import { gql } from "@apollo/client";
import { gqlMutation, gqlQuery } from "./GraphQL";
// import { objectForParams } from "../utils/misc";

export const gqlPartnerVoucherReturning = `
  id
  contact_address
  created_at
  detail
  discount_price
  is_active
  name
  note
  partner_id
  project_id
  updated_at
  voucher_slug
  zone_id
  expiration_date
  project {
    project_name
    start_sale_time
    end_sale_time
    end_holding_time
    clinic_reward_rate
    zone_reward_rate
    zone_name
    zone_max
    land_price
  }
`;

export const getPartnerVouchers = async (_where) => {
	let query = `
    partner_vouchers ${_where ? `(where: ${_where})` : ""}
    {${gqlPartnerVoucherReturning}}
  `;

	return await gqlQuery(query);
};

export const GET_PARTER_VOUCHER_BY_PROJECT_ZONE_PARTER = gql`
	query GetPartnerVoucherByProjectZonePartner($projectId: Int!, $zoneId: Int!, $partnerId: Int!) {
		partner_vouchers(where: {project_id: {_eq: $projectId}, zone_id: {_eq: $zoneId}, partner_id: {_eq: $partnerId}}, limit: 1) {
			voucher_slug
      expiration_date
		}
	}
`;

export const INSERT_PARTNER_VOUCHER = gql`
	mutation InsertPartnerVoucher($object: partner_vouchers_insert_input!) {
		insert_partner_vouchers_one(object: $object) {
			voucher_slug
			created_at
		}
	}
`;

export const UPDATE_PARTNER_VOUCHER = gql`
	mutation UpdatePartnerVoucher($voucherId: Int!, $expirationDate: timestamptz, $updatedAt: timestamptz) {
		update_partner_vouchers_by_pk(
      pk_columns: {id: $voucherId}
      _set: { expiration_date: $expirationDate, updated_at: $updatedAt }
      ) {
    expiration_date
  }
	}
`;
