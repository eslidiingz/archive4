import { objectForParams } from "../utils/misc";
import { gqlMutation, gqlQuery } from "./GraphQL";

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
`;

export const registerPartner = async (_params) => {
  const mutation = `
    insert_partners_one(object: ${objectForParams(_params)}) {
      ${gqlPartnerVoucherReturning}
    }
  `;

  return await gqlMutation(mutation);
};

export const getPartnerVouchers = async (_where) => {
  let query = `
    partner_vouchers ${_where ? `(where: ${_where})` : ""}
    {${gqlPartnerVoucherReturning}}
  `;

  return await gqlQuery(query);
};
