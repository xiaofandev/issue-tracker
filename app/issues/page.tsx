import prisma from "@/prisma/client";
import { Table, Link as RadixLink } from "@radix-ui/themes";
import StatusBadge from "../component/StatusBadge";
import IssueActions from "./IssueActions";
import NextLink from "next/link";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <NextLink href={`/issues/${issue.id}`} legacyBehavior>
                  <RadixLink>{issue.title}</RadixLink>
                </NextLink>
              </Table.RowHeaderCell>
              <Table.Cell>
                <StatusBadge status={issue.status}></StatusBadge>
              </Table.Cell>
              <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default IssuesPage;
