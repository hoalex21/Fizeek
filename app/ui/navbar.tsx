import React from "react";
import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="max-w-screen flex justify-center shadow p-4">
            <div className="container flex justify-between">
                <div>
                    <Link href="/">Fizeek.</Link>
                </div>
                <div>
                    <ul>
                        <li>
                            <Link href="/signup">Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </div>
       </nav>
    );
}