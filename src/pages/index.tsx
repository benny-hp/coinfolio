import type { NextPage } from "next";
import Head from "next/head";
import { useQuery } from "react-query";
import CoinSearch from "../components/CoinSearch";
import { coinMarketData } from "../services/coingecko.api";
import { Market } from "../types/coingecko";

const Home: NextPage = () => {
  const { data, error } = useQuery<Market[], Error>("coins", coinMarketData);

  return (
    <>
      <Head>
        <title>Coinfolio</title>
        <meta name="description" content="Crypto portfolio app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{data && <CoinSearch coins={data} />}</main>
    </>
  );
};

export default Home;
