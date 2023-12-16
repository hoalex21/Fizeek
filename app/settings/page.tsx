"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Settings() {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        redirect("/settings/general");
    }

    redirect("/auth/login");
}