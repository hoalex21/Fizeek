"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
    const { data: session, status } = useSession();

    const [recommendationDropdown, setRecommendationDropdown] = useState(false);
    const handleRecommendationDropdown = () => {
        setCalculatorDropdown(false);
        setRecommendationDropdown(!recommendationDropdown);
    }

    const [calculatorDropdown, setCalculatorDropdown] = useState(false);
    const handleCalculatorDropdown = () => {
        setRecommendationDropdown(false);
        setCalculatorDropdown(!calculatorDropdown);
    }

    return (
        <nav className="max-w-full shadow-xl flex justify-center bg-white">
            <div className="container grid grid-cols-3">
                <div className="p-4">
                    <Link href="/" className="font-bold">Fizeek</Link>
                </div>

                {/* Site Features */}
                <div className="flex justify-center">
                    <div>
                        <button onClick={handleRecommendationDropdown} className="py-4 px-2 active:bg-gray-300">Recommendations</button>
                        {
                            recommendationDropdown ? (
                                <div className="absolute bg-white h-fit">
                                    <ul>
                                        <li>
                                            <Link href="/recommendation/exercise" className="flex ps-6 pe-16 py-4 hover:bg-gray-300">Exercise</Link>
                                        </li>
                                        {/* <li>
                                            <Link href="#" className="flex ps-6 pe-16 py-4 hover:bg-gray-300">Food</Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="flex ps-6 pe-16 py-4 hover:bg-gray-300">Pose</Link>
                                        </li> */}
                                    </ul>
                                </div>
                            ) : null
                        }
                    </div>

                    <div>
                        <button onClick={handleCalculatorDropdown} className="py-4 px-2 active:bg-gray-300">Calculators</button>
                        {
                            calculatorDropdown ? (
                                <div className="absolute bg-white h-fit">
                                    <ul>
                                        <li>
                                            <Link href="/calculator/bmi" className="flex ps-6 pe-16 py-4 hover:bg-gray-300">BMI</Link>
                                        </li>
                                        {/* <li>
                                            <Link href="#" className="flex ps-6 pe-16 py-4 hover:bg-gray-300">BMR</Link>
                                        </li> */}
                                    </ul>
                                </div>
                            ) : null
                        }
                    </div>
                </div>

                {/* Site Authentication */}
                <div className="flex justify-end p-4">
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
    );
}