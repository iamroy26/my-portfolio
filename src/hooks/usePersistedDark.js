import { useState, useEffect } from "react";

const KEY = "portfolio-theme";

export function usePersistedDark(defaultDark = true) {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "light") return false;
      if (saved === "dark") return true;
    } catch {
    }
    return defaultDark;
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, dark ? "dark" : "light");
    } catch {
    }
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  return [dark, setDark];
}
