"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Skeleton } from "@/app/component/Skeleton";

interface Props {
  issueId: number;
  assignToUser?: string | null;
}

const AssigneeSelect = ({ issueId, assignToUser }: Props) => {
  const { data: users, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((resp) => resp.data),
    staleTime: 10 * 60 * 1000,
    retry: 3,
  });

  if (isFetching) return <Skeleton />;

  const assignIssue = (userId: string) => {
    axios
      .patch("/api/issues/" + issueId, {
        assignToUser: userId == "unassigned" ? null : userId,
      })
      .then(() => {
        toast.success("Changes has been saved");
      })
      .catch(() => {
        toast.error("Changes can not be saved");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={assignToUser || ""}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign to User:" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggections</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users &&
              users.map((user) => (
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
