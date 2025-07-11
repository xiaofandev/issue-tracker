import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueSummary = ({ open, closed, inProgress }: Props) => {
  const statuses: { label: string; value: Status; count: number }[] = [
    { label: "Open Issues", value: "OPEN", count: open },
    { label: "Closed Issues", value: "CLOSED", count: closed },
    { label: "In_Progress Issues", value: "IN_PROGRESS", count: inProgress },
  ];
  return (
    <Flex gap="2">
      {statuses.map((status) => (
        <Card key={status.value}>
          <Flex direction="column" gap="2">
            <Link className="font-bold" href={`/issues?status=${status.value}`}>
              {status.label}
            </Link>
            <Text>{status.count}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
