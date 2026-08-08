import { saveTheme } from "../models/ThemeModel";

export const applyTheme = (color) => {
  document.documentElement.style.setProperty("--primary-color", color);
  saveTheme(color);
};
