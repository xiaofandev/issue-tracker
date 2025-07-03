import prisma from "@/prisma/client";
import React from "react";
import { notFound } from "next/navigation";
import PatchIssueForm from "./PatchIssueForm";

type Params = Promise<{ id: string }>;

const page = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const data = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!data) return notFound();

  return <PatchIssueForm issueId={id} data={data} />;
};

export default page;
