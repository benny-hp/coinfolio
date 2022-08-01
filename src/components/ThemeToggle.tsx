import React, { useContext } from "react";
import { HiSun, HiMoon } from "react-icons/hi";
import { ThemeContext, useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="p-2">
      {theme === "dark" ? (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setTheme("light")}
        >
          <HiSun className="text-primary text-2xl mr-2" /> Light Mode
        </div>
      ) : (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setTheme("dark")}
        >
          <HiMoon className="text-primary text-2xl mr-2" /> Dark Mode
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
