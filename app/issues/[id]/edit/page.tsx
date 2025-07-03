import prisma from "@/prisma/client";
import React from "react";
import { notFound } from "next/navigation";
import PatchIssueForm from "./PatchIssueForm";

type Params = Promise<{ id: string }>;

const page = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) return notFound();

  return <PatchIssueForm issue={issue} />;
};

export default page;
