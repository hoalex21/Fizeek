"use client";

import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";
import AnthropometryAction from "./actions/anthropometryAction";
import { useEffect, useState } from "react";
import AnthropometryData from "./actions/anthopometryData";

const initialState = {
    message: null
}

const initialAnthropometryState = {
    height: "",
    weight: ""
}

export default function Anthropometry() {
    const { data: session, status } = useSession();
    const email = session?.user?.email;

    const AnthropometryActionWithEmail = AnthropometryAction.bind(null, email ? email : "");
    const [state, formAction] = useFormState(AnthropometryActionWithEmail, initialState);

    const [anthropometry, setAntropometry] = useState(initialAnthropometryState);
    useEffect(() => {
        const updateAnthropometry = async () => {
            const updatedAnthropometry = await AnthropometryData(email);
            setAntropometry(updatedAnthropometry);
        }

        updateAnthropometry();
    }, []);

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
                <input className="w-20 border-2 rounded-md pl-1" id="centimeters" name="centimeters" defaultValue={anthropometry.height} />
                <label> Centimeters</label>

                <br></br>
                <br></br>

                <span>Weight: </span>
                <input className="w-20 border-2 rounded-md pl-1" id="kilograms" name="kilograms" defaultValue={anthropometry.weight} />
                <label> Kilograms</label>

                <br></br>
                <br></br>

                <button type="submit" className="bg-blue-500 text-white rounded-lg px-6 py-2">Save</button>
            </form>
        </div>
    );
}