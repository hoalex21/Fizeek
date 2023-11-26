import { redirect } from "next/navigation";

export default async function LoginAccount(prevState: any, formData: FormData) {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (email && password) {
        redirect("/");
    }

    return prevState;
}