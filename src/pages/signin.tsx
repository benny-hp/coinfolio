import { NextPage } from "next";
import { signIn } from "next-auth/react";

const Signin: NextPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center max-w-[400px] mx-auto min-h-[72vh] px-4">
        <h1 className="text-2xl font-bold mb-4 ">Sign In</h1>
        <button
          onClick={() =>
            signIn("google", { callbackUrl: "/account", redirect: true })
          }
          className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
        >
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default Signin;
