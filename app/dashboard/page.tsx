"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import NavBar from "../ui/navbar";

export default function Dashboard() {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        const user = session.user;
        
        if (user) {
            return (
                <>
                    <NavBar />
                    
                    <main>
                        <p>{user.email}</p>
                        <p>{user.name}</p>
                    </main>
                </>
            );
        }
    }
    
    redirect("/auth/login");
}