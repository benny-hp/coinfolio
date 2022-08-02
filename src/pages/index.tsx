import type { NextPage } from "next";
import Head from "next/head";

import CoinSearch from "../components/CoinSearch";
import Trending from "../components/Trending";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Coinfolio</title>
        <meta name="description" content="Crypto portfolio app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CoinSearch />
        <Trending />
      </main>
    </>
  );
};

export default Home;
