import { ChevronUpIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";

type FooterProps = {
  links: {
    href: string;
  }[];
};

export const Footer = ({ links }: FooterProps) => {
  const { pathname } = useRouter();

  const home = pathname === "/" ? "up" : "home";
  const items = links.map((link) => (
    <Link key={link.href} href={link.href}>
      {link.href}
    </Link>
  ));

  return (
    <footer
      id="footer"
      className="font-semibold py-4 grid gap-4 grid-cols-1 sm:grid-cols-3 items-center justify-items-center"
    >
      <h1 className="text-3xl font-extrabold">Tapsyr</h1>
      <div className="highlight flex gap-4 text-lg">{items}</div>
      <Link href="/">
        <a className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:duration-300">
          go {home} <ChevronUpIcon width={20} height={20} />
        </a>
      </Link>
    </footer>
  );
};
