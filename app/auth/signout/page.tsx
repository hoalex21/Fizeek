"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
    signOut({ redirect: true, callbackUrl: "/" });
}