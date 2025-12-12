import { memo, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { Container } from "./Container";

export const Footer = memo(() => {
    const { theme } = useContext(ThemeContext);
    const { getText } = useContext(LanguageContext);

    return (
        <footer
            className={`flex flex-col py-6 ${
                theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
            }`}
        >
            <Container>
                <div className="flex flex-1 justify-center items-center text-center text-sm text-gray-500">
                    <p>
                        © {new Date().getFullYear()} {getText("copyrightText")}
                    </p>
                </div>
            </Container>
        </footer>
    );
});
