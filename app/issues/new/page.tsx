"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { log } from "console";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <div className="max-w-xl space-y-4">
        <TextField.Root placeholder="Title" {...register("title")} />
        <TextArea placeholder="Description" {...register("description")} />
        <Button>New Issue</Button>
      </div>
    </form>
  );
};

export default NewIssuePage;
