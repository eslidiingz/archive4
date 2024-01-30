export const gqlQuery = async (query) => {

	let query_body = `query { ` + query + ` }`

	let body = JSON.stringify({
		query: query_body,
	})

	let res = await fetch(`${process.env.GQL_API}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
			"Cache-Control": "no-cache",
			"x-hasura-admin-secret": "2f64590fe77568880f4abafb2c3c4620",
		},
		body: body,
	})

	let res_json = await res.json()
	if (res_json.data) {
		let column_name = Object.keys(res_json.data)[0]
		let data = res_json.data[column_name]

		//console.log(data)

		return {
			status: true,
			data: data
		}
	} else {
		return {
			status: false,
			data: [],
			error: "Record not found"
		}
	}

}

export const gqlMutation = async (query) => {

	let query_body = `mutation { ` + query + ` }`

	let body = JSON.stringify({
		query: query_body,
	})

	let res = await fetch(`${process.env.GQL_API}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
			"Cache-Control": "no-cache",
			"x-hasura-admin-secret": "2f64590fe77568880f4abafb2c3c4620",
		},
		body: body,
	})

	let res_json = await res.json()
	if (res_json.data) {
		let column_name = Object.keys(res_json.data)[0]
		let data = res_json.data[column_name]["returning"]

		return {
			status: true,
			data: data
		}
	} else {
		return {
			status: false,
			data: [],
			error: "Record not found"
		}
	}

}
