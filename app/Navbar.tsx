"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import { useSession } from "next-auth/react";

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

      {session?.user?.email}
    </nav>
  );
};

export default Navbar;
