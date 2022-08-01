import axios, { AxiosError } from "axios";
import { GetCoinMarketData, Market } from "../types/coingecko";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/coins",
});

export async function coinMarketData() {
  return await api
    .get<Market[]>(
      "/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
    )
    .then((data) => data.data)
    .catch(() => {
      throw new Error("There was an error getting the coins");
    });
}
