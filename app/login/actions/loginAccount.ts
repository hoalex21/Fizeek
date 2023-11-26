"use server";

import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function LoginAccount(prevState: any, formData: FormData) {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (email && password) {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (user?.password === password) {
            redirect("/");
        }
    }

    return prevState;
}