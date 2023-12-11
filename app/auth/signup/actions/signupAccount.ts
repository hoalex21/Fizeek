"use server";

import prisma from "@/db";
import { redirect } from "next/navigation";

const cannotBeEmpty = "Cannot be empty"

export default async function SignupAccount(prevState: any, formData: FormData) {
    const firstName = formData.get("first-name")?.toString();
    const lastName = formData.get("last-name")?.toString();
    const email = formData.get("email")?.toString();
    const emailConfirmation = formData.get("email-confirmation")?.toString();
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    const passwordConfirmation = formData.get("password-confirmation")?.toString();

    // FIRSTNAME
    prevState.errorFirstName = firstName? null : cannotBeEmpty;

    // LASTNAME
    prevState.errorLastName = lastName? null : cannotBeEmpty;

    // EMAIL
    prevState.errorEmail = email? null : cannotBeEmpty;
    
    if (email) {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        prevState.errorEmail = user? "An account is already registered to this email" : null;
    }

    // EMAIL CONFIRMATION
    prevState.errorEmailConfirmation = email === emailConfirmation? null : "Emails do not match";

    // USERNAME
    prevState.errorUsername = username? null : cannotBeEmpty;

    // handle username is not unique/ already taken
    if (username) {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        prevState.errorUsername = user? "Username is taken, please choose another" : null;
    }

    // PASSWORD
    prevState.errorPassword = password? null : cannotBeEmpty;

    // TODO: handle password is not valid (TODO: set password requirements before implementing this handler)

    // PASSWORD CONFIRMATION
    prevState.errorPasswordConfirmation = password === passwordConfirmation? null : "Passwords do not match";

    // return if any errors exist
    for (const property in prevState) {
        if (prevState[property] !== null) {
            return prevState;
        }
    }

    // Create new user
    if (firstName && lastName && email && emailConfirmation && username && password && passwordConfirmation) {
        await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: password,
            }
        });
    }
    
    redirect("/auth/login");
}