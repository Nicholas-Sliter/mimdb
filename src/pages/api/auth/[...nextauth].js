import NextAuth from "next-auth";
import Providers from "next-auth/providers";

async function signIn(user) {
    return user.email.endsWith("@middlebury.edu");
}

const options = {
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{signIn: signIn}
};

export default (req, res) => NextAuth(req, res, options);