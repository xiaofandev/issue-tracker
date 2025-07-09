import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";

import { Issue, Status } from "@prisma/client";
import Pagination from "../component/Pagination";
import IssuesTable, { columns } from "./IssuesTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const statuses = Object.values(Status);
  const status = statuses.includes(params.status) ? params.status : undefined;

  const where = status ? { status } : undefined;
  const orderBy = columns.map((column) => column.value).includes(params.orderBy)
    ? { [params.orderBy]: "asc" }
    : undefined;

  const pageSize = 10;
  const page = parseInt(params.page) <= 0 ? 1 : parseInt(params.page);
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
