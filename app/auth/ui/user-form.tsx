import React, { FormEventHandler } from "react"

export default function UserForm({
    children,
    action,
    onSubmit
}: {
    children: React.ReactNode
    action?: any
    onSubmit?: any
}) {
    return (
        <div className="flex justify-center items-center mt-[calc(59px)]">
            <div className="border-2 shadow p-5 md:w-1/2 lg:w-5/12 xl:w-4/12 bg-white">
                <form action={action} onSubmit={onSubmit}>
                    {children}
                </form>
            </div>
        </div>
    );
}