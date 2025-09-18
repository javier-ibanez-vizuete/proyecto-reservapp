import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("light");

	const onToggleTheme = () => {
		setTheme((prevValue) => (prevValue === "light" ? "dark" : "light"));
	};

	return <ThemeContext value={{ theme, onToggleTheme }}>{children}</ThemeContext>;
};
