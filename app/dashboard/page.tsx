"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        const user = session.user;
        
        if (user) {
            return (
                <>
                    <p>{user.email}</p>
                    <p>{user.name}</p>
                </>
            );
        }
    }
    
    redirect("/auth/login");
}