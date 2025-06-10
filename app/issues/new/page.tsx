"use client";

import { Button, Callout, Link, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, handleSubmit } = useForm<IssueForm>();
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
        <TextArea placeholder="Description" {...register("description")} />
        <Button>New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
