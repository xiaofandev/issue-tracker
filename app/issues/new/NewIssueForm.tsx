"use client";

import ErrorMessage from "@/app/component/ErrorMessage";
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

const NewIssueSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

type NewIssueFormData = z.infer<typeof NewIssueSchema>;

const IssueForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewIssueFormData>({
    resolver: zodResolver(NewIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>();
  const [isSubmiting, setSubmiting] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmiting(true);

      await axios.post("/api/issues", data);

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
            <TextField.Root placeholder="Title" {...register("title")} />
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
          </div>

          <div>
            <TextArea placeholder="Description" {...register("description")} />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
          </div>

          <div>
            <Button disabled={isSubmiting}>
              Create
              {isSubmiting && <Spinner />}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
