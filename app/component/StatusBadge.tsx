import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const StatusBadge = ({ status }: { status: Status }) => {
  const statusMap: Record<
    Status,
    { label: string; color: "red" | "orange" | "green" }
  > = {
    OPEN: { label: "OPEN", color: "red" },
    IN_PROGRESS: { label: "IN PROGRESS", color: "orange" },
    CLOSED: { label: "CLOSED", color: "green" },
  };
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default StatusBadge;
