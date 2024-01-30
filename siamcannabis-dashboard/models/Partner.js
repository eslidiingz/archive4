import { gqlMutation, gqlQuery } from "./GraphQL";
import { gql } from "@apollo/client";

export const gqlPartnerReturning = `{
    approved_at
    contact_name
    created_at
    email
    id
    is_active
    is_approve
    company_name
    phone_number
    updated_at
}`;

export const getPartners = async (_where) => {
	let query = `
    partners ${_where ? `(${_where})` : ""}
    ${gqlPartnerReturning}
  `;

	return await gqlQuery(query);
};

export const approvePartnerVerify = async (id) => {
	let mutation = `
      update_partners(_set: {is_approve: true}, where: {id: {_eq: "${id}"}}) {
        returning ${gqlPartnerReturning}
      }
    `;

	return await gqlMutation(mutation);
};

export const INSERT_PARTNER = gql`
	mutation InsertPartner($object: partners_insert_input!) {
		insert_partners_one(object: $object) {
			company_name
		}
	}
`;

export const GET_ALL_PARTNERS = gql`
	query GetAllPartners {
		partners {
			approved_at
			contact_name
			created_at
			email
			id
			is_active
			is_approve
			company_name
			phone_number
			updated_at
		}
	}
`;

export const GET_PARTNER_COM_NAME_BY_ID = gql`
	query GetPartnersById($partnerId: Int!) {
	partners_by_pk(id: $partnerId) {
			company_name
		}
	}
`;

export const GET_DISTINCT_ALL_PARTNERS = gql`
	query GetDistinctAllPartners {
		partner_zones(distinct_on: partner_id) {
			id
			partner {
				company_name
			}
			partner_id
			project_id
			zone_id
		}
	}
`;

export const INSERT_PARTNER_ZONES = gql`
	mutation InsertPartnerZones($objects: [partner_zones_insert_input!]!) {
		insert_partner_zones(objects: $objects) {
			affected_rows
			returning {
				partner_id
				project_id
				zone_id
			}
		}
	}
`;


export const UPDATE_PARTNER_APPROVE_STATUS = gql`
	mutation UpdatePartnerApproveStatus($partnerId: Int!, $approveStatus: Boolean!, $approvedAt: timestamptz) {
		update_partners_by_pk(
			pk_columns: { id: $partnerId }
			_set: { is_approve: $approveStatus, approved_at: $approvedAt }
		) {
			is_approve
			approved_at
		}
	}
`;


/*approved_at: timestamptz
company_name: String
name of partner [ex.] Mex Clinic
contact_name: String
partner contact to operator name
created_at: timestamptz
email: String
Email contact to partner
id: Int
is_active: Boolean
partner status
is_approve: Boolean
partner approve status
partner_type: String
password: String
password for partner login
phone_number: String
partnert contact to phone number
updated_at: timestamptz
username: String
username for partner login*/

export const GET_PARTNER_BY_ID = gql`
	query GetPartnerById($partnerId: Int!) {
		partners_by_pk(id: $partnerId) {
		company_name
		contact_name
		email
		phone_number
		partner_type
  		}
	}
`;

export const UPDATE_PARTNER = gql`
	mutation UpdatePartner(
		$partnerId: Int!, 
		$companyName: String, 
		$contactName: String, 
		$email: String, 
		$partnerType: String,
		$phoneNumber: String,
		$updatedAt: timestamptz
		) {
		update_partners_by_pk(
		pk_columns: {id: $partnerId}, 
		_set: {
			company_name: $companyName, 
			contact_name: $contactName, 
			email: $email, 
			partner_type: $partnerType,
			phone_number: $phoneNumber,
			updated_at: $updatedAt

		})
		{
			id
    		updated_at
		}
	}
`;