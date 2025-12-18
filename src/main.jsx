import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary.jsx";
import { PageError } from "./components/ErrorBoundary/PageError.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BookingsProvider } from "./contexts/BookingsContext.jsx";
import { CartsProvider } from "./contexts/CartsContext.jsx";
import { OrdersProvider } from "./contexts/OrdersContext.jsx";
import { ProductsProvider } from "./contexts/ProductsContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { UsersProvider } from "./contexts/UsersContext.jsx";
import "./styles/index.css";
import "./translations/i18n.js";

createRoot(document.getElementById("root")).render(
    // PONER ERROR BOUNDARY
    <BrowserRouter>
        <ErrorBoundary fallback={<PageError />}>
            <AuthProvider>
                <UsersProvider>
                    <BookingsProvider>
                        <ProductsProvider>
                            <CartsProvider>
                                <OrdersProvider>
                                    <ThemeProvider>
                                        <App />
                                    </ThemeProvider>
                                </OrdersProvider>
                            </CartsProvider>
                        </ProductsProvider>
                    </BookingsProvider>
                </UsersProvider>
            </AuthProvider>
        </ErrorBoundary>
    </BrowserRouter>
);
