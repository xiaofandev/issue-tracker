"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const IssueStatusFilter = () => {
  const statuses: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "InProgress", value: "IN_PROGRESS" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      onValueChange={(status) => {
        const queryParams = status === "all" ? "" : "?status=" + status;
        router.push("/issues" + queryParams);
      }}
      defaultValue={searchParams.get("status") || ""}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        <Select.Group>
          {statuses.map((status) => (
            <Select.Item key={status.label} value={status.value || "all"}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
