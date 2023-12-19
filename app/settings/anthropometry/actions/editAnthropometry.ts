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

    if (user[0] && 
        (centimeters === "" || (typeof centimeters === "string" && !isNaN(parseFloat(centimeters)))) && 
        (kilograms === "" || (typeof kilograms === "string" && !isNaN(parseFloat(kilograms))))
    ) {
        console.log("edit centimeters", centimeters);
        console.log("edit centimeters", kilograms);
        await prisma.user.update({
            where: {
                id: user[0].id
            },
            data: {
                height: {
                    upsert: {
                        create: {
                            centimeters: parseFloat(centimeters)
                        },
                        update: {
                            centimeters: parseFloat(centimeters)
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
                            kilograms: parseFloat(kilograms)
                        },
                        update: {
                            kilograms: parseFloat(kilograms)
                        }
                    }
                }
            }
        });

        prevState.message = "Your anthropometry data has been updated successfully."
    } else {
        prevState.message = "";
    }

    return prevState;
}