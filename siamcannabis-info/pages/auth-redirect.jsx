import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { hash, compare } from "bcryptjs";
import { gqlQuery, gqlMutation } from "/db/gql";

export default function IndexPage() {
	const { data: session, status } = useSession();

	const init = async () => {

		if (status == "authenticated") {

			let query = `
				users(where: {email: {_eq: "${session.user.email}"}}){
					id,
					telephone,
					email,
					firstname,
					lastname
				}
			`;
			let { data } = await gqlQuery(query);
			if( data.length > 0 ){
				window.location.href = "/";
			}else{
				window.location.href = "/";
			}

		} else if (status == "unauthenticated") {
			window.location.href = "/signin";
		}

	};

	useEffect(() => {

		// console.log(" === status ", status)

		if (status) {
			init();
		}

	}, [status]);

	// useEffect(() => {
	// 	console.log(" === session ", session)
	// }, [session]);

	return (
		<div>
			{status == "authenticated" && (
				<>
					{/* <div>{status}</div> */}
					{/* <div>{session.user.email}</div>
					<div>{session.user.name}</div>
					<div>{session.user.picture}</div>
					<div>{session.user.sub}</div> */}
					{/* <button
						type="button"
						onClick={(e) => {
							e.preventDefault()
							signOut()
						}}
					>
						Sign out
					</button> */}
				</>
			)}
		</div>
	);
}
