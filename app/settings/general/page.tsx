"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import SettingsContainer from "../ui/settingsContainer";
import NavBar from "@/app/ui/navbar";

export default function General() {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        return (
            <>
                <NavBar />
                
                <SettingsContainer>
                    <p>General</p>
                </SettingsContainer>
            </>
        );
    }

    redirect("/auth/login");
}