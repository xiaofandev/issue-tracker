"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

interface Props {
  totalCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ totalCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(totalCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();
  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push("/?" + params.toString());
  };
  return (
    <Flex align="center" gap="2">
      <Text>
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        onClick={() => changePage(1)}
        disabled={currentPage == 1}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => changePage(--currentPage)}
        disabled={currentPage == 1}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => changePage(++currentPage)}
        disabled={currentPage == pageCount}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => changePage(pageCount)}
        disabled={currentPage == pageCount}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
