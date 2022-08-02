import axios, { AxiosError } from "axios";
import { GetCoinMarketData, Market, Trending } from "../types/coingecko";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

export async function coinMarketData() {
  return api
    .get<Market[]>(
      "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
    )
    .then((data) => data.data)
    .catch(() => {
      throw new Error("There was an error getting the coins");
    });
}

export async function coinTrending() {
  return api
    .get<Trending>("/search/trending")
    .then((data) => data.data)
    .catch(() => {
      throw new Error("There was an error getting the trending coins");
    });
}
