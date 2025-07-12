import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import IssueDetails from "./IssueDetails";
import DeleteButton from "./DeleteButton";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const fetchIssueById = cache((id: number) =>
  prisma.issue.findUnique({
    where: {
      id,
    },
  })
);

const IssueDetailsPage = async (props: Props) => {
  const params = await props.params;
  const issue = await fetchIssueById(Number(params.id));
  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="4">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Flex direction="column" gap="4">
        <AssigneeSelect issueId={issue.id} assignToUser={issue.assignToUser} />
        <EditButton issueId={issue.id} />
        <DeleteButton issueId={issue.id} />
      </Flex>
    </Grid>
  );
};

export default IssueDetailsPage;

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const issue = await fetchIssueById(Number(params.id));
  return {
    title: issue!.title,
    description: "Description of issue " + issue!.id,
  };
}
