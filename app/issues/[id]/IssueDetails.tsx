import StatusBadge from "@/app/component/StatusBadge";
import { Issue } from "@prisma/client";
import { Box, Heading, Card, Text } from "@radix-ui/themes";
import React from "react";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <div className="mb-2">
        <Heading>{issue.title}</Heading>
      </div>
      <div className="flex space-x-4 items-center mb-2">
        <StatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </div>
      <div>
        <Card>{issue.description}</Card>
      </div>
    </>
  );
};

export default IssueDetails;
