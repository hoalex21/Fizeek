"use server";

import prisma from "@/db";
import { redirect } from "next/navigation";
import bcrypt from 'bcrypt';

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

    // handle username is not unique or is already taken
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

    /* 
        Passwords need to be at least 8 characters long, 
        have at least 1 special character, 
        at least 1 number, 
        at least 1 uppercase letter, 
        and at least 1 lowercase letter 
    */
    if (password) {
        const regexSpecialCharacters = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;
        const regexNumbers = /\d/;
        const regexUpperCaseLetters = /[A-Z]/;
        const regexLowerCaseLetters = /[a-z]/;

        if (password.length < 8) {
            prevState.errorPassword = "Password must contain at least 8 characters";
        } else if (!regexSpecialCharacters.test(password)) {
            prevState.errorPassword = "Password must contain at least 1 special character";
        } else if (!regexNumbers.test(password)) {
            prevState.errorPassword = "Password must contain at least 1 number";
        } else if (!regexUpperCaseLetters.test(password)) {
            prevState.errorPassword = "Password must contain at least 1 uppercase letter";
        } else if (!regexLowerCaseLetters.test(password)) {
            prevState.errorPassword = "Password must contain at least 1 lowercase letter";
        }
    }

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
        const passwordHash = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email.toLowerCase(),
                username: username,
                password: passwordHash,
            }
        });
    }

    redirect("/auth/login");
}