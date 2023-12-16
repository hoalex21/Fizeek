import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
    const pathName = usePathname();

    return (
        <div className="bg-white p-3 lg:col-span-1 col-span-4 h-fit rounded-lg">
            <ul>
                <li className="text-center pb-1">Settings</li>
                <Link href="/settings/general">
                    <li className={pathName === "/settings/general" ? "p-2 my-2 rounded-md bg-blue-500 text-white" : "p-2 my-2"}>
                        General
                    </li>
                </Link>
                <Link href="/settings/security">
                    <li className={pathName === "/settings/security" ? "p-2 my-2 rounded-md bg-blue-500 text-white" : "p-2 my-2"}>
                        Security
                    </li>
                </Link>
                <Link href="/settings/anthropometry">
                    <li className={pathName === "/settings/anthropometry" ? "p-2 my-2 rounded-md bg-blue-500 text-white" : "p-2 my-2"}>
                        Anthropometry
                    </li>
                </Link>
                <Link href="/settings/signout">
                    <li className={pathName === "/settings/signout" ? "p-2 my-2 rounded-md bg-red-500 text-white" : "p-2 my-2"}>
                        Sign Out
                    </li>
                </Link>
            </ul>
        </div>
    );
}