import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const categoriesCount = await prisma.category.count();

        return NextResponse.json({
            success: true,
            message: "Connected to database successfuly",
            categoriesCount
        })
    } catch (error: unknown) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown database error"
        }, { status: 500 })
    }
}