import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { CircleLoader } from "react-spinners";
import { coinMarketData } from "../../services/coingecko.api";
import { usePageStore } from "../../store/page.store";
import { Market } from "../../types/coingecko";
import { trpc } from "../../utils/trpc";
import CoinItem from "./CoinItem";

const CoinSearch = () => {
  const [searchText, setSearchText] = useState("");
  const page = usePageStore((state) => state.page);
  const next = usePageStore((state) => state.next);
  const previous = usePageStore((state) => state.previous);
  const { status } = useSession();
  const { data: savedCoins, isLoading } = trpc.useQuery(["coin.getAll"], {
    enabled: status === "authenticated",
  });

  const {
    data: coins,
    error,
    isPreviousData,
    isLoading: isMarketLoading,
    isError,
  } = useQuery<Market[], Error>(["coins", page], () => coinMarketData(page), {
    keepPreviousData: true,
  });

  if (isError) {
    return (
      <div className="rounded-div my-4">
        <div className="flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right">
          <h1 className="text-2xl font-bold my-2">Search Crypto</h1>
          <form>
            <input
              type="text"
              placeholder="Search a coin"
              className="w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
        </div>
        <div className="h-[55vh] flex  justify-center">
          <p className="text-red-500 font-bold text-xl mt-3">
            {error?.message}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-div my-4">
      <div className="flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right">
        <h1 className="text-2xl font-bold my-2">Search Crypto</h1>
        <form>
          <input
            type="text"
            placeholder="Search a coin"
            className="w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
      </div>

      <table className="w-full border-collapse text-center">
        <thead>
          <tr className="border-b">
            <th></th>
            <th className="px-4">#</th>
            <th className="text-left">Coin</th>
            <th></th>
            <th>Price</th>
            <th>24h</th>
            <th className="hidden md:table-cell">24h Volume</th>
            <th className="hidden sm:table-cell">Mkt</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            coins &&
            coins
              .filter((value) => {
                if (searchText === "") return value;

                return value.name
                  .toLocaleLowerCase()
                  .includes(searchText.toLocaleLowerCase());
              })
              .map((coin) => {
                const saved = savedCoins?.find((c) => c.id === coin.id);

                return (
                  <CoinItem
                    coin={coin}
                    key={coin.id}
                    saved={!saved ? false : true}
                  />
                );
              })}
        </tbody>
      </table>
      {(isMarketLoading || isLoading) && (
        <div className="h-[60vh] flex items-center justify-center">
          <CircleLoader className="text-red-400" color="#2b6cb0" size={80} />
        </div>
      )}
      <div className="my-4">
        <span># {page}</span>
        <button
          className={`border ml-4 px-6 py-2 rounded-l-full ${
            page === 1
              ? "hover:shadow-none bg-gray-100 text-gray-800"
              : "hover:shadow-2xl"
          }`}
          onClick={previous}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button
          className={`border px-6 py-2 rounded-r-full ${
            coins?.length === 0
              ? "hover:shadow-none bg-gray-100"
              : "hover:shadow-2xl"
          }`}
          onClick={() => {
            if (!isPreviousData) {
              next();
            }
          }}
          disabled={coins?.length === 0}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default CoinSearch;
