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
  const statuses: {
    label: string;
    value: Status;
    count: number;
    color: string;
  }[] = [
    {
      label: "Open Issues",
      value: "OPEN",
      count: open,
      color: "red-400",
    },
    {
      label: "Closed Issues",
      value: "CLOSED",
      count: closed,
      color: "green-400",
    },
    {
      label: "InProgress Issues",
      value: "IN_PROGRESS",
      count: inProgress,
      color: "orange-400",
    },
  ];
  return (
    <Flex gap="2">
      {statuses.map((status) => (
        <Card key={status.value} className={`bg-${status.color}`}>
          <Flex direction="column" gap="2">
            <Link
              className="font-bold text-lg"
              href={`/issues?status=${status.value}`}
            >
              {status.label}
            </Link>
            <Text className="text-lg font-medium">{status.count}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
