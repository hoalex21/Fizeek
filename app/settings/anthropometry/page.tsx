"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import NavBar from "../../ui/navbar";
import SideBar from "../ui/sidebar";

export default function Anthropometry() {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        const user = session.user;
        
        if (user) {
            return (
                <>
                    <NavBar />
                    
                    <main className="mt-[calc(56px)] flex justify-center">
                        <div className="container grid grid-cols-12 gap-14">
                            <SideBar />
                            <div className="bg-white p-4 col-span-9 h-fit rounded-lg">
                                <p>Anthropometry</p>
                            </div>
                        </div>
                    </main>
                </>
            );
        }
    }
    
    redirect("/auth/login");
}