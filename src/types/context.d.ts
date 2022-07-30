type Theme = "light" | "dark";

type ContextProps = {
  initialTheme: Theme;
  children: React.ReactNode;
};
