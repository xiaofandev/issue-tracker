import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

// disable prisma cache
export const dynamic = "force-dynamic";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="6">
      <Flex direction="column" gap="6">
        <IssueSummary open={open} closed={closed} inProgress={inProgress} />
        <LatestIssues />
      </Flex>
      <IssueChart open={open} closed={closed} inProgress={inProgress} />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "Viw a summary of issues",
};
