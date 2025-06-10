"use client";

import { Button, Callout, Link, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateIssueSchema } from "@/app/api/issues/route";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(CreateIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>();

  return (
    <div className="max-w-xl space-y-4">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("Something went wrong");
          }
        })}
        className="space-y-4"
      >
        <TextField.Root placeholder="Title" {...register("title")} />

        {errors.title && (
          <Callout.Root color="red">
            <Callout.Text>{errors.title.message}</Callout.Text>
          </Callout.Root>
        )}

        <TextArea placeholder="Description" {...register("description")} />
        {errors.description && (
          <Callout.Root color="red">
            <Callout.Text>{errors.description.message}</Callout.Text>
          </Callout.Root>
        )}
        <Button>New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
