"use client";

import {
  Button,
  Callout,
  Link,
  Spinner,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/component/ErrorMessage";
import { IssueForm, IssueSchema } from "@/app/types/Type";

const NewIssuePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(IssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>();
  const [isSubmiting, setSubmiting] = useState<boolean>(false);

  return (
    <div className="max-w-xl space-y-4">
      <ErrorMessage>{error}</ErrorMessage>

      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmiting(true);
            await axios.post("/api/issues", data);
            router.push("/");
          } catch (error) {
            setError("Something went wrong");
            setSubmiting(false);
          }
        })}
        className="space-y-4"
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <TextArea placeholder="Description" {...register("description")} />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmiting}>
          New Issue{isSubmiting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
