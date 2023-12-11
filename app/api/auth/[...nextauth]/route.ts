import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from "@/db";
import bcrypt from "bcrypt";

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

                if (user && credentials) {
                    if (await bcrypt.compare(credentials.password, user.password)) {
                        const userObject = {
                            id: user.id.toString(),
                            email: user.email.toString(),
                            name: user.username.toString()
                        }
                        return userObject;
                    }
                }

                return null;
            }
        }),
    ],
    pages: {
        signIn: "/auth/login",
        signOut: '/auth/signout',
        // error: '/error',
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };