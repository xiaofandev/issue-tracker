import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import React from "react";
import { Sort } from "./page";

interface Props {
  searchParams: Promise<{ sort: Sort }>;
}

const SortingButton = async ({ searchParams }: Props) => {
  const params = await searchParams;

  if (params.sort === "asc") return <ArrowUpIcon className="inline" />;

  if (params.sort === "desc") return <ArrowDownIcon className="inline" />;
};

export default SortingButton;
