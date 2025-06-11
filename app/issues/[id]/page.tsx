import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}
const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  if (!issue) {
    notFound();
  }

  return (
    <>
      <p>{issue.title}</p>
      <p>{issue.status}</p>
      <p>{issue.description}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </>
  );
};

export default IssueDetailsPage;
