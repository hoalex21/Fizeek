"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function SignOut() {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        // FIXME: causing errors in console
        await signOut({callbackUrl: "/"});
    }
    
    redirect("/login");
}