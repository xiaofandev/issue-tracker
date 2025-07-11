import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Flex direction="column" gap="4">
        <IssueSummary open={open} closed={closed} inProgress={inProgress} />
        <LatestIssues />
      </Flex>
      <IssueChart open={open} closed={closed} inProgress={inProgress} />
    </Grid>
  );
}
