import { createContext, useEffect, useState } from "react";
import { getCartFromLocalStorage, getCartSummaryFromLocalStorage } from "../core/cart/cart.service";

export const CartsContext = createContext(null);

export const CartsProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [cartSummary, setCartSummary] = useState(null);

    useEffect(() => {
        const cartFromStorage = getCartFromLocalStorage();
        const cartSummaryFromStorage = getCartSummaryFromLocalStorage();
        if (cartFromStorage) setCart(cartFromStorage);
        if (cartSummaryFromStorage) setCartSummary(cartSummaryFromStorage);
    }, []);

    return <CartsContext value={{ cart, setCart, cartSummary, setCartSummary }}>{children}</CartsContext>;
};
