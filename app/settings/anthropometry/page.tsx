"use client";

import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";
import AnthropometryAction from "./actions/anthropometryAction";
import useSWR from "swr";

const fetcher = async () => {
    const response = await fetch("/settings/anthropometry/api");
    const data = await response.json();
    return data;
}

const initialState = {
    message: null
}

export default function Anthropometry() {
    const { data: session, status } = useSession();
    const email = session?.user?.email;
    const AnthropometryActionWithEmail = AnthropometryAction.bind(null, email ? email : "");
    const [state, formAction] = useFormState(AnthropometryActionWithEmail, initialState);
    const { data, error } = useSWR("anthropometry", fetcher);

    console.log(data);
    console.log(error);

    return (
        <div>
            <div className="flex justify-center">
                <span className="text-2xl">Anthropometry</span>
            </div>

            {
                state.message ? 
                <div>
                    <span>{state.message}</span>
                </div>
                :
                <></>
            }

            <form action={formAction}>
                <span>Height: </span>
                <input className="w-20 border-2 rounded-md pl-1" id="centimeters" name="centimeters" />
                <label> Centimeters</label>

                <br></br>
                <br></br>

                <span>Weight: </span>
                <input className="w-20 border-2 rounded-md pl-1" id="kilograms" name="kilograms" />
                <label> Kilograms</label>

                <br></br>
                <br></br>

                <button type="submit" className="bg-blue-500 text-white rounded-lg px-6 py-2">Save</button>
            </form>
        </div>
    );
}