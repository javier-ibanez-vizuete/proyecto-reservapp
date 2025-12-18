import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useTranslate } from "../translations/useTranslate";
import { LoadingButton } from "./Spinner/LoadingButton";
import { Button } from "./UI/Button";

export const CartSummaryCard = ({ cartSummary, handleOpenModal, handleDeleteCart, isLoading }) => {
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslate();

    return (
        <div
            className={`flex flex-col gap-4 ${
                theme === "light" ? "bg-background" : "bg-background-dark"
            } p-4 md:p-6 flex-1 rounded-lg`}
        >
            <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-center gap-2">
                    <h6>Total Items</h6>
                    <small>{cartSummary.totalItems}</small>
                </div>
                <div className="flex items-center gap-2">
                    <h6>Subtotal</h6>
                    <small>
                        {cartSummary.subtotal}
                        <span className="ml-2">{cartSummary.currency}</span>
                    </small>
                </div>
                <div className="flex items-center gap-2">
                    <h6>taxRate</h6>
                    <small>{cartSummary.taxRate}</small>
                </div>
                <div className="flex items-center gap-2">
                    <h6>Total</h6>
                    <small>
                        {cartSummary.total}
                        <span className="ml-2">{cartSummary.currency}</span>
                    </small>
                </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
                <Button className="flex-1" variant="primary" onClick={handleOpenModal}>
                    {t("cart_page.button_cart_page_open_payment_modal")}
                </Button>
                <LoadingButton
                    className="flex-1"
                    variant="danger"
                    loading={isLoading}
                    loadingText="Borrando Carrito"
                    onClick={handleDeleteCart}
                >
                    {t("cart_page.button_cart_page_delete_cart")}
                </LoadingButton>
            </div>
        </div>
    );
};
