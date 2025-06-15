"use client";

import ErrorMessage from "@/app/component/ErrorMessage";
import { IssueSchema } from "@/app/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Callout,
  TextField,
  TextArea,
  Button,
  Spinner,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = ({ issue }: { issue?: IssueFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>();
  const [isSubmiting, setSubmiting] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmiting(true);

      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }

      router.push("/issues");
    } catch (error) {
      setError("Something went wrong");
      setSubmiting(false);
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <div>
            <TextField.Root
              placeholder="Title"
              {...register("title")}
              value={issue?.title}
            />
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
          </div>

          <div>
            <TextArea
              placeholder="Description"
              {...register("description")}
              value={issue?.description}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
          </div>

          <div>
            <Button disabled={isSubmiting}>
              {issue ? "Update" : "Create"}
              {isSubmiting && <Spinner />}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
