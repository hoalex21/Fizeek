import { NextResponse } from "next/server";

export async function GET() {
    console.log("hello");
    return NextResponse.json({
        hello: "hello"
    },
    {
        status: 200
    });
}