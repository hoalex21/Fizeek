import React from "react"

export default function UserForm({children}: {children: React.ReactNode}) {
    return (
        <div className="flex justify-center items-center mt-[calc(59px)]">
            <div className="border-2 shadow rounded-md p-5 lg:w-5/12 xl:w-4/12">
                <form>
                    {children}
                </form>
            </div>
        </div>
    );
}