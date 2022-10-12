import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }: { children: JSX.Element }) {
  const [darkTheme, setDarkTheme] = useState(JSON.parse(localStorage.getItem("ti-theme") || 'false'));

  useEffect(() => {
    localStorage.setItem("ti-theme", JSON.stringify(darkTheme))
  }, [darkTheme]);

  return (
    <ThemeContext.Provider value={{
      darkTheme,
      setDarkTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}