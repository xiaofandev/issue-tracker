import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "../config/authConfig";

export const Schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export async function POST(req: NextRequest) {
  // Check auth
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Please sign in" }, { status: 401 });

  const data = await req.json();

  const validation = Schema.safeParse(data);
  if (!validation.success) {
    return NextResponse.json(validation.error, { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: { title: data.title, description: data.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
