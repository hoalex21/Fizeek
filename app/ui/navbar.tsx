"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
    const { data: session, status } = useSession();

    return (
        <nav className="max-w-screen shadow p-4 flex justify-center">
            <div className="container grid grid-cols-3 content-center">
                <div>
                    <Link href="/">Fizeek.</Link>
                </div>

                {/* Site Features */}
                <div className="flex justify-center">
                    <ul className="flex">
                        <li>
                            <Link href="/calculator/bmi" className="mr-4">BMI</Link>
                        </li>
                    </ul>
                </div>

                {/* Site Authentication */}
                <div className="flex justify-end">
                    <ul className="flex">
                        {
                            status === "authenticated"? (
                                <>
                                    <li>
                                        <Link href="/" onClick={() => signOut()}>Sign Out</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="mr-2">
                                        <Link className="rounded-lg bg-black p-1 border-2 border-black text-white px-4 py-2" href="/auth/signup">Sign Up</Link>
                                    </li>
                                    <li>
                                        <Link className="rounded-lg p-1 bg-white border-2 border-black px-4 py-2" href="/auth/login">Login</Link>
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