import StatusBadge from "@/app/component/StatusBadge";
import prisma from "@/prisma/client";
import { Card, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import delay from "delay";

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
    <div className="space-y-4 max-w-xl">
      <div>
        <Heading>{issue.title}</Heading>
      </div>
      <div className="flex space-x-4 items-center">
        <StatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </div>
      <div>
        <Card>{issue.description}</Card>
      </div>
    </div>
  );
};

export default IssueDetailsPage;
