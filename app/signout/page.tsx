"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SignOut() {
    const { data: session, status } = useSession();

    if (status === "unauthenticated") {
        redirect("/signup");
    } else {
        signOut({ redirect: false, callbackUrl: "/" });
    }
}