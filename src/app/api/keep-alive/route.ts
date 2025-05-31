import { keepAlive } from "~/server/keep-alive";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await keepAlive();
        return NextResponse.json({ status: "success" });
    } catch (error) {
        console.error("Keep-alive API error:", error);
        return NextResponse.json({ status: "error" }, { status: 500 });
    }
} 