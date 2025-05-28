import Link from "next/link";
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
              className="text-zinc-500 hover:text-zinc-800"
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
