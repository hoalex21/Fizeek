import React from "react";

export default function UserInput({
    label,
    type,
    id,
    name,
}: {
    label: string,
    type: string,
    id: string,
    name: string,
}) {
    return (
        <>
            <label>{label}</label> <br />
            <input type={type} id={id} name={name} className="w-full border-2 rounded-md pl-2" />
        </>
    );
}