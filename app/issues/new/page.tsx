"use client";
import { IssueSchema } from "@/app/validation/schema";
import z from "zod";
import IssueForm from "../component/IssueForm";

type IssueForm = z.infer<typeof IssueSchema>;

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
