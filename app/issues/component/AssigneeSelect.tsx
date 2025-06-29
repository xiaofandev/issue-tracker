"use client";

import { Select, Text } from "@radix-ui/themes";
import React, { useState } from "react";

const AssigneeSelect = () => {
  const users = [
    { name: "Frank", id: "1" },
    { name: "Jack", id: "2" },
  ];

  return (
    <Select.Root defaultValue="">
      <Select.Trigger placeholder="Assign to User:" />
      <Select.Content>
        <Select.Group>
          {users.map((user) => (
            <Select.Item value={user.id}>{user.name}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
