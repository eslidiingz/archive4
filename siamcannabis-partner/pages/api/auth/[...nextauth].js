import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { gqlQuery } from "../../../models/GraphQL";
import { getPartners } from "../../../models/Partner";

const secret = process.env.NEXTAUTH_SECRET;

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      id: "cnb",
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // let admin = (
        //   await getAdmins(`{username: {_eq: "${credentials.username}"}}`)
        // ).data;

        return {
          name: credentials.username,
          email: credentials.username,
          iat: new Date().getTime(),
          exp: new Date().getTime() + 84000,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      token.userRole = "admin";
      return token;
    },

    async session({ session, token, user }) {
      // console.log(">>>>>>>>> session", session);
      // console.log(">>>>>>>>> token", token);
      // console.log(">>>>>>>>> user", user);

      let _user = (
        await getPartners(`{username: {_eq: "${session.user.name}"}}`)
      ).data[0];

      // console.log(">>>>>>>>> _user", _user);

      // session.accessToken = token.accessToken;

      // CUSTOM SESSION
      session.user.id = _user.id;
      session.user.username = _user.username;
      session.user.data = _user;

      return session;
    },

    async redirect({ url, baseUrl }) {
      let redirectUrl = baseUrl + "/auth-redirect";
      // console.log(redirectUrl);
      return redirectUrl;
    },
  },
});
