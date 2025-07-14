import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table, Text } from "@radix-ui/themes";
import React from "react";
import StatusBadge from "../component/StatusBadge";
import { Issue } from "@prisma/client";
import NextLink from "next/link";
import { Sort } from "./page";
import SortingButton from "./SortingButton";

interface Props {
  issues: Issue[];
  searchParams: Promise<{ orderBy: keyof Issue; sort: Sort }>;
}

export const columns: { label: string; value: keyof Issue }[] = [
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

const IssuesTable = async ({ issues, searchParams }: Props) => {
  const params = await searchParams;
  if (!issues || issues.length == 0) {
    return <Text>No result...</Text>;
  }

  const toggleSortType = (sort: Sort): Sort => {
    return sort === "asc" ? "desc" : "asc";
  };

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell key={column.value}>
              <NextLink
                href={{
                  query: {
                    ...params,
                    orderBy: column.value,
                    sort:
                      column.value === params.orderBy
                        ? toggleSortType(params.sort)
                        : "desc",
                  },
                }}
              >
                {column.label}
                {column.value === params.orderBy && (
                  <SortingButton searchParams={searchParams} />
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
  );
};

export default IssuesTable;
