import { useCallback, useContext, useEffect, useMemo } from "react";
import { OrdersDateItem } from "../components/OrdersDateItem";
import { LanguageContext } from "../contexts/LanguageContext";
import { useOrders } from "../core/orders/useOrders";
import { normalizeId } from "../helpers/normalizeId";
export const UserOrdersSection = ({ userOrdersData = [] }) => {
    const { patchOrderDelivered } = useOrders();
    const { getText } = useContext(LanguageContext);

    const pendingOrders = useMemo(
        () => userOrdersData.filter((order) => order?.status === "pending"),
        [userOrdersData]
    );

    const handledeliveredOrders = useCallback(async () => {
        try {
            for (const order of pendingOrders) {
                const normalizedOrder = normalizeId(order);

                const orderDate = new Date(normalizedOrder?.createdAt);
                const now = new Date();

                const differenceMs = now - orderDate;
                const oneHourInMs = 60 * 60 * 1000;

                if (differenceMs < oneHourInMs) return;
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
            <OrdersDateItem
                title={getText("ordersDataTitle1")}
                content={pendingOrders}
                isPendingOrders={true}
            />
            <OrdersDateItem
                title={getText("ordersDataTitle2")}
                content={userOrdersData}
                isPendingOrders={false}
            />
        </div>
    );
};
