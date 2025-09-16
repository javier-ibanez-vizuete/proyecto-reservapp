import { useContext } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/Navbar";
import { ThemeContext } from "../contexts/ThemeContext";

export const MainLayout = ({ children }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div
            className={`flex flex-col flex-1 divide-y ${
                theme === "light"
                    ? "bg-background-color text-text-color divide-text-color/50"
                    : "bg-background-color-dark text-text-color-dark divide-text-color-dark/50"
            }`}
        >
            <NavBar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
        </div>
    );
};
