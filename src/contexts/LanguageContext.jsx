import { createContext, useState } from "react";

const TEXTS = {
    en: {
        h1HomePage: "Home Page Title",

        homePageNavLabel: "HOME",
        bookingPageNavLabel: "BOOKING",
        ordersPageNavLabel: "ORDERS",
        menusPageNavLabel: "MENU",
        cartPageNavLabel: "TROLLY",
        userPageNavLabel: "PROFILE",

        signUpButton: "SIGN UP",
        logInButton: "LOG IN",
        logOutButton: "LOG OUT",
    },

    es: {},

    fr: {},

    it: {},

    de: {},

    zh: {},
};

const languages = {
    en: "English",
    es: "Español",
    fr: "Français",
    it: "Italiano",
    de: "Deutsch",
    zh: "中文（简体）",
};

export const LanguageContext = createContext({
    lang: "en",
    TEXTS,
    languages,
    getText: () => {},
    handleLang: () => {},
});

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState("en");

    const getText = (key) => {
        const selectedText = TEXTS[lang][key];
        if (!selectedText)
            return TEXTS[lang] && TEXTS[lang].noTextFound ? TEXTS[lang].noTextFound : "No text Found";
        return selectedText;
    };
    const handleLang = (lang = "en") => {
        setLang(lang);
    };

    return (
        <LanguageContext value={{ lang, TEXTS, languages, getText, handleLang }}>{children}</LanguageContext>
    );
};
