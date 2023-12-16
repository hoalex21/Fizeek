"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import SettingsContainer from "./ui/settingsContainer";
import NavBar from "@/app/ui/navbar";

export default function SettingsLayout({
    children
}: {
    children: React.ReactNode
}) {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        return (
            <>
                <NavBar />
                
                <SettingsContainer>
                    {children}
                </SettingsContainer>
            </>
        );
    }

    redirect("/auth/login");
}