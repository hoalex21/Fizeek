import SideBar from "./sidebar";

export default function SettingsContainer({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <main className="mt-[calc(56px)] flex justify-center">
            <div className="container grid grid-cols-4 gap-14">
                <SideBar />
                <div className="bg-white p-4 lg:col-span-3 col-span-4 h-fit rounded-lg">
                    {children}
                </div>
            </div>
        </main>
    );
}