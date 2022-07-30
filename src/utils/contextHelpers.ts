export function getInitialTheme(): Theme {
  if (typeof window !== "undefined" && window.localStorage) {
    // get theme mode
    const storedPreferences = window.localStorage.getItem(
      "color-theme"
    ) as Theme;
    // check if theme mode exist
    if (typeof storedPreferences === "string") return storedPreferences;

    // check if media is set to dark
    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) return "dark";
  }

  return "light";
}

export function rawSetTheme(theme: Theme) {
  const root = window.document.documentElement;
  const isDark = theme === "dark";

  // add class to root
  root.classList.remove(isDark ? "light" : "dark");
  root.classList.add(theme);

  // save to localStorage

  localStorage.setItem("color-theme", theme);
}
