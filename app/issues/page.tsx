import prisma from "@/prisma/client";
import { Table, Link as RadixLink } from "@radix-ui/themes";
import StatusBadge from "../component/StatusBadge";
import IssueActions from "./IssueActions";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(params.status) ? params.status : undefined;

  const columns: { label: string; value: keyof Issue }[] = [
    {
      label: "Title",
      value: "title",
    },
    {
      label: "Status",
      value: "status",
    },
    {
      label: "Created",
      value: "createdAt",
    },
  ];

  const orderBy = columns.map((column) => column.value).includes(params.orderBy)
    ? { [params.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });

  return (
    <>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink
                  href={{ query: { ...params, orderBy: column.value } }}
                >
                  {column.label}
                  {column.value === params.orderBy && (
                    <ArrowUpIcon className="inline" />
                  )}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
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
