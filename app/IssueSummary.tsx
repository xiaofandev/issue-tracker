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
      color: "bg-red-400",
    },
    {
      label: "Closed Issues",
      value: "CLOSED",
      count: closed,
      color: "bg-green-400",
    },
    {
      label: "InProgress Issues",
      value: "IN_PROGRESS",
      count: inProgress,
      color: "bg-orange-400",
    },
  ];
  return (
    <Flex gap="2">
      {statuses.map((status) => (
        <Link
          className="text-lg"
          href={`/issues?status=${status.value}`}
          key={status.value}
        >
          <Card className={status.color}>
            <Flex direction="column" gap="2">
              {status.label}
              <Text className="text-xl font-bold">{status.count}</Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default IssueSummary;
