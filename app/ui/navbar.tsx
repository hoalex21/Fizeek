"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
    const { data: session, status } = useSession();

    return (
        <nav className="max-w-screen flex justify-center shadow p-4">
            <div className="container flex justify-between">
                <div>
                    <Link href="/">Fizeek.</Link>
                </div>
                <div>
                    <ul className="flex">
                        <li>
                            <Link href="/calculator/bmi" className="mr-4">BMI</Link>
                        </li>
                        {
                            status === "authenticated"? (
                                <>
                                    <li>
                                        <Link href="/" onClick={() => signOut()}>Sign Out</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="mr-4">
                                        <Link href="/signup">Sign Up</Link>
                                    </li>
                                    <li>
                                        <Link href="/login">Login</Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
       </nav>
    );
}