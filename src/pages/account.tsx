import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Head from "next/head";

import SaveCoins from "../components/SaveCoins";
import { getServerSession } from "../utils/getServerSession";

type Props = {
  data: Session;
};
const Account = ({ data }: Props) => {
  return (
    <>
      <Head>
        <title>Coinfolio | Account</title>
        <meta name="description" content="Crypto portfolio app" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-[1140px] mx-auto">
        <div className="flex justify-between items-center my-4 py-8 rounded-div">
          <div>
            <h1 className="text-2xl font-bold">Account</h1>
            <div>
              <p>Welcome, {data?.user?.name}</p>
            </div>
          </div>
          <div>
            <button
              className="border px-6 py-2 rounded-2xl shadow-lg hover:shadow-2xl"
              onClick={() => signOut({ callbackUrl: "/", redirect: true })}
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center my-12 py-8 rounded-div">
          <div className="w-full min-h-[300px] sm:min-h-[44vh]">
            <h1 className="text-2xl font-bold py-4">Watch List</h1>
            <SaveCoins />
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
      props: {
        data: null,
      },
    };
  }
  return {
    props: {
      data: session,
    },
  };
};

export default Account;
