import type { NextPage } from "next";
import { Page } from "layouts/Page";
import { Hero } from "components/home/Hero";
import { Features } from "components/home/Features";

const Home: NextPage = () => {
  return (
    <Page title="Home">
      <Hero />
      <Features />
    </Page>
  );
};

export default Home;
