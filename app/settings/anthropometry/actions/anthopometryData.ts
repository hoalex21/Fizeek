"use server";

import prisma from "@/db";

export default async function AnthropometryData(email: string | null | undefined) {
    if (email) {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (user) {
            const userId = user.id;

            if (userId) {
                const height = await prisma.height.findFirst({
                    where: {
                        userId: userId
                    }
                });

                const weight = await prisma.weight.findFirst({
                    where: {
                        userId: userId
                    }
                });

                const centimeters = height?.centimeters ? height.centimeters.toString() : "";
                const kilograms = weight?.kilograms ? weight.kilograms.toString() : "";

                return { height: centimeters, weight: kilograms }
            }
        }
    }

    return { height: "", weight: "" };
}