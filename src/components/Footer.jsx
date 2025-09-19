import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { Container } from "./Container";
import { LanguagesSelector } from "./LanguagesSelector";
import { ThemeButton } from "./UI/ThemeButton";

export const Footer = () => {
    const { lang, languages, handleLang } = useContext(LanguageContext);
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);

    return (
        <footer
            className={`flex flex-col py-6 ${
                theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
            }`}
        >
            <Container className="gap-2">
                <div className="flex justify-between items-center">
                    {!user && (
                        <div>
                            <ThemeButton />
                        </div>
                    )}
                    <small>Elementos Footer</small>
                    <LanguagesSelector />
                </div>
                <div className="flex flex-1 justify-center items-center text-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} Tipico Footer. All rights reserved</p>
                </div>
            </Container>
        </footer>
    );
};
