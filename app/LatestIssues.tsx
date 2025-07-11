import { Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import React from "react";
import StatusBadge from "./component/StatusBadge";
import prisma from "@/prisma/client";
import Link from "next/link";

const LatestIssues = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: [{ id: "desc" }],
    take: 5,
  });
  return (
    <Card>
      <Heading mb="2">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {latestIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Flex direction="column" align="start" gap="2">
                  <Link
                    className="text-sm font-bold"
                    href={`/issues/${issue.id}`}
                  >
                    {issue.title}
                  </Link>
                  <StatusBadge status={issue.status} />
                </Flex>
              </Table.RowHeaderCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
