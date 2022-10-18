import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { coinTrending } from "../../services/coingecko.api";
import { Trending as TrendingInterface } from "../../types/coingecko";

const Trending = () => {
  const { data: trending, error: trendingError } = useQuery<
    TrendingInterface,
    Error
  >("coins-trending", coinTrending);

  return (
    <div className="rounded-div my-12 py-8 text-primary">
      <h1 className="text-2xl font-bold py-4">Trending Coins</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trending?.coins.map((coin) => {
          return (
            <Link key={coin.item.coin_id} href={`/coin/${coin.item.id}`}>
              <a>
                <div
                  key={coin.item.coin_id}
                  className="rounded-div flex justify-between p-4 hover:scale-105 ease-in-out duration-300"
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex">
                      <img
                        className="mr-4 rounded-full"
                        src={coin.item.small}
                        alt={coin.item.name}
                      />
                      <div>
                        <p className="font-bold">{coin.item.name}</p>
                        <p>{coin.item.symbol}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <img
                        className="w-4 mr-2"
                        src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                        alt="Bitcoin logo"
                      />
                      <p>{coin.item?.price_btc?.toFixed(7)}</p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
