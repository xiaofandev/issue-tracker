import { PatchIssueSchema } from "@/app/validation/schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const issue = await request.json();

  // Check if the form data is valid
  const validation = PatchIssueSchema.safeParse(issue);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // Check if the issue exists
  const issueFromDatabase = await prisma.issue.findUnique({
    where: { id: issue.id },
  });
  if (!issueFromDatabase)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  // Check if the assignee user exists
  if (issue.assignToUser) {
    const userFromDatabase = await prisma.user.findUnique({
      where: { id: issue.assignToUser },
    });
    if (!userFromDatabase)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Do update the issue info
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: issue.title,
      description: issue.description,
      assignToUser: issue.assignToUser,
    },
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
