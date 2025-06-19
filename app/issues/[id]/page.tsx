import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import IssueDetails from "./IssueDetails";
import DeleteButton from "./DeleteButton";

interface Props {
  params: Promise<{ id: string }>;
}
const IssueDetailsPage = async (props: Props) => {
  const params = await props.params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="4">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Flex direction="column" gap="4">
        <EditButton issueId={issue.id} />
        <DeleteButton issueId={issue.id} />
      </Flex>
    </Grid>
  );
};

export default IssueDetailsPage;
