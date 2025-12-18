import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import iconArrowDownBlack from "../assets/icons/icon-arrow-down-black.webp";
import iconArrowDownWhite from "../assets/icons/icon-arrow-down-white.webp";
import { ThemeContext } from "../contexts/ThemeContext";
import { useOrders } from "../core/orders/useOrders";
import { getDataFromSessionStorage, removeFromSessionStorage } from "../helpers/storage";
import { useLoading } from "../hooks/useLoading";
import { useToast } from "../hooks/useToast";
import { useTranslate } from "../translations/useTranslate";
import { ConfirmModal } from "./Modal/ConfirmModal";
import { Modal } from "./Modal/Modal";
import { ModalBody } from "./Modal/ModalBody";
import { ModalFooter } from "./Modal/ModalFooter";
import { ModalHeader } from "./Modal/ModalHeader";
import { ToastContainer } from "./ToastContainer";
import { Button } from "./UI/Button";
import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

const INITIAL_MODAL_INFO = {
    orderedAt: "",
    products: [
        {
            productName: "",
            productPrice: 0,
        },
    ],
    totalProducts: 0,
    total: 0,
};

export const OrdersDateItem = ({ title = "", content = [], isPendingOrders = false }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [messageDeleteModal, setMessageDeleteModal] = useState("");

    const [showInfoModal, setShowInfoModal] = useState(false);
    const [contentInfoModal, setContentInfoModal] = useState(INITIAL_MODAL_INFO);

    const [orderIdSelected, setOrderIdSelected] = useState("");

    const { isLoading, setIsLoading } = useLoading();
    const { patchOrderCancelled } = useOrders();

    const location = useLocation();
    const navigate = useNavigate();

    const { toast, showToast, dismissToast } = useToast();
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslate();

    const getDate = useCallback((fullDate) => {
        const date = fullDate?.split("T")[0];
        return date;
    }, []);

    const getTime = useCallback((fullDate) => {
        const hourDate = new Date(fullDate).getHours();
        const minutesDate = new Date(fullDate).getMinutes();

        const timeDate = `${hourDate}:${minutesDate === 0 ? minutesDate + "0" : minutesDate} `;
        return timeDate;
    }, []);

    const handleShowDeleteModal = useCallback((orderData) => {
        if (orderData) {
            const newMessage = `${t("orders_data.orders_data_info_modal_message")} ${orderData.total}€`;
            setMessageDeleteModal(newMessage);
            setOrderIdSelected(orderData?.id);
        }
        if (!orderData) setMessageDeleteModal("");
        setShowDeleteModal((prevValue) => !prevValue);
    }, []);

    const handleShowInfoModal = useCallback(
        (orderData) => {
            if (!orderData) setContentInfoModal(INITIAL_MODAL_INFO);
            if (orderData) {
                const productsInfo = orderData?.items?.map((product) => ({
                    productName: product.name,
                    productPrice: product.price,
                }));

                const totalItems = orderData?.items.reduce((acc, product) => acc + product.qty, 0);

                const newContentInfoModal = {
                    orderedAt: `${getDate(orderData?.createdAt)} - ${getTime(orderData?.createdAt)}`,
                    products: productsInfo,
                    totalProducts: totalItems,
                    total: orderData?.total,
                };

                setContentInfoModal(newContentInfoModal);
            }
            setShowInfoModal((prev) => !prev);
        },
        [getDate, getTime]
    );

    const handleCancelOrder = useCallback(async (orderIdSelected) => {
        setIsLoading(true);
        try {
            await patchOrderCancelled(orderIdSelected);
        } catch (err) {
            showToast(t("orders_data.toast_orders_data_error"), "error", 1000);
        } finally {
            setIsLoading(false);
            setShowDeleteModal(false);
            setOrderIdSelected("");
        }
    }, []);

    useEffect(() => {
        const fromCancelOrder =
            location?.pathname?.fromCancelOrder === true ||
            getDataFromSessionStorage("fromCancelOrder") === true;

        if (fromCancelOrder) {
            showToast(t("orders_data.toast_orders_data_success"), "success", 1000);
            navigate(location?.pathname, { replace: true, state: {} });
            removeFromSessionStorage("fromCancelOrder");
        }
    }, []);

    if (!content.length && isPendingOrders)
        return (
            <div className="flex flex-col gap-1">
                <h3>{title}</h3>
                <p className="opacity-80">{t("orders_data.orders_data_not_pending_orders_text")}</p>
            </div>
        );

    if (!content?.length && !isPendingOrders)
        return (
            <div className="flex flex-col gap-1">
                <h3>{title}</h3>
                <p className="opacity-80">{t("orders_data.orders_data_not_orders")}</p>
            </div>
        );

    return (
        <div onClick={(event) => event.stopPropagation()}>
            <ConfirmModal
                title={t("orders_data.orders_data_cancel_modal_title")}
                message={messageDeleteModal}
                isOpen={showDeleteModal}
                onClose={handleShowDeleteModal}
                confirmText={t("orders_data.orders_data_cancel_modal_title")}
                cancelText={t("orders_data.orders_data_cancel_modal_back_button")}
                loadingText={t("orders_data.loading_orders_data_cancel_button")}
                onConfirm={() => handleCancelOrder(orderIdSelected)}
                loading={isLoading}
                className={`${theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"}`}
                variant="accent"
                variantButton="danger"
                showCloseButton={false}
            />
            <Modal
                closeOnEscape={true}
                showCloseButton={false}
                isOpen={showInfoModal}
                onClose={() => handleShowInfoModal()}
                className={`${theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"}`}
            >
                <ModalHeader>{t("orders_data.orders_data_info_modal_title")}</ModalHeader>
                <ModalBody className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                        <p>{t("orders_data.orders_data_info_modal_creation_text")}</p>
                        <p>{contentInfoModal.orderedAt}</p>
                    </div>
                    <ul className="flex flex-col">
                        {contentInfoModal?.products.map((product, index) => (
                            <li key={`${product?.name}-${index}`} className="flex flex-col gap-2">
                                <div className="flex items-center gap-1">
                                    <p>{t("orders_data.orders_data_info_modal_product_text")}</p>
                                    <p>{product?.productName}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <p>{t("orders_data.orders_data_info_modal_price_text")}</p>
                                    <p>{product?.productPrice}€</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-1">
                        <p>{t("orders_data.orders_data_info_modal_total_products_text")}</p>
                        <p>{contentInfoModal?.totalProducts}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <p>{t("orders_data.orders_data_info_modal_total_count_text")}</p>
                        <p>{contentInfoModal?.total}€</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant="danger" onClick={() => handleShowInfoModal()}>
                        {t("orders_data.button_orders_data_infomodal_close_text")}
                    </Button>
                </ModalFooter>
            </Modal>
            <h3>{title}</h3>
            <ul className="flex flex-col gap-2 py-1 pr-1">
                {content?.map((order, index) => (
                    <li key={`${order.id}-${index}`} className="flex items-center justify-between gap-2">
                        <div
                            className="flex flex-1 items-center gap-2"
                            onClick={() => handleShowInfoModal(order)}
                        >
                            <p>{getDate(order?.createdAt)}</p>
                            <p>{getTime(order?.createdAt)}</p>
                        </div>
                        {!isPendingOrders && (
                            <ImageContainer className="w-3" onClick={() => handleShowInfoModal(order)}>
                                <Image src={theme === "light" ? iconArrowDownBlack : iconArrowDownWhite} />
                            </ImageContainer>
                        )}
                        {isPendingOrders && (
                            <Button size="sm" variant="danger" onClick={() => handleShowDeleteModal(order)}>
                                {t("orders_data.button_orders_data_info_cancel_text")}
                            </Button>
                        )}
                    </li>
                ))}
            </ul>
            <ToastContainer toasts={toast} onClose={dismissToast} />
        </div>
    );
};
