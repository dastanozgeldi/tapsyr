import type { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Footer } from "./Footer";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const links = [{ href: `/tasks` }, { href: "/donate" }];

  return (
    <main ref={parent}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Tapsyr is a note-trader app created to help students all around the world."
        />
        <meta name="author" content="Dastan Ozgeldi" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="twitter:title" content="Tapsyr - Do Your Job" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@dastanozgeldi" />
        <meta
          name="twitter:image"
          content="https://tapsyr.vercel.app/card.png"
        />
        <meta property="og:site_name" content="Tapsyr" />
        <meta name="og:title" content="Tapsyr - Do Your Job" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://tapsyr.vercel.app/card.png"
        />
        <title>Tapsyr - Do Your Job</title>
      </Head>
      {children}
      <Footer links={links} />
    </main>
  );
};
