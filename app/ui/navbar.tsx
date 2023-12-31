"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
    const { data: session, status } = useSession();

    const [dropdown, setDropdown] = useState(false);
    const handleDropdown = () => {
        setRecommendationDropdown(false);
        setCalculatorDropdown(false);
        setDropdown(!dropdown);
    }

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
        <nav className="w-full shadow-xl md:flex justify-center bg-white">
            <div className="md:container md:grid md:grid-cols-3">
                <div className="flex justify-between md:px-4 px-2 py-4">
                    <Link href="/" className="font-bold">Fizeek</Link>
                    <div onClick={handleDropdown} className="space-y-2 md:hidden">
                        <div className="w-8 h-0.5 bg-black"></div>
                        <div className="w-8 h-0.5 bg-black"></div>
                        <div className="w-8 h-0.5 bg-black"></div>
                    </div>
                </div>

                {/* Site Features */}
                <div className={
                    dropdown ?
                    "md:block md:flex md:justify-center"
                    :
                    "hidden md:block md:flex md:justify-center"
                }>
                    <div>
                        <button onClick={handleRecommendationDropdown} className="py-4 px-2 text-left w-full md:w-fit hover:bg-gray-300">Recommendations</button>
                        {
                            recommendationDropdown ? (
                                <div className="md:absolute bg-white h-fit">
                                    <ul>
                                        <li>
                                            <Link href="/recommendation/exercise" className="flex ps-6 pe-16 py-4 hover:bg-gray-300">Exercise</Link>
                                        </li>
                                    </ul>
                                </div>
                            ) : null
                        }
                    </div>

                    <div>
                        <button onClick={handleCalculatorDropdown} className="py-4 px-2 text-left w-full md:w-fit hover:bg-gray-300">Calculators</button>
                        {
                            calculatorDropdown ? (
                                <div className="md:absolute bg-white h-fit">
                                    <ul>
                                        <li>
                                            <Link href="/calculator/bmi" className="flex ps-6 pe-16 py-4 hover:bg-gray-300">BMI</Link>
                                        </li>
                                    </ul>
                                </div>
                            ) : null
                        }
                    </div>
                </div>

                {/* Site Authentication */}
                <div className={
                    dropdown ?
                    "md:block md:flex justify-end md:px-4 px-2 py-4"
                    :
                    "hidden md:block md:flex justify-end md:px-4 px-2 py-4"
                }>
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