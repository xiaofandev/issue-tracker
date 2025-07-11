"use client";

import prisma from "@/prisma/client";
import { Card } from "@radix-ui/themes";
import React from "react";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueChart = ({ open, closed, inProgress }: Props) => {
  const statuses: { label: string; value: number }[] = [
    { label: "Open", value: open },
    { label: "Closed", value: closed },
    { label: "In_Progress", value: inProgress },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={statuses}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar
            barSize={30}
            dataKey="value"
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
