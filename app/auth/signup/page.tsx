"use client";

import React, { useState } from "react";
import Link from "next/link";
import UserInput from "../ui/user-input";
import UserForm from "../ui/user-form";
import SignupAccount from "./actions/signupAccount";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import NavBar from "@/app/ui/navbar";
import ReCAPTCHA from "react-google-recaptcha";

const initialState = {
    errorFirstName: null,
    errorLastName: null,
    errorEmail: null,
    errorEmailConfirmation: null,
    errorUsername: null,
    errorPassword: null,
    errorPasswordConfirmation: null
}

const sitekey = "6Ldz3kApAAAAALcPUe8I74O8_yYszHF5miC_k3D8";

export default function Signup() {
    const { data: session, status } = useSession();
    const [state, formAction] = useFormState(SignupAccount, initialState);
    
    const [recaptchaValue, setRecaptchaValue] = useState(false);
    const recaptchaChange = (value: string | null) => {
        value !== null ? setRecaptchaValue(true) : setRecaptchaValue(false);
    }

    if (status === "authenticated") {
        redirect("/");
    }

    return (
        <>
            <NavBar />

            <main>
                <UserForm action={formAction}>
                    <fieldset>
                        <legend className="text-center text-lg">
                            Create a Fizeek account
                        </legend>

                        <hr />
                        <br />
                        
                        <UserInput label="First Name" type="text" id="first-name" name="first-name" error={state?.errorFirstName}/>
                        <br/>
                        <UserInput label="Last Name" type="text" id="last-name" name="last-name" error={state?.errorLastName}/>
                        <br/>
                        <UserInput label="Email" type="email" id="email" name="email" error={state?.errorEmail}/>
                        <br/>
                        <UserInput label="Email Confirmation" type="email" id="email-confirmation" name="email-confirmation" error={state?.errorEmailConfirmation}/>
                        <br/>
                        <UserInput label="Username" type="text" id="username" name="username" error={state?.errorUsername}/>
                        <br/>
                        <UserInput label="Password" type="password" id="password" name="password" error={state?.errorPassword}/>
                        <br/>
                        <UserInput label="Password Confirmation" type="password" id="password-confirmation" name="password-confirmation" error={state?.errorPasswordConfirmation}/>
                    </fieldset>

                    <br />

                    <ReCAPTCHA
                        sitekey={sitekey}
                        onChange={recaptchaChange}
                    />

                    <br />

                    <div className="lg:flex lg:justify-between items-center">
                        <p>Already have an account? Log in <Link href="/auth/login" className="text-blue-500">here</Link>.</p>

                        <div className="block lg:hidden"><br></br></div>

                        {
                            recaptchaValue ?
                            <button type="submit" className="bg-black text-white p-2 float-right">
                                Sign Up
                            </button>
                            :
                            <button type="submit" className="bg-black text-white p-2 float-right opacity-50" disabled>
                                Sign Up
                            </button>
                        }
                    </div>
                </UserForm>
            </main>
        </>
    );
}