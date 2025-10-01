import { createContext, useEffect, useState } from "react";
import { getCartFromLocalStorage } from "../core/cart/cart.service";

export const CartsContext = createContext(null);

export const CartsProvider = ({ children }) => {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        const cartFromStorage = getCartFromLocalStorage();
        if (cartFromStorage) setCart(cartFromStorage);
    }, []);

    return <CartsContext value={{ cart, setCart }}>{children}</CartsContext>;
};
