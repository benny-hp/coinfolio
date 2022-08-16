import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Market } from "../../types/coingecko";
import { trpc } from "../../utils/trpc";

type Props = {
  coin: Market;
  saved: boolean;
};

const CoinItem = ({ coin, saved }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [savedCoin, setSavedCoin] = useState(saved);
  const coinCtx = trpc.useContext();
  const { mutate: save } = trpc.useMutation(["coin.save"], {
    async onMutate() {
      // cancel ongoing refetches
      // await coinCtx.cancelQuery(["coin.getAll"]);

      setSavedCoin(true);
    },
    onSettled() {
      coinCtx.invalidateQueries("coin.getAll");
    },
  });
  const { mutate: remove } = trpc.useMutation(["coin.remove"], {
    async onMutate() {
      // await coinCtx.cancelQuery(["coin.getAll"]);

      setSavedCoin(false);
    },
    onSettled() {
      coinCtx.invalidateQueries("coin.getAll");
    },
  });
  const saveCoin = () => {
    if (session?.user) {
      if (!savedCoin) {
        save({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
        });
      }
      if (savedCoin) remove({ id: coin.id });
    } else {
      router.push("/signin");
    }
  };
  return (
    <tr className="h-[80px] border-b overflow-hidden">
      <td className="cursor-pointer" onClick={saveCoin}>
        {savedCoin ? (
          <AiFillStar className="text-orange-500" />
        ) : (
          <AiOutlineStar />
        )}
      </td>
      <td>{coin.market_cap_rank}</td>
      <td>
        <Link href={`/coin/${coin.id}`}>
          <a>
            <div className="flex items-center">
              <img
                className="w-6 mr-2 rounded-full"
                src={coin.image}
                alt={coin.id}
              />
              <p className="hidden sm:table-cell">{coin.name}</p>
            </div>
          </a>
        </Link>
      </td>
      <td>{coin.symbol.toUpperCase()}</td>
      <td>${coin.current_price.toLocaleString()}</td>
      <td>
        {coin.price_change_percentage_24h > 0 ? (
          <p className="text-green-600">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        ) : (
          <p className="text-red-600">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        )}
      </td>
      <td className="w-[180px] hidden md:table-cell">
        ${coin.total_volume.toLocaleString()}
      </td>
      <td className="w-[180px] hidden sm:table-cell">
        ${coin.market_cap.toLocaleString()}
      </td>
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color="teal" />
        </Sparklines>
      </td>
    </tr>
  );
};

export default CoinItem;
