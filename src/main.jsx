import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <LanguageProvider>
                <AuthProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </AuthProvider>
            </LanguageProvider>
        </BrowserRouter>
    </StrictMode>
);
