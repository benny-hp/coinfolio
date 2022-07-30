import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getInitialTheme, rawSetTheme } from "../utils/contextHelpers";

type ThemeContextType = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ initialTheme, children }: ContextProps) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // set there is a initial theme set theme
  if (initialTheme) rawSetTheme(initialTheme);

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
