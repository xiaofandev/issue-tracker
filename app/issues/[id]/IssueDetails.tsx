import StatusBadge from "@/app/component/StatusBadge";
import { Issue } from "@prisma/client";
import { Box, Heading, Card, Text, Flex } from "@radix-ui/themes";
import React from "react";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading mb="2">{issue.title}</Heading>
      <Flex className="space-x-4 items-center" mb="2">
        <StatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>{issue.description}</Card>
    </>
  );
};

export default IssueDetails;
