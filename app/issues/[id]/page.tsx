import StatusBadge from "@/app/component/StatusBadge";
import prisma from "@/prisma/client";
import { Card, Heading } from "@radix-ui/themes";
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
      <div className="space-y-4">
        <div>
          <Heading>{issue.title}</Heading>
        </div>
        <div className="space-x-4">
          <StatusBadge status={issue.status} />
          <span>{issue.createdAt.toDateString()}</span>
        </div>
        <div>
          <Card>{issue.description}</Card>
        </div>
      </div>
    </>
  );
};

export default IssueDetailsPage;
