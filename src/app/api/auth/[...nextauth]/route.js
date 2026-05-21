import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { register } from "next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      //"Sign in with..{name} button
      name: "Credentials",
      //   Inputs
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        // const {} = credentials

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
    register: "/register",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
