import prisma from "@/prisma/client";
import React from "react";
import IssueForm from "../../component/IssueForm";

const page = ({ params }: { params: { id: string } }) => {
  const issue = prisma.issue.findUnique({ where: { id: parseInt(params.id) } });

  return <IssueForm />;
};

export default page;
