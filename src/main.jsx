import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import { ProductsProvider } from "./contexts/productsContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <LanguageProvider>
            <AuthProvider>
                <ProductsProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ProductsProvider>
            </AuthProvider>
        </LanguageProvider>
    </BrowserRouter>
);
