import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueSummary = async () => {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  const statuses: { label: string; value: Status; count: number }[] = [
    { label: "Open", value: "OPEN", count: open },
    { label: "Closed", value: "CLOSED", count: closed },
    { label: "In_Progress", value: "IN_PROGRESS", count: inProgress },
  ];
  return (
    <Card>
      <Flex gap="2" justify="between">
        {statuses.map((status) => (
          <Card key={status.value}>
            <Flex direction="column" gap="2">
              <Link
                className="font-bold"
                href={`/issues?status=${status.value}`}
              >
                {status.label}
              </Link>
              <Text>{status.count}</Text>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Card>
  );
};

export default IssueSummary;
