import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { authOptions } from "../../config/authConfig";

const PatchIssueSchema = z.object({
  id: z.number(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  assignToUser: z.string().optional().nullable(),
});

export async function PATCH(request: NextRequest) {
  // Check auth
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Please sign in" }, { status: 401 });

  const issue = await request.json();
  const { id, title, description, assignToUser } = issue;

  // Check if the form data is valid
  const validation = PatchIssueSchema.safeParse(issue);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // Check if the issue exists
  const issueFromDatabase = await prisma.issue.findUnique({
    where: { id },
  });
  if (!issueFromDatabase)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  // Check if the assignee user exists
  if (issue.assignToUser) {
    const userFromDatabase = await prisma.user.findUnique({
      where: { id: issue.assignToUser },
    });
    if (!userFromDatabase)
      return NextResponse.json({ error: "Invalid user" }, { status: 404 });
  }

  // Do update the issue info
  const updatedIssue = await prisma.issue.update({
    where: { id },
    data: {
      title,
      description,
      assignToUser,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check auth
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Please sign in" }, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  await prisma.issue.delete({ where: { id: parseInt(params.id) } });

  return NextResponse.json({});
}
