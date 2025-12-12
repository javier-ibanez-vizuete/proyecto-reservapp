import { createContext, useEffect, useMemo, useState } from "react";
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

    const valueContext = useMemo(() => ({ cart, setCart, cartSummary, setCartSummary }), [cart, cartSummary]);

    return <CartsContext value={valueContext}>{children}</CartsContext>;
};
