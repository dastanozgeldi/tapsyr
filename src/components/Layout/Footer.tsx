import { ChevronUpIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = ({ links }: { links: { href: string }[] }) => {
  const { pathname } = useRouter();

  const home = pathname === "/" ? "up" : "home";
  const items = links.map((link) => (
    <Link key={link.href} href={link.href}>
      {link.href}
    </Link>
  ));

  return (
    <footer id="footer" className="font-semibold py-4 grid gap-4 grid-cols-1 sm:grid-cols-3 items-center justify-items-center">
      <h1 className="text-3xl font-extrabold">Tapsyr</h1>
      <div className="flex gap-4 text-lg">{items}</div>
      <Link href="/">
        <div className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full hover:bg-gray-100 hover:duration-300">
          go {home} <ChevronUpIcon width={20} height={20} />
        </div>
      </Link>
    </footer>
  );
};

export default Footer;
