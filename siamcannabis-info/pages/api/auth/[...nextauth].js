import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";

import { gqlQuery, gqlMutation } from "/db/gql"

const secret = process.env.NEXTAUTH_SECRET;

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [
		FacebookProvider({
			clientId: process.env.FACEBOOK_ID,
			clientSecret: process.env.FACEBOOK_SECRET,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		TwitterProvider({
			clientId: process.env.TWITTER_ID,
			clientSecret: process.env.TWITTER_SECRET,
		}),
		Auth0Provider({
			clientId: process.env.AUTH0_ID,
			clientSecret: process.env.AUTH0_SECRET,
			issuer: process.env.AUTH0_ISSUER,
		}),
		CredentialsProvider({
			id: "Siamcannabis",
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {

				console.log(credentials.authority)

				let query = `
					users(
						where: {
							_or: [
								{ email: {_eq: "${credentials.username}"} },
								{ telephone: {_eq: "${credentials.username}"} }
							]
						}
					) {
						id,
						email,
						password,
						firstname,
						lastname
					}
				`
				let res = await gqlQuery(query)

				return {
					name: res.data[0].firstname + " " + res.data[0].lastname,
					email: res.data[0].email,
					picture: '',
					iat: new Date().getTime(),
					exp: new Date().getTime() + 84000
				}

			},
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			token.userRole = "admin";
			return token;
		},
		async session({ session, token, user }) {

			session.accessToken = token.accessToken;

			console.log(" === session ", session)
			console.log(" === token ", token)
			console.log(" === user ", user)

			let query = `
				users(
					where: {
						_or: [
							{ email: {_eq: "${session.user.email}"} },
							{ telephone: {_eq: "${session.user.email}"} }
						]
					}
				) {
					id, code, email, telephone, sub_district, zipcode, address_more, profile_image, firstname, lastname, nickname, gender, age, career, level,
					center_id
				}
			`
			let { data } = await gqlQuery(query)

			// CUSTOM SESSION
			if( data.length == 0 ){
				session.user.social_signup = true
			}else{
				session.user.id = data[0].id
				session.user.data = data[0]
				session.user.social_signup = false
			}

			console.log("session session session session",session)

			return session;

		},
		async redirect({ url, baseUrl }) {
			let redirectUrl = baseUrl + "/auth-redirect";
			console.log(redirectUrl)
			return redirectUrl;
		},
	},
});
