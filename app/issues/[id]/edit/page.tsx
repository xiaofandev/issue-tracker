import prisma from "@/prisma/client";
import React from "react";
import IssueForm from "../../component/IssueForm";
import { notFound } from "next/navigation";
import { Issue } from "@prisma/client";

const page = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
};

export default page;
