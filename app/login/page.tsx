"use client";

import Link from "next/link";
import UserInput from "../ui/user-input";
import UserForm from "../ui/user-form";
import LoginAccount from "./actions/loginAccount";
import { useFormState } from "react-dom";

const initialState = {
    message: null
}

export default function Login() {
    const [state, formAction] = useFormState(LoginAccount, initialState);

    return (
        <UserForm action={formAction}>
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
                <p>Need an account? Sign up <Link href="/signup" className="text-blue-500">here</Link>.</p>
                
                <button type="submit" className="bg-black text-white rounded-lg p-2">
                    Log In
                </button>
            </div>
        </UserForm>
    );
}
