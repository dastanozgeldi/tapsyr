import Head from "next/head";
import { PropsWithChildren } from "react";

type PageProps = PropsWithChildren & {
  title: string;
};

export const Page = ({ children, title }: PageProps) => {
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
