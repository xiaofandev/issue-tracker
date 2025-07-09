import prisma from "@/prisma/client";
import { Table, Link as RadixLink } from "@radix-ui/themes";
import StatusBadge from "../component/StatusBadge";
import IssueActions from "./IssueActions";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../component/Pagination";
import { log } from "console";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
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

  const where = status ? { status } : undefined;
  const orderBy = columns.map((column) => column.value).includes(params.orderBy)
    ? { [params.orderBy]: "asc" }
    : undefined;

  const pageSize = 10;
  const page = parseInt(params.page) || 1;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });
  console.log("Totoal:" + issueCount);

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
                <NextLink href={`/issues/${issue.id}`}>{issue.title}</NextLink>
              </Table.RowHeaderCell>
              <Table.Cell>
                <StatusBadge status={issue.status}></StatusBadge>
              </Table.Cell>
              <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination
        totalCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </>
  );
};

export default IssuesPage;
