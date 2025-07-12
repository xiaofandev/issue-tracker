import { Avatar, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import React from "react";
import StatusBadge from "./component/StatusBadge";
import prisma from "@/prisma/client";
import Link from "next/link";

const LatestIssues = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: [{ id: "desc" }],
    take: 5,
    include: { user: true },
  });
  return (
    <Card>
      <Heading mb="5">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {latestIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Flex justify="between" align="center">
                  <Flex direction="column" align="start" gap="2">
                    <Link
                      className="text-sm font-bold"
                      href={`/issues/${issue.id}`}
                    >
                      {issue.title}
                    </Link>
                    <StatusBadge status={issue.status} />
                  </Flex>
                  {issue.user && (
                    <Avatar
                      fallback="?"
                      src={issue.user.image!}
                      radius="full"
                    />
                  )}
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
