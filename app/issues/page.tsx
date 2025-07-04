import prisma from "@/prisma/client";
import { Table, Link as RadixLink } from "@radix-ui/themes";
import StatusBadge from "../component/StatusBadge";
import IssueActions from "./IssueActions";
import NextLink from "next/link";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { status: Status };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const params = await searchParams;
  const status = statuses.includes(params.status) ? params.status : undefined;
  const issues = await prisma.issue.findMany({
    where: { status },
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
