import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            'http://localhost:3333/auth/login',
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          const { user, accessToken } = response.data;

          return {
            ...user,
            accessToken,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
        session.accessToken = token.accessToken;
        session.user.role = token.role as string;
      return session;
    },
  },

  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
