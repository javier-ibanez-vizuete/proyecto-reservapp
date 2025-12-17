import { useCallback, useEffect, useMemo } from "react";
import { OrdersDateItem } from "../components/OrdersDateItem";
import { useOrders } from "../core/orders/useOrders";
import { normalizeId } from "../helpers/normalizeId";
import { useTranslate } from "../translations/useTranslate";
export const UserOrdersSection = ({ userOrdersData = [] }) => {
    const { patchOrderDelivered } = useOrders();
    const { t } = useTranslate();

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
                title={t("orders_data.orders_data_title1")}
                content={pendingOrders}
                isPendingOrders={true}
            />
            <OrdersDateItem
                title={t("orders_data.orders_data_title2")}
                content={userOrdersData}
                isPendingOrders={false}
            />
        </div>
    );
};
