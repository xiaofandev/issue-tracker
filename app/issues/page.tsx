import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";

import { Issue, Status } from "@prisma/client";
import Pagination from "../component/Pagination";
import IssuesTable, { columns } from "./IssuesTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

export type Sort = "asc" | "desc";

interface Props {
  searchParams: Promise<{
    status: Status;
    orderBy: keyof Issue;
    sort: Sort;
    page: string;
  }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(params.status) ? params.status : undefined;

  const where = status ? { status } : undefined;

  const sort: Sort = params.sort ? params.sort : "desc";

  const orderBy: { [x: string]: Sort } = columns
    .map((column) => column.value)
    .includes(params.orderBy)
    ? { [params.orderBy]: sort }
    : { id: "desc" }; // default order by id desc

  const pageSize = 10;

  let page = 1;
  // page参数不存在，或page参数小于等于0或不为数字的情况，取默认值1
  if (params.page && parseInt(params.page) > 1) {
    page = parseInt(params.page);
  }

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssuesTable issues={issues} searchParams={searchParams} />
      <Pagination
        totalCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "Viw all issues",
};
