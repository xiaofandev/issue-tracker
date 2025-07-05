import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

const Pagination = () => {
  return (
    <Flex align="center" gap="2">
      <Text>Page 1 of 10</Text>
      <Button color="gray" variant="soft">
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="soft">
        <ChevronLeftIcon />
      </Button>
      <Button color="gray" variant="soft">
        <ChevronRightIcon />
      </Button>
      <Button color="gray" variant="soft">
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
