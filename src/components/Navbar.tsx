import Link from "next/link";
import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { data: session } = useSession();

  const lockScroll = React.useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const unlockScroll = React.useCallback(() => {
    document.body.style.overflow = "";
  }, []);

  function handleNav() {
    if (!nav) {
      lockScroll();
    }
    if (nav) {
      unlockScroll();
    }
    setNav(!nav);
  }
  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold">
      <Link href="/">
        <a>
          <h1 className="text-2xl">CoinFolio</h1>
        </a>
      </Link>
      <div className="hidden md:block">
        <ThemeToggle />
      </div>
      {session?.user ? (
        <div>
          <Link href="/account">
            <a className="hidden md:inline p-4">Account</a>
          </Link>
          <button
            className="hidden md:inline bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl"
            onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="hidden md:block">
          <Link href="/signin">
            <a className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl">
              Sign In
            </a>
          </Link>
        </div>
      )}
      {/* Menu Icon */}
      <div className="block md:hidden cursor-pointer z-10" onClick={handleNav}>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      {/* Mobile Menu */}
      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10"
            : "fixed w-full bg-primary left-[100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300"
        }
      >
        <ul className="w-full p-4">
          <li className="border-b py-6">
            <Link href={"/"}>
              <a onClick={handleNav}>Home</a>
            </Link>
          </li>
          <li className="border-b py-6">
            <Link href={"/account"}>
              <a onClick={handleNav}>Account</a>
            </Link>
          </li>
          <li className="py-6">
            <ThemeToggle />
          </li>
        </ul>
        <div className="flex flex-col w-full p-4">
          {session?.user ? (
            <button
              className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
              onClick={() => signOut({ callbackUrl: "/", redirect: true })}
            >
              Sign Out
            </button>
          ) : (
            <Link href="/signin">
              <a onClick={handleNav}>
                <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">
                  Sign In
                </button>
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
