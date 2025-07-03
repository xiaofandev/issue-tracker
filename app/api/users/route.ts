import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../config/authConfig";

export async function GET(req: NextRequest) {
  // Check auth
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Please sign in" }, { status: 401 });

  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
