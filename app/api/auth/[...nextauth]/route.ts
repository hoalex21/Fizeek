import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password"},
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                });

                if (user) {
                    if (user.password === credentials?.password) {
                        return { id: user?.id.toString() };
                    }
                }

                return null;
            }
        }),
    ],
    pages: {
        signIn: "/login",
        // signOut: '/auth/signout',
        // error: '/auth/error',
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };