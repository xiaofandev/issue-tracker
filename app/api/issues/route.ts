import { NewIssueSchema } from "@/app/validation/schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = NewIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error, { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
