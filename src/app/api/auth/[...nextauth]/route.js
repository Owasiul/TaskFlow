import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const userList = [
  { email: "dablu@gmail.com", password: 123456 },
  { email: "Tablu@gmail.com", password: 12456 },
  { email: "Lablu@gmail.com", password: 123567 },
];

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
        // console.log("crede..", credentials);
        const user = userList.find((u) => u.email === email);
        // console.log("user is", user);
        if (!user) {
          return null;
        }
        const passwordOk = user.password == password;
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
