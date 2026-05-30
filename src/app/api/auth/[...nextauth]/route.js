import { dbConnect } from "@/app/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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
        const usersCollection = await dbConnect("users");
        const user = await usersCollection.findOne({ email });
        if (!user) {
          return null;
        }
        const passwordOk = await bcrypt.compare(password, user.password);
        if (passwordOk) {
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 10000, // increase to 10 seconds
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
    register: "/register",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        const usersCollection = dbConnect("users");
        let existingUser = await usersCollection.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = {
            name: user.name || "Unknown",
            email: user.email,
            photoURL: user.image || user.photoURL || null,
            createdAt: new Date().toISOString(),
          };
          const result = await usersCollection.insertOne(newUser);
          existingUser = { ...newUser, _id: result.insertedId };
        }

        token.id = existingUser._id.toString();
        token.email = user.email;
        token.name = user.name || existingUser.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
