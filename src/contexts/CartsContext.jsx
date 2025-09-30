import { createContext, useEffect, useState } from "react";
import { getCartsFromLocalStorage } from "../core/carts/carts.service";

export const CartsContext = createContext(null);

export const CartsProvider = ({ children }) => {
    const [carts, setCarts] = useState(null);

    useEffect(() => {
        const cartsFromStorage = getCartsFromLocalStorage();
        if (cartsFromStorage) setCarts(carts);
    }, []);

    return <CartsContext value={{ carts, setCarts }}>{children}</CartsContext>;
};
