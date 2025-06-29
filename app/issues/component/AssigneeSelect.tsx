"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await axios
        .get<User[]>("/api/users")
        .then((resp) => resp.data);
      setUsers(users);
    };
    fetchUsers();
    console.log(users);
  }, []);

  return (
    <Select.Root defaultValue="">
      <Select.Trigger placeholder="Assign to User:" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggections</Select.Label>
          {users.map((user) => (
            <Select.Item value={user.id}>{user.name}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
