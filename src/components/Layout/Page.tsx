import type { ReactNode } from "react";
import Head from "next/head";

const Page = ({ children, title }: { children: ReactNode; title: string }) => {
  const t = `${title} | Tapsyr`;

  return (
    <article>
      {title && (
        <Head>
          <title>{t}</title>
          <meta name="twitter:title" content={t} />
          <meta name="og:title" content={t} />
        </Head>
      )}
      {children}
    </article>
  );
};

export default Page;
