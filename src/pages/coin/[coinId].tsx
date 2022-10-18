import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { coinById } from "../../services/coingecko.api";
import { Coin } from "../../types/coingecko";
import { FaFacebook, FaGithub, FaReddit, FaTwitter } from "react-icons/fa";
import DOMPurify from "dompurify";
import { CircleLoader } from "react-spinners";

const Coin: NextPage = () => {
  const router = useRouter();
  const { data, error, isLoading, isError } = useQuery<Coin, Error>(
    ["coin", router.query.coinId],
    () => coinById(router.query.coinId as string),
    {
      enabled: !!router.query.coinId,
    }
  );
  if (isLoading) {
    return (
      <div className="rounded-div my-4 py-8 h-[85vh] flex items-center justify-center">
        <CircleLoader color="#2b6cb0" size={80} />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="rounded-div my-4 py-8 h-[85vh] flex  justify-center">
        <p className="text-red-500 font-bold text-xl">{error?.message}</p>
      </div>
    );
  }
  return (
    <div className="rounded-div my-4 py-8">
      <div className="flex py-8">
        <img className="w-20 mr-8" src={data?.image.large} alt={data?.id} />
        <div>
          <p className="text-3xl font-bold">{data?.name} price</p>
          <p>({data?.symbol.toUpperCase()} / USD)</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Price Stacks */}
        <div>
          <div className="flex justify-between">
            {data?.market_data?.current_price ? (
              <p className="text-3xl font-bold">
                ${data?.market_data?.current_price?.usd?.toLocaleString()}
              </p>
            ) : null}
            <p>7 Day</p>
          </div>
          <div>
            <Sparklines data={data?.market_data.sparkline_7d.price}>
              <SparklinesLine color="teal" />
            </Sparklines>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm ">Market Cap</p>
              {data?.market_data.market_cap ? (
                <p>${data?.market_data?.market_cap?.usd?.toLocaleString()}</p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm text-right">Volume (24h)</p>
              {data?.market_data.total_volume ? (
                <p>${data?.market_data?.total_volume?.usd?.toLocaleString()}</p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">24h High</p>
              {data?.market_data.high_24h ? (
                <p>${data?.market_data?.high_24h?.usd?.toLocaleString()}</p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm text-right">24h Low</p>
              {data?.market_data.low_24h ? (
                <p>${data?.market_data?.low_24h?.usd?.toLocaleString()}</p>
              ) : null}
            </div>
          </div>
        </div>
        {/* Market Stats */}

        <div>
          <p className="text-xl font-bold">Market Stats</p>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Market Rank</p>
              {data?.market_cap_rank}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Hashing Algorithm</p>
              <p>{data?.hashing_algorithm}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Trust Score</p>
              <p>{data?.liquidity_score.toFixed(2)}</p>
            </div>
          </div>
          {/* Price Change */}
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Price Change (24h)</p>
              {data?.market_data ? (
                <p>
                  {data?.market_data?.price_change_percentage_24h?.toFixed(2)}%
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (7d)</p>
              {data?.market_data ? (
                <p>{data.market_data.price_change_percentage_7d.toFixed(2)}%</p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (14d)</p>
              {data?.market_data ? (
                <p>
                  {data.market_data.price_change_percentage_14d.toFixed(2)}%
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Price Change (30d)</p>
              {data?.market_data ? (
                <p>
                  {data.market_data.price_change_percentage_30d.toFixed(2)}%
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (60d)</p>
              {data?.market_data ? (
                <p>
                  {data.market_data.price_change_percentage_60d.toFixed(2)}%
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (1y)</p>
              {data?.market_data ? (
                <p>{data.market_data.price_change_percentage_1y.toFixed(2)}%</p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-around p-8 text-accent">
            <FaTwitter />
            <FaFacebook />
            <FaReddit />
            <FaGithub />
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="py-4">
        <p className="text-xl font-bold">About {data?.name}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              data?.description ? data.description.en : ""
            ),
          }}
          className="bold-link"
        ></p>
      </div>
    </div>
  );
};

export default Coin;
