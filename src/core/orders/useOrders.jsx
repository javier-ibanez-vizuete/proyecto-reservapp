import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { OrdersContext } from "../../contexts/OrdersContext";
import { useLoading } from "../../hooks/useLoading";
import { getOrdersApi, getOrdersByUserIdApi, postOrderApi } from "./orders.api";
import { saveOrdersInLocalStorage } from "./orders.service";

export const useOrders = () => {
    const { user } = useContext(AuthContext);
    const { setOrders } = useContext(OrdersContext);

    const loadingGetOrders = useLoading();
    const loadingPostOrders = useLoading();

    const getOrders = async () => {
        loadingGetOrders.setIsLoading(true);
        try {
            const orders = await getOrdersApi();
            if (!orders) throw console.error("No orders");
            setOrders(orders);
            saveOrdersInLocalStorage(orders);
        } catch (err) {
            console.error(err);
        } finally {
            loadingGetOrders.setIsLoading(false);
        }
    };

    const getOrdersByUserId = async (userId) => {
        loadingGetOrders.setIsLoading(true);
        try {
            const orders = await getOrdersByUserIdApi(userId);
            if (!orders) throw console.error("No orders");
            setOrders(orders);
            saveOrdersInLocalStorage(orders);
            return orders;
        } catch (err) {
            console.error(err);
        } finally {
            loadingGetOrders.setIsLoading(false);
        }
    };

    const postOrder = async (orderData) => {
        loadingPostOrders.setIsLoading(true);
        try {
            const postedOrder = await postOrderApi(orderData);
            if (!postedOrder) throw console.error("No Order Posted");
            const updatedOrders = await getOrdersByUserId(user?.id);

            if (!updatedOrders) throw console.error("Orders no Updated");
            setOrders(updatedOrders);
            saveOrdersInLocalStorage(updatedOrders);
            return updatedOrders;
        } catch (err) {
            console.error(err);
        }
        loadingPostOrders.setIsLoading(false);
    };

    return { getOrders, getOrdersByUserId, postOrder, loadingGetOrders, loadingPostOrders };
};
