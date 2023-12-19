"use server";

import prisma from "@/db";

export default async function GetAnthropometryData(email: string | null | undefined) {
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

                if (height) {
                    console.log("get height", height.centimeters);
                }
            
                if (weight) {
                    console.log("get weight", weight.kilograms);
                }

                const centimeters = height?.centimeters ? height.centimeters.toString() : "";
                const kilograms = weight?.kilograms ? weight.kilograms.toString() : "";

                console.log("get centimeters", centimeters);
                console.log("get kilograms", kilograms);

                return { height: centimeters, weight: kilograms }
            }
        }
    }

    return { height: "", weight: "" };
}