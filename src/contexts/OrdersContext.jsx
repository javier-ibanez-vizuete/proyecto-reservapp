import { createContext, useEffect, useMemo, useState } from "react";
import { getOrdersFromLocalStorage } from "../core/orders/orders.service";

export const OrdersContext = createContext(null);

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const ordersFromStorage = getOrdersFromLocalStorage();
        if (ordersFromStorage) setOrders(ordersFromStorage);
    }, []);

    const valueContext = useMemo(() => ({ orders, setOrders }), [orders]);

    return <OrdersContext value={valueContext}>{children}</OrdersContext>;
};
