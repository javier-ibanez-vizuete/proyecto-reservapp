import { useCallback, useEffect, useMemo } from "react";
import { OrdersDateItem } from "../components/OrdersDateItem";
import { useOrders } from "../core/orders/useOrders";
import { normalizeId } from "../helpers/normalizeId";
export const UserOrdersSection = ({ userOrdersData = [] }) => {
    const { patchOrderDelivered } = useOrders();

    const pendingOrders = useMemo(
        () => userOrdersData.filter((order) => order?.status === "pending"),
        [userOrdersData]
    );

    const handledeliveredOrders = useCallback(async () => {
        try {
            for (const order of pendingOrders) {
                const normalizedOrder = normalizeId(order);
                console.log("orderId:", normalizedOrder.id);

                const orderDate = new Date(normalizedOrder?.createdAt);
                const now = new Date();

                const differenceMs = now - orderDate;
                console.log("diferencia en ms", differenceMs);
                const oneHourInMs = 60 * 60 * 1000;
                console.log(oneHourInMs);
                if (differenceMs < oneHourInMs) return;
                console.log("Paso el cortafuegos", normalizedOrder);
                await patchOrderDelivered(normalizedOrder.id);
            }
        } catch (err) {
            console.error("orders not updated");
        }
    }, [pendingOrders]);

    useEffect(() => {
        handledeliveredOrders();
    }, [userOrdersData]);

    return (
        <div className="flex flex-col gap-3">
            <OrdersDateItem title="Pending Orders" content={pendingOrders} isPendingOrders={true} />
            <OrdersDateItem title="Pedidos Realizados" content={userOrdersData} isPendingOrders={false} />
        </div>
    );
};
