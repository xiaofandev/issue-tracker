"use client";

import { Button, Callout, Link, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateIssueSchema } from "@/app/api/issues/route";
import Error from "@/app/component/Error";

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
      <Error>{error}</Error>

      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/");
          } catch (error) {
            setError("Something went wrong");
          }
        })}
        className="space-y-4"
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        <Error>{errors.title?.message}</Error>

        <TextArea placeholder="Description" {...register("description")} />
        <Error>{errors.description?.message}</Error>

        <Button>New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
