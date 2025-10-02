import { createContext, useEffect, useState } from "react";
import { getOrdersFromLocalStorage } from "../core/orders/orders.service";

export const OrdersContext = createContext(null);

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const ordersFromStorage = getOrdersFromLocalStorage();
        if (ordersFromStorage) setOrders(ordersFromStorage);
    }, []);

    return <OrdersContext value={{ orders, setOrders }}>{children}</OrdersContext>;
};
