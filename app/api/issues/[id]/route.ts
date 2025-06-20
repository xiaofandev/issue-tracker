import { IssueSchema } from "@/app/validation/schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const issue = await request.json();
  const validation = IssueSchema.safeParse(issue);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: 1 },
    data: { title: issue.title, description: issue.description },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  await prisma.issue.delete({ where: { id: parseInt(params.id) } });

  return NextResponse.json({});
}
