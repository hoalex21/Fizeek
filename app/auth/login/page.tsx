"use client";

import Link from "next/link";
import UserInput from "../ui/user-input";
import UserForm from "../ui/user-form";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Login() {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        redirect("/");
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();

        const user = await signIn("credentials", {email: email, password: password, redirect: true, callbackUrl: "/"});
        console.log(user);
    }

    return (
        <UserForm onSubmit={onSubmit}>
            <fieldset>
                <legend className="text-center">
                    Log in to Fizeek
                </legend>

                <hr />
                <br />

                <UserInput label="Email" type="email" id="email" name="email"/>
                <br />
                <UserInput label="Password" type="password" id="password" name="password"/>
            </fieldset>

            <br />

            <div className="flex justify-between items-center">
                <p>Need an account? Sign up <Link href="/auth/signup" className="text-blue-500">here</Link>.</p>
                
                <button type="submit" className="bg-black text-white rounded-lg p-2">
                    Log In
                </button>
            </div>
        </UserForm>
    );
}
