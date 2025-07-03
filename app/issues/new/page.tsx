"use client";
import { NewIssueSchema } from "@/app/validation/schema";
import z from "zod";
import NewIssueForm from "./NewIssueForm";

type IssueForm = z.infer<typeof NewIssueSchema>;

const NewIssuePage = () => {
  return <NewIssueForm />;
};

export default NewIssuePage;
