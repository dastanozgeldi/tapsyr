import type { NextPage } from "next";
import Page from "../components/Layout/Page";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";

const Home: NextPage = () => {
  return (
    <Page title="Home">
      <Hero />
      <Features />
    </Page>
  );
};

export default Home;
