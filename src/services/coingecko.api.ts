import axios, { AxiosError } from "axios";
import { Coin, Market, Trending } from "../types/coingecko";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});
const apikey = `x_cg_demo_api_key=${process.env.NEXT_PUBLIC_COINGECKO_API}`;

export async function coinMarketData(page: number = 1) {
  return api
    .get<Market[]>(
      `/coins/markets?${apikey}&vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=true`
    )
    .then((data) => data.data)
    .catch(() => {
      throw new Error("There was an error getting the coins");
    });
}

export async function coinTrending() {
  return api
    .get<Trending>(`/search/trending?${apikey}`)
    .then((data) => data.data)
    .catch(() => {
      throw new Error("There was an error getting the trending coins");
    });
}

export async function coinById(id: string) {
  return api
    .get<Coin>(
      `/coins/${id}?${apikey}&localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
    )
    .then((data) => data.data)
    .catch(() => {
      throw new Error(`There was an error getting the coin by id: ${id}`);
    });
}
