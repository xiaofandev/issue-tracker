"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Avatar, DropdownMenu } from "@radix-ui/themes";

const Navbar = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];
  const currentPath = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="flex space-x-8 border-b border-b-gray-400 mb-4 px-4 h-12 items-center">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-4">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className={classNames({
                "text-zinc-500": currentPath != link.href,
                "hover:text-zinc-800 transition-colors": true,
                "text-zinc-900": currentPath == link.href,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {session && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session?.user?.image!}
              radius="full"
              fallback="?"
              size="2"
              className="hover:cursor-pointer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>{session.user?.name}</DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Logout</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
      {!session && <Link href="/api/auth/signin">Login</Link>}
    </nav>
  );
};

export default Navbar;
