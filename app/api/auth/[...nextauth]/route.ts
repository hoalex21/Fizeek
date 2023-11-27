import NextAuth from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        GitHubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const email = credentials.email?.toString();
                const password = credentials.password?.toString();
                
                const user = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                });

                if (user) {
                    if (user.password === password) {
                        return {id: user.id.toString()};
                    }
                }

                return null;
            }
        })
    ]
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };