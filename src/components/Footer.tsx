import React from "react";
import { FaGithub, FaLinkedinIn, FaHeart } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import ThemeToggle from "./ThemeToggle";

const Footer = () => {
  return (
    <footer className="rounded-div mt-8 pt-8 text-primary">
      <div className="flex justify-between">
        <div>
          <div className="flex justify-center items-center font-bold">
            <p>Made with</p> <FaHeart className="mx-1" /> <p>by:</p>
          </div>
          <a
            href="https://www.bennyhernandez.com/"
            className="py-2 hover:text-accent"
          >
            Benny Hernandez
          </a>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Developer Contact</p>
          <div className="flex py-3 justify-between">
            <a
              className="hover:text-accent"
              href="https://github.com/Nomad-Freedom"
            >
              <FaGithub size={20} />
            </a>
            <a
              className="hover:text-accent"
              href="https://www.linkedin.com/in/benny-hernandez/"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              className="hover:text-accent"
              href="mailto:inquiry@bennyhernandez.com"
            >
              <IoMdMail size={20} />
            </a>
          </div>
        </div>
      </div>
      <p className="text-center py-4">Powered by Coin Gecko</p>
    </footer>
  );
};

export default Footer;
