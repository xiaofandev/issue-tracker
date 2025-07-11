import prisma from "@/prisma/client";
import Pagination from "./component/Pagination";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return <IssueChart open={open} closed={closed} inProgress={inProgress} />;
}
