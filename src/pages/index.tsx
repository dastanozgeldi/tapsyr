import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Features from "../components/Features";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Home | Tapsyr</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Tapsyr
        </h1>
        <p className="text-2xl text-gray-700">
          ~ the only to do app you&apos;ll ever need
        </p>
        {session ? (
          <Link href="/tasks">
            <button>Go to Tasks</button>
          </Link>
        ) : (
          <button onClick={() => signIn()}>Get Started</button>
        )}
        <span className="absolute bottom-0 left-0 ml-4 mb-4">
          made with ❤️ by{" "}
          <a className="text-teal-400" href="https://dosek.xyz/">
            Dositan
          </a>
        </span>
        <Link href="#features">
          <div className="absolute bottom-0 right-0 mr-4 mb-4 flex items-center gap-2 cursor-pointer">
            features
            <ChevronDownIcon width={24} height={24} />
          </div>
        </Link>
      </main>
      <Features />
    </>
  );
};

export default Home;
