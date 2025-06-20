"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure to delete this issue?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={async () => {
                try {
                  await axios.delete("/api/issues/" + issueId);
                  router.push("/issues");
                } catch (error) {
                  setError(true);
                }
              }}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            An error has occured, this issue can not be deleted.
          </AlertDialog.Description>
          <Flex mt="4" justify="end">
            <AlertDialog.Action>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setError(false)}
              >
                OK
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </AlertDialog.Root>
  );
};

export default DeleteButton;
