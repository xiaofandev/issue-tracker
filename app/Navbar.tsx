"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

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
  console.log(currentPath);
  return (
    <nav className="flex space-x-8 border-b mb-4 px-4 h-12 items-center">
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
    </nav>
  );
};

export default Navbar;
