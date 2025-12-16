import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AccordionProductsCart } from "../components/AccordionProductsCart";
import { CartSummaryCard } from "../components/CartSummaryCard";
import { Container } from "../components/Container";
import { ConfirmModal } from "../components/Modal/ConfirmModal";
import { SkeletonCard } from "../components/Skeleton";
import { ToastContainer } from "../components/ToastContainer";
import { Button } from "../components/UI/Button";
import { CartsContext } from "../contexts/CartsContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useCart } from "../core/cart/useCart";
import { useLoading } from "../hooks/useLoading";
import { useToast } from "../hooks/useToast";

function CartPage() {
    const [showModal, setShowModal] = useState(false);
    const { getCartSummary, deleteCartItem, postCartCheckout } = useCart();

    const { cart, cartSummary } = useContext(CartsContext);

    const { theme } = useContext(ThemeContext);
    const { getText } = useContext(LanguageContext);
    const location = useLocation();

    const { isLoading, setIsLoading } = useLoading();
    const loadingDelete = useLoading();
    const isLoading2 = useLoading();

    const { toasts, showToast, dismissToast } = useToast();
    const Navigate = useNavigate();

    const handleGetSummaryCart = useCallback(async () => {
        setIsLoading(true);
        try {
            await getCartSummary();
        } catch (err) {
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (cart && !loadingDelete.isLoading) handleGetSummaryCart();
    }, [cart.items]);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDeleteCart = useCallback(async () => {
        let productId;
        loadingDelete.setIsLoading(true);
        try {
            if (!cart?.items?.length) return;

            for (const product of cart.items) {
                productId = product.productId;
                await deleteCartItem(product.productId);
            }
            showToast(getText("toastCartRemovedSuccess"), "success", 1000);
        } catch (err) {
            console.error("No se ha podido eliminar el producto con id", productId);
            showToast(getText("toastCartRemovedError"), "error", 1000);
        } finally {
            loadingDelete.setIsLoading(false);
        }
    }, [cart]);

    const handleConfirmCart = useCallback(async () => {
        isLoading2.setIsLoading(true);
        try {
            await postCartCheckout();
        } catch (err) {
        } finally {
            isLoading2.setIsLoading(false);
            setShowModal(false);
        }
    }, []);

    if (isLoading)
        return (
            <div className="flex flex-col flex-1 py-6">
                <Container className="flex-1 gap-3">
                    <SkeletonCard showAvatar={false} textLines={1} />
                    <div
                        className={`flex flex-col gap-3 w-full mx-auto max-w-[600px] px-6 py-3 rounded-lg border border-gray-400 shadow-md ${
                            theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                        }`}
                    >
                        <SkeletonCard showAvatar={false} textLines={2} />
                        <SkeletonCard showAvatar={false} textLines={2} />
                        <SkeletonCard showAvatar={false} textLines={2} />
                        <SkeletonCard showAvatar={false} showText={false} showImage={true} />
                    </div>
                </Container>
            </div>
        );

    return (
        <div className="flex flex-col flex-1 py-6">
            <Container className="flex-1 gap-3">
                <ConfirmModal
                    isOpen={showModal}
                    onConfirm={handleConfirmCart}
                    onClose={handleCloseModal}
                    title={getText("confirmModalCartTitle")}
                    message={getText("confirmModalCartMessage")}
                    loadingText={getText("loadingConfirmButtonCartModal")}
                    confirmText={getText("confirmButtonCartModal")}
                    cancelText={getText("cancelButtonCartModal")}
                    variant="accent"
                    variantButton="primary"
                    showCloseButton={false}
                    loading={isLoading2.isLoading}
                    className={`${theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"}`}
                />
                <div>
                    <h1>{getText("h1CartPage")}</h1>
                </div>

                <div
                    className={`flex flex-col justify-between ${
                        cartSummary ? "gap-4" : ""
                    } w-full mx-auto max-w-[600px] px-6 py-3 rounded-lg border border-gray-400 shadow-md ${
                        theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                    }`}
                >
                    <AccordionProductsCart products={cart?.items} defaultOpen={null} />

                    {cart?.items?.length > 0 && cartSummary && (
                        <CartSummaryCard
                            cartSummary={cartSummary}
                            handleOpenModal={handleOpenModal}
                            handleDeleteCart={handleDeleteCart}
                            isLoading={loadingDelete.isLoading}
                        />
                    )}
                    {cart?.items?.length <= 0 && (
                        <div className="flex flex-col md:mx-auto">
                            <Button variant="primary" onClick={() => Navigate("/orders")}>
                                {getText("goToOrdersCartButton")}
                            </Button>
                        </div>
                    )}
                </div>
                <ToastContainer toasts={toasts} onClose={dismissToast} />
            </Container>
        </div>
    );
}

export default CartPage;
