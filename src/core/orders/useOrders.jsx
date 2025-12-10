import { useCallback, useContext } from "react";
import { replace, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { OrdersContext } from "../../contexts/OrdersContext";
import { saveDataInSessionStorage } from "../../helpers/storage";
import { useLoading } from "../../hooks/useLoading";
import {
    getOrdersApi,
    getOrdersByUserIdApi,
    patchOrderCancelledApi,
    patchOrderDeliveredApi,
    postOrderApi,
} from "./orders.api";
import { saveOrdersInLocalStorage } from "./orders.service";

export const useOrders = () => {
    const { user } = useContext(AuthContext);
    const { setOrders } = useContext(OrdersContext);

    const navigate = useNavigate();

    const loadingGetOrders = useLoading();
    const loadingPostOrders = useLoading();

    const getOrders = useCallback(async () => {
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
    }, [getOrdersApi]);

    const getOrdersByUserId = useCallback(
        async (userId) => {
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
        },
        [getOrdersByUserIdApi]
    );

    const postOrder = useCallback(
        async (orderData) => {
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
        },
        [postOrderApi]
    );

    const patchOrderDelivered = useCallback(
        async (orderId) => {
            try {
                const updatedOrder = await patchOrderDeliveredApi(orderId);
                if (!updatedOrder) return;
                setOrders((prevValue) => {
                    const restOrders = prevValue.filter((order) => order.id !== orderId);
                    const newOrders = [...restOrders];
                    saveOrdersInLocalStorage(newOrders);
                    return newOrders;
                });
                return updatedOrder;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        [patchOrderDeliveredApi]
    );

    const patchOrderCancelled = useCallback(
        async (orderId) => {
            try {
                const updatedOrder = await patchOrderCancelledApi(orderId);
                if (!updatedOrder) return;
                setOrders((prevValue) => {
                    const restOrders = prevValue.filter((order) => order.id !== orderId);
                    const newOrders = [...restOrders];
                    saveOrdersInLocalStorage(newOrders);
                    return newOrders;
                });

                navigate("/user", { state: { fromCancelOrder: true } }, replace);
                saveDataInSessionStorage("fromCancelOrder", true);
                return updatedOrder;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        [patchOrderCancelledApi]
    );

    return {
        getOrders,
        getOrdersByUserId,
        postOrder,
        patchOrderDelivered,
        patchOrderCancelled,
        loadingGetOrders,
        loadingPostOrders,
    };
};
