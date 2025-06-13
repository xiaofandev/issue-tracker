import { Box, Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
};

export default EditButton;
