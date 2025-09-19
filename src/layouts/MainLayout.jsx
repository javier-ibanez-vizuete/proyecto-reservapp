import { useContext } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

export const MainLayout = ({ children }) => {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(AuthContext);

    return (
        <div
            className={`flex flex-col flex-1 divide-y ${
                theme === "light"
                    ? "bg-background-color text-text-color divide-text-color/50"
                    : "bg-background-color-dark text-text-color-dark divide-text-color-dark/50"
            }`}
        >
            <Navbar isLoggedIn={user ? true : false} user={user} />
            <main
                className={`flex-1 flex flex-col ${
                    theme === "light" ? "bg-background" : "bg-background-dark"
                }`}
            >
                {children}
            </main>
            <Footer />
        </div>
    );
};
