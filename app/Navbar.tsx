"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { Skeleton } from "./component/Skeleton";

const Navbar = () => {
  return (
    <nav className="border-b border-b-gray-400 px-6 py-2">
      <Flex justify="between">
        <Flex align="center" gap="4">
          <Logo />
          <NavLinks />
        </Flex>
        <Box>
          <AuthStatus />
        </Box>
      </Flex>
    </nav>
  );
};

export default Navbar;

const Logo = () => {
  return (
    <Link href="/">
      <FaBug />
    </Link>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

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
  return (
    <ul className="flex space-x-4">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            href={link.href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <Skeleton width={40} height={20} />;
  }

  if (status === "unauthenticated") {
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );
  }

  if (status === "authenticated") {
    return (
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
    );
  }
};
