import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BookingsProvider } from "./contexts/BookingsContext.jsx";
import { CartsProvider } from "./contexts/CartsContext.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import { LoaderProvider } from "./contexts/LoaderContext.jsx";
import { OrdersProvider } from "./contexts/OrdersContext.jsx";
import { ProductsProvider } from "./contexts/ProductsContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { UsersProvider } from "./contexts/UsersContext.jsx";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <LanguageProvider>
            <AuthProvider>
                <UsersProvider>
                    <BookingsProvider>
                        <ProductsProvider>
                            <CartsProvider>
                                <OrdersProvider>
                                    <LoaderProvider>
                                        <ThemeProvider>
                                            <App />
                                        </ThemeProvider>
                                    </LoaderProvider>
                                </OrdersProvider>
                            </CartsProvider>
                        </ProductsProvider>
                    </BookingsProvider>
                </UsersProvider>
            </AuthProvider>
        </LanguageProvider>
    </BrowserRouter>
);
