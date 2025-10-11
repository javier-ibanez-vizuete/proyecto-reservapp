import classNames from "classnames";
import { useContext } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

export const MainLayout = ({ children }) => {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(AuthContext);

    const baseLayoutClasses = "flex flex-col flex-1 divide-y transition-colors duration-500 ease-in-out";

    return (
        <div
            className={classNames(baseLayoutClasses, {
                "text-text-color divide-text-color/50": theme === "light",
                "text-text-color-dark divide-text-color-dark/50": theme !== "light",
            })}
        >
            <Navbar isLoggedIn={user ? true : false} user={user} />
            <main
                className={`mt-16 flex-1 flex flex-col ${
                    theme === "light" ? "bg-background" : "bg-background-dark"
                }`}
            >
                {children}
            </main>
            <Footer />
        </div>
    );
};
