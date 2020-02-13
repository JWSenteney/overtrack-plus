import { renderToStaticMarkup } from "react-dom/server";

import en from "./en.json";

export const languages = [{ name: "English", code: "en" }];

export const translations = {
  en: { ...en }
};

export const translationOptions = {
  renderToStaticMarkup,
  renderInnerHtml: true,
  defaultLanguage: "en"
};
