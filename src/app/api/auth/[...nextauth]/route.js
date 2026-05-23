import { dbConnect } from "@/app/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      //"Sign in with..{name} button
      name: "Credentials",
      //   Inputs
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const usersCollection = dbConnect("users");
        const user = await usersCollection.findOne({ email });
        if (!user) {
          return null;
        }
        const passwordOk = await bcrypt.compare(password, user.password);
        if (passwordOk) {
          return user;
        }
        return null;
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
    register: "/register",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
