"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  issueId: number;
  assignToUser?: string | null;
}

const AssigneeSelect = ({ issueId, assignToUser }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<String>();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await axios
        .get<User[]>("/api/users")
        .then((resp) => resp.data);
      setUsers(users);
    };
    fetchUsers();
  }, []);

  return (
    <Select.Root
      defaultValue={assignToUser || ""}
      onValueChange={(value) => {
        try {
          axios.patch("/api/issues/" + issueId, {
            id: issueId,
            assignToUser: value == "unassigned" ? null : value,
          });
        } catch (e) {
          setError("Assign to user has failed");
        }
      }}
    >
      <Select.Trigger placeholder="Assign to User:" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggections</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users.map((user) => (
            <Select.Item value={user.id}>{user.name}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
