"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
    const { data: session, status } = useSession();

    const [recommendationsDropdown, setRecommendationsDropdown] = useState(false);

    const handleRecommendationsDropdown = () => {
        setRecommendationsDropdown(!recommendationsDropdown);
    }

    return (
        <>
            <nav className="max-w-screen shadow-xl p-4 flex justify-center bg-white">
                <div className="container grid grid-cols-3 content-center">
                    <div>
                        <Link href="/" className="font-bold">Fizeek</Link>
                    </div>

                    {/* Site Features */}
                    <div className="flex justify-center">
                        <ul className="flex">
                            <li>
                                <Link href="/recommendation/exercise" className="mr-4">Exercise</Link>
                            </li>
                            <li>
                                <Link href="/calculator/bmi" className="mr-4">BMI</Link>
                            </li>
                            <div className="w-full">
                                <button onClick={handleRecommendationsDropdown}>Recommendations</button>
                                {
                                    recommendationsDropdown ?
                                    <div className="absolute bg-black text-gray-300 border-gray-500 border-2">
                                        <ul>
                                            <Link href="#">
                                                <li className="px-6 py-2 border-gray-500 border-b-2">
                                                    Exercise
                                                </li>
                                            </Link>
                                            <Link href="#">
                                                <li className="px-6 py-2 border-gray-500 border-b-2">
                                                    Food
                                                </li>
                                            </Link>
                                            <Link href="#">
                                                <li className="px-6 py-2">
                                                    Pose
                                                </li>
                                            </Link>
                                        </ul>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </ul>
                    </div>

                    {/* Site Authentication */}
                    <div className="flex justify-end">
                        <ul className="flex">
                            {
                                status === "authenticated"? (
                                    <>
                                        <li>
                                            <Link className="mx-4" href="/settings">Settings</Link>
                                        </li>
                                        <li>
                                            <Link href="/" onClick={() => signOut()}>Sign Out</Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="mr-2">
                                            <Link className="bg-black p-1 border-2 border-black text-white px-4 py-2" href="/auth/signup">Sign Up</Link>
                                        </li>
                                        <li>
                                            <Link className="p-1 bg-white border-2 border-black px-4 py-2" href="/auth/login">Log In</Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
    </>
    );
}