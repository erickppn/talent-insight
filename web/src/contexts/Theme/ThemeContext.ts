import { createContext } from "react";

export type ThemeContextType = {
  darkTheme: boolean,
  setDarkTheme: (isActive: boolean) => void,
}

export const ThemeContext = createContext<ThemeContextType>(null!);