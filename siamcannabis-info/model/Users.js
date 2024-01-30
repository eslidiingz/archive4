import { hash } from "bcryptjs"
import { gqlMutation } from "/db/gql"

export const insert_users = async (data) => {

	try {

		// let query = `
		// 	insert_users(
		// 		objects: {

		// 			firstname: "${data.firstname}",
		// 			lastname: "${data.lastname}",
		// 			nickname: "${data.nickname}",
		// 			age: ${data.age},
		// 			gender: ${data.gender},
		// 			career: ${data.career},
		// 			telephone: ${data.telephone},
		// 			line_id: ${data.line_id},
		// 			email: ${data.email},

		// 			license_number: ${data.license_number},
		// 			license_file: ${data.license_file},

		// 			farm_name: ${data.farm_name},
		// 			zipcode: ${data.zipcode},
		// 			district: ${data.district},
		// 			province: ${data.province},
		// 			address: ${data.address},
		// 			species: ${data.species},
		// 			price: ${data.price},
		// 			harvest_times: ${data.harvest_times},
		// 			harvest_date: ${data.harvest_date},
		// 			area_size: ${data.area_size},
		// 			product_amount: ${data.product_amount},
		// 			farm_activity: ${data.farm_activity},
		// 			product_other: ${data.product_other}

		// 		}
		// 	) {
		// 		affected_rows
		// 	}
		// `

		let body = {
			"data": {

				"firstname": data.firstname,
				"lastname": data.lastname,
				"nickname": data.nickname,
				"age": data.age,
				"gender": data.gender,
				"career": data.career,
				"telephone": data.telephone,
				"line_id": data.line_id,
				"email": data.email,

				"license_number": data.license_number,
				"license_file": data.license_file,

				"farm_name": data.farm_name,
				"zipcode": data.zipcode,
				"district": data.district,
				"province": data.province,
				"address": data.address,
				"species": data.species,
				"price": data.price,
				"harvest_times": data.harvest_times,
				"harvest_date": data.harvest_date,
				"area_size": data.area_size,
				"product_amount": data.product_amount,
				"farm_activity": data.farm_activity,
				"product_other": data.product_other

			}
		}

		body = {
			"data": {

				"firstname": data.firstname,
				"lastname": data.lastname,
				"nickname": data.nickname,
				"age": data.age,
				"gender": data.gender,
				"career": data.career,
				"telephone": data.telephone,
				"line_id": data.line_id,
				"email": data.email,

				"license_number": data.license_number,
				"license_file": data.license_file,

				"farm_name": data.farm_name,
				"zipcode": data.zipcode,
				"district": data.district,
				"province": data.province,
				"address": data.address,
				"species": data.species,
				"price": data.price,
				"harvest_times": data.harvest_times,
				"harvest_dates": data.harvest_dates,
				"area_size": data.area_size,
				"product_amount": data.product_amount,
				"farm_activity": data.farm_activity,
				"product_other": data.product_other

			}
		}

		console.log(" === body ", body)

		const res = await fetch(`${process.env.STRAPI_API}/members`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body),
		})

		console.log(" === res ", res)


		return res

	} catch (error) {
		return error
	}
}
