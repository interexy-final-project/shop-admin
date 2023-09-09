import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import en from "../src/lang/en.json";
import ru from "../src/lang/ru.json";

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ru"],
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
    detection: {
      order: [
        "navigator",
        "htmlTag",
        "cookie",
        "localstorage",
        "path",
        "subdomain",
      ],
    },
  })
  .catch((error) => {
    throw new Error(error);
  });

export default i18n;
