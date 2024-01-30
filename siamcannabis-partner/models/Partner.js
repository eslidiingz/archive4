import { objectForParams } from "../utils/misc";
import { gqlMutation, gqlQuery } from "./GraphQL";

export const gqlPartnerReturning = `
  id
  approved_at
  company_name
  contact_name
  created_at
  email
  is_active
  is_approve
  password
  phone_number
  updated_at
  username
`;

export const registerPartner = async (_params) => {
  const mutation = `
    insert_partners_one(object: ${objectForParams(_params)}) {
      ${gqlPartnerReturning}
    }
  `;

  return await gqlMutation(mutation);
};

export const getPartners = async (_where) => {
  let query = `
    partners ${_where ? `(where: ${_where})` : ""}
    {${gqlPartnerReturning}}
  `;

  return await gqlQuery(query);
};
