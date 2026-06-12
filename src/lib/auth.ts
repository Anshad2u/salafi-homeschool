// ── NextAuth configuration ───────────────────────────────────────
// Uses Credentials provider with Profile PIN-based login

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      role: string;
      familyId: string;
      avatar: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    role: string;
    familyId: string;
    avatar: string;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "PIN Login",
      credentials: {
        profileId: { label: "Profile ID", type: "text" },
        pin: { label: "PIN", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.profileId || !credentials?.pin) {
          throw new Error("Missing profile ID or PIN");
        }

        const profile = await prisma.profile.findUnique({
          where: { id: credentials.profileId },
        });

        if (!profile) {
          throw new Error("Profile not found");
        }

        // Plain string comparison for 4-digit PINs
        if (profile.pin !== credentials.pin) {
          throw new Error("Invalid PIN");
        }

        return {
          id: profile.id,
          name: profile.name,
          role: profile.role,
          familyId: profile.familyId,
          avatar: profile.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = (user as any).role;
        token.familyId = (user as any).familyId;
        token.avatar = (user as any).avatar;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = {
        id: token.id,
        name: token.name,
        role: token.role,
        familyId: token.familyId,
        avatar: token.avatar,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export default authOptions;
