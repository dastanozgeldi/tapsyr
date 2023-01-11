import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ACTION_BUTTON } from "../../styles";

const Hero = () => {
  const { data: session } = useSession();

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[url(/reminder.svg)] bg-no-repeat bg-right-bottom bg-contain">
      <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold">
        Tapsyr
      </h1>
      <p className="text-2xl text-center">
        ~ the only to do app you&apos;ll ever need
      </p>
      {session ? (
        <Link href="/tasks">
          <button className={`${ACTION_BUTTON} my-8`}>Go to Tasks</button>
        </Link>
      ) : (
        <button className={`${ACTION_BUTTON} my-8`} onClick={() => signIn()}>
          Get Started
        </button>
      )}
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        className="w-9 h-9 p-0 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center hover:ring-2 ring-gray-300  transition-all"
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
          made with {theme === "light" ? "🖤" : "❤️"} by{" "}
          <a className="highlight" href="https://dosek.xyz/">
            Dastan
          </a>
        </span>
        <Link href="#features">
          <a className="absolute top-[93vh] right-0 flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">
            features
            <ChevronDownIcon width={24} height={24} />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
