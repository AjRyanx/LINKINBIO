import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    return NextResponse.json({
      status: "ok",
      database: "connected",
      userCount,
      env: {
        hasAuthSecret: !!process.env.AUTH_SECRET,
        authUrl: process.env.AUTH_URL ?? "not set",
        nodeEnv: process.env.NODE_ENV,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        error: error?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
