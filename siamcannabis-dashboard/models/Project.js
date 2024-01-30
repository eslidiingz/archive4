/** @format */

import { gqlMutation, gqlQuery } from "./GraphQL";
import { gql } from "@apollo/client";

export const gqlProjectReturning = `{
    clinic_name
    clinic_reward_rate
    created_at
    end_holding_time
    end_sale_time
    id
    is_opened
    land_price
    project_id
    project_name
    start_sale_time
    updated_at
    zone_id
    zone_max
    zone_name
    zone_reward_rate
}`;

export const getProjects = async (_where) => {
	let query = `projects ${_where ? `(${_where})` : ""}
    ${gqlProjectReturning}
  `;

	return await gqlQuery(query);
};

export const GET_ALL_PROJECTS = gql`
	query GetAllProjects($isOpened: Boolean = true) {
		projects(where: { is_opened: { _eq: $isOpened } }) {
			id
			project_name
			project_id
			zone_id
			zone_name
			start_sale_time
			end_sale_time
			end_holding_time
			is_opened
			partner_zone {
				id
				partner_id
				project_id
			}
		}
	}
`;

export const GET_ALL_PROJECTS_BY_PARTNER_ID = gql`
	query GetAllProjectsByPartnerId($partnerId: Int!) {
		partner_zones(where: { partner_id: { _eq: $partnerId } }) {
			id
			zone_id
			project_id
			project {
				project_name
				zone_name
				zone_max
			}
			partner_voucher {
				partner_id
			}
		}
	}
`;

export const INSERT_PROJECT = gql`
	mutation InsertProject($object: projects_insert_input!) {
		insert_projects_one(object: $object) {
			project_name
			zone_name
			is_opened
		}
	}
`;
