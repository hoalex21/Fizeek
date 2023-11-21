import Link from "next/link";
import UserInput from "../ui/user-input";
import UserForm from "../ui/user-form";

export default function SignUp() {
    return (
        <UserForm>
            <fieldset>
                <legend className="text-center">
                    Create a Fizeek account
                </legend>

                <hr />
                <br />
                
                <UserInput label="First Name" type="text" id="first-name" name="first-name"/>
                <br/> <br/>
                <UserInput label="Last Name" type="text" id="last-name" name="last-name"/>
                <br/> <br/>
                <UserInput label="Email" type="text" id="email" name="email"/>
                <br/> <br/>
                <UserInput label="Email Confirmation" type="text" id="email-confirmation" name="email-confirmation"/>
                <br/> <br/>
                <UserInput label="Username" type="text" id="username" name="username"/>
                <br/> <br/>
                <UserInput label="Password" type="password" id="password" name="password"/>
                <br/> <br/>
                <UserInput label="Password Confirmation" type="password" id="password-confirmation" name="password-confirmation"/>
            </fieldset>

            <br />

            <div className="flex justify-between items-center">
                <p>Already have an account? Log in <Link href="/login" className="text-blue-500">here</Link>.</p>
                
                <button type="submit" className="bg-black text-white rounded-lg p-2">
                    Sign Up
                </button>
            </div>
        </UserForm>
    );
}