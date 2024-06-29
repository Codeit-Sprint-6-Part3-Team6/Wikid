import NextAuth from "next-auth";
// import Provider from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "test",
      credentials: {
        email: {
          label: "email",
          type: "string",
          placeholder: "이메일을 입력해주세요",
        },
        password: {
          label: "password",
          type: "string",
          placeholder: "비밀번호를 입력해주세요",
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
export default NextAuth(authOptions);
