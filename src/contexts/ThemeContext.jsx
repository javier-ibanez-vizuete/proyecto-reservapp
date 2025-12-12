import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { getDataFromSessionStorage, saveDataInSessionStorage } from "../helpers/storage";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    const onToggleTheme = useCallback(() => {
        setTheme((prevValue) => {
            const newThemeValue = prevValue === "light" ? "dark" : "light";
            saveDataInSessionStorage("theme", newThemeValue);
            return newThemeValue;
        });
    }, []);

    useEffect(() => {
        const themeFromStorage = getDataFromSessionStorage("theme");
        if (themeFromStorage) setTheme(themeFromStorage);
    }, [theme]);

    const valueContext = useMemo(() => ({ theme, onToggleTheme }), [theme]);

    return <ThemeContext value={valueContext}>{children}</ThemeContext>;
};
