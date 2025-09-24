import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BookingsProvider } from "./contexts/BookingsContext.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import { ProductsProvider } from "./contexts/ProductsContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <LanguageProvider>
            <AuthProvider>
                <BookingsProvider>
                    <ProductsProvider>
                        <ThemeProvider>
                            <App />
                        </ThemeProvider>
                    </ProductsProvider>
                </BookingsProvider>
            </AuthProvider>
        </LanguageProvider>
    </BrowserRouter>
);
