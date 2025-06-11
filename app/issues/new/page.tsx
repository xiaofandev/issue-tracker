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
import { IssueSchema } from "@/app/validation/schema";
import z from "zod";

type IssueForm = z.infer<typeof IssueSchema>;

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
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmiting(true);
      await axios.post("/api/issues", data);
      router.push("/");
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
              New Issue{isSubmiting && <Spinner />}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewIssuePage;
