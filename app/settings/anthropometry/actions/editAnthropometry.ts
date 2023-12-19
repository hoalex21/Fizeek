"use server";

import prisma from "@/db";

export default async function EditAnthropometry(email: string, prevState: any, formData: FormData) {
    const user = await prisma.user.findMany({
        where: {
            email: email
        }
    });

    const centimeters = formData.get("centimeters")?.toString();
    const kilograms = formData.get("kilograms")?.toString();

    if (user[0] && centimeters && kilograms) {
        await prisma.user.update({
            where: {
                id: user[0].id
            },
            data: {
                height: {
                    upsert: {
                        create: {
                            centimeters: parseInt(centimeters)
                        },
                        update: {
                            centimeters: parseInt(centimeters)
                        }
                    }
                }
            }
        });

        await prisma.user.update({
            where: {
                id: user[0].id
            },
            data: {
                weight: {
                    upsert: {
                        create: {
                            kilograms: parseInt(kilograms)
                        },
                        update: {
                            kilograms: parseInt(kilograms)
                        }
                    }
                }
            }
        });

        prevState.message = "Your anthropometry data has been updated successfully."
    } else {
        prevState.message = "";
    }

    const height = await prisma.height.findFirst({
        where: {
            userId: user[0]?.id
        }
    });

    const weight = await prisma.weight.findFirst({
        where: {
            userId: user[0]?.id
        }
    });

    return prevState;
}