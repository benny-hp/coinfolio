import Link from "next/link";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { trpc } from "../utils/trpc";

const SaveCoins = () => {
  const { data: coins } = trpc.useQuery(["coin.getAll"]);
  const coinCtx = trpc.useContext();
  const { mutate } = trpc.useMutation(["coin.remove"], {
    async onMutate(variables) {
      await coinCtx.cancelQuery(["coin.getAll"]);

      const preCoins = coinCtx.getQueryData(["coin.getAll"]);

      coinCtx.setQueryData(["coin.getAll"], (old) => {
        if (old) {
          return [...old?.filter((coin) => coin.id !== variables.id)];
        }
        return [];
      });

      return { preCoins };
    },
    onError(_error, _variables, context) {
      coinCtx.setQueryData(["coin.getAll"], context?.preCoins || []);
    },
    onSettled() {
      coinCtx.invalidateQueries(["coin.getAll"]);
    },
  });

  const removeCoin = (id: string) => {
    mutate({ id });
  };

  return (
    <div>
      {coins?.length === 0 ? (
        <p>
          You don&apos;t have any coins saved. Please save a coin to add it your
          watch list.{" "}
          <Link href="/">
            <a>Click here to search coins.</a>
          </Link>
        </p>
      ) : (
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b">
              <th className="px-4">Rank #</th>
              <th className="text-left">Coin</th>
              <th className="text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {coins &&
              coins.map((coin, index) => (
                <tr key={index} className="h-[60px] overflow-hidden">
                  <td>{coin?.rank}</td>
                  <td>
                    <Link href={`/coin/${coin?.id}`}>
                      <a className="flex items-center">
                        <img className="w-8 mr-4" src={coin?.image} alt="/" />
                        <div>
                          <p className="hidden sm:table-cell">{coin?.name}</p>
                          <p className="text-left text-sm">
                            {coin?.symbol?.toUpperCase()}
                          </p>
                        </div>
                      </a>
                    </Link>
                  </td>
                  <td className="pl-8">
                    <AiOutlineClose
                      onClick={() => removeCoin(coin.id)}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SaveCoins;
