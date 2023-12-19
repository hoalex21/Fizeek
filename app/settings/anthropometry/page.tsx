"use client";

import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";
import EditAnthropometry from "./actions/editAnthropometry";
import { useEffect, useState } from "react";
import GetAnthropometryData from "./actions/getAnthopometryData";

const initialState = {
    message: null
}

const initialUserAnthropometry = {
    height: "",
    weight: ""
}

export default function Anthropometry() {
    const { data: session, status } = useSession();
    const email = session?.user?.email;

    const EditAnthropometryWithEmail = EditAnthropometry.bind(null, email ? email : "");
    const [editAnthropometryActionState, editAnthropometryAction] = useFormState(EditAnthropometryWithEmail, initialState);

    const [userAnthropometry, setUserAntropometry] = useState(initialUserAnthropometry);
    useEffect(() => {
        const updateUserAnthropometry = async () => {
            const updatedUserAnthropometry = await GetAnthropometryData(email);
            setUserAntropometry(updatedUserAnthropometry);
        }

        updateUserAnthropometry();
    }, []);

    return (
        <div>
            <div className="flex justify-center">
                <span className="text-2xl">Anthropometry</span>
            </div>

            {
                editAnthropometryActionState.message ? 
                <div>
                    <span>{editAnthropometryActionState.message}</span>
                </div>
                :
                <></>
            }

            <form action={editAnthropometryAction}>
                <span>Height: </span>
                <input className="w-14 border-2 rounded-md pl-1" id="centimeters" name="centimeters" defaultValue={userAnthropometry.height} />
                <label> Centimeters</label>

                <br></br>
                <br></br>

                <span>Weight: </span>
                <input className="w-14 border-2 rounded-md pl-1" id="kilograms" name="kilograms" defaultValue={userAnthropometry.weight} />
                <label> Kilograms</label>

                <br></br>
                <br></br>

                <button type="submit" className="bg-blue-500 text-white rounded-lg px-6 py-2">Save</button>
            </form>
        </div>
    );
}