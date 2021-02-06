import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";

const options: InitOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      scope:
        "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.appdata",
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
  ],
  callbacks: {
    async jwt(token, _, account) {
      if (account?.accessToken) {
        console.log("account", account);

        token.accessToken = account.accessToken;
      }

      return token;
    },
    async session(session, token) {
      if (token?.["accessToken"]) {
        session.accessToken = token["accessToken"];
      }

      return session;
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
