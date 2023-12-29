import React, { createElement } from "react";

export default function UserInput({
    label,
    type,
    id,
    name,
    error
}: {
    label: string,
    type: string,
    id: string,
    name: string,
    error?: string
}) {
    return (
        <>
            <label>{label}</label> <br />
            {
                error?
                <input type={type} id={id} name={name} className="w-full border-2 border-red-500" />
                :
                <input type={type} id={id} name={name} className="w-full border-2" />
            }
            {
                error?
                <p id={"error-" + id} className="text-red-500">{error}</p>
                :
                <br />
            }
        </>
    );
}