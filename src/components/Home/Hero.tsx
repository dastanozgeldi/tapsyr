import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

const Hero = () => {
  const { data: session } = useSession();

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

      <div className="font-semibold">
        <span className="absolute top-[93vh] left-0 ml-4 mb-4 py-2">
          made with ❤️ by{" "}
          <a className="text-teal-400" href="https://dosek.xyz/">
            Dositan
          </a>
        </span>
        <Link href="#features">
          <div className="absolute top-[93vh] right-0 flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full hover:bg-gray-100 hover:duration-300">
            features
            <ChevronDownIcon width={24} height={24} />
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Hero;
