import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Hero = () => {
  const { data: session } = useSession();

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold">
        Tapsyr
      </h1>
      <p className="text-2xl text-center">
        ~ the only to do app you&apos;ll ever need
      </p>
      {session ? (
        <Link href="/tasks">
          <button>Go to Tasks</button>
        </Link>
      ) : (
        <button onClick={() => signIn()}>Get Started</button>
      )}
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        className="w-9 h-9 p-0 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {mounted && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5 text-gray-800 dark:text-gray-200"
          >
            {theme === "dark" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            )}
          </svg>
        )}
      </button>

      <div className="font-semibold">
        <span className="absolute top-[93vh] left-0 ml-4 mb-4 py-2">
          made with ❤️ by{" "}
          <a className="text-teal-400" href="https://dosek.xyz/">
            Dositan
          </a>
        </span>
        <Link href="#features">
          <div className="absolute top-[93vh] right-0 flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:duration-300">
            features
            <ChevronDownIcon width={24} height={24} />
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Hero;
