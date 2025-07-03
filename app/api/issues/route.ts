import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import z from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../config/authConfig";

export const Schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // Check auth
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Please sign in" }, { status: 401 });

  const body = await req.body;
  const validation = Schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error, { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
