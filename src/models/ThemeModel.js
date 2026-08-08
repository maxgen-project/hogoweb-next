import { themes } from "../config/themeConfig";

export const getDefaultTheme = () => {
  return localStorage.getItem("theme") || themes.blue;
};

export const saveTheme = (color) => {
  localStorage.setItem("theme", color);
};
