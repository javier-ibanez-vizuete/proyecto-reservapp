import classNames from "classnames";
import { memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import iconArrowDownBlack from "../assets/icons/icon-arrow-down-black.webp";
import iconArrowDownWhite from "../assets/icons/icon-arrow-down-white.webp";
import { LanguageContext } from "../contexts/LanguageContext";
import { ProductsContext } from "../contexts/ProductsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useCart } from "../core/cart/useCart";
import { useProducts } from "../core/products/useProducts";
import { useDevice } from "../hooks/useDevice";
import { useLoading } from "../hooks/useLoading";
import { useToast } from "../hooks/useToast";
import { SkeletonCard } from "./Skeleton";
import { LoadingButton } from "./Spinner/LoadingButton";
import { ToastContainer } from "./ToastContainer";
import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

const AccordionProductsCartItem = memo(({ id, qty, defaultOpen = false }) => {
    const [product, setProduct] = useState(null);
    const { getProductsById } = useProducts();
    const { products } = useContext(ProductsContext);
    const { patchCartItem, deleteCartItem } = useCart();

    const [isOpen, setIsOpen] = useState(!!defaultOpen);
    const isLoading1 = useLoading();
    const isLoading2 = useLoading();
    const isLoading3 = useLoading();
    const isLoading4 = useLoading();
    const { isMobileXs, isMobileSm, isMobile } = useDevice();
    const { toasts, showToast, dismissToast } = useToast();

    const { theme } = useContext(ThemeContext);
    const { getText } = useContext(LanguageContext);

    const handleToggleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    const articleClasses = useMemo(
        () =>
            classNames(
                "flex flex-col p-4 md:p-6 break-all",
                {
                    "gap-4": isOpen,
                    "gap-0": !isOpen,
                },
                `rounded-xl cursor-pointer ${theme === "light" ? "bg-background" : "bg-background-dark"}`
            ),
        [isOpen, theme]
    );

    const iconClasses = useMemo(
        () =>
            classNames("rotate-0 transition-all duration-300 ease-in-out", {
                "rotate-180": isOpen,
                "rotate-0": !isOpen,
            }),
        [isOpen]
    );

    const containerClasses = useMemo(
        () =>
            classNames("grid overflow-hidden transition-all duration-300 ease-in-out", {
                "grid-rows-[1fr] opacity-100": isOpen,
                "grid-rows-[0fr] opacity-0": !isOpen,
            }),
        [isOpen]
    );

    const handleGetProductById = useCallback(() => {
        if (!products) return handleGetProductByIdOnError();
        const selectedProduct = products?.filter((product) => product.id === id)[0] || {};
        const newProduct = { ...selectedProduct, qty: qty };
        setProduct(newProduct);
    }, [products, id]);

    const handleGetProductByIdOnError = useCallback(async () => {
        isLoading1.setIsLoading(true);
        try {
            const product = await getProductsById(id);
            if (!product) return console.error("No hay producto");
            const newProduct = { ...product, qty: qty };
            setProduct(newProduct);
        } catch (err) {
            console.error("Esto trae error", err);
        } finally {
            isLoading1.setIsLoading(false);
        }
    }, []);

    const handleIncreaseProduct = useCallback(async (event) => {
        event.stopPropagation();
        isLoading2.setIsLoading(true);
        try {
            const newQty = { qty: qty + 1 };
            const updatedCart = await patchCartItem(id, newQty);
            if (updatedCart)
                return showToast(
                    getText("orders_page.toast_quantity_product_updated_to_cart"),
                    "success",
                    1000
                );
        } catch (err) {
            showToast(getText("orders_page.toast_error_quantity_product_updated_to_cart"), "error", 1000);
            console.error("no se ha modificado el producto", err);
        } finally {
            isLoading2.setIsLoading(false);
        }
    }, []);

    const handleDecreaseProduct = useCallback(async (event) => {
        event.stopPropagation();
        isLoading3.setIsLoading(true);
        try {
            if (qty === 1) return;
            const newQty = { qty: qty - 1 };
            const updatedCart = await patchCartItem(id, newQty);
            if (updatedCart)
                return showToast(
                    getText("orders_page.toast_quantity_product_updated_to_cart"),
                    "success",
                    1000
                );
        } catch (err) {
            if (qty > 1)
                showToast(getText("orders_page.toast_error_quantity_product_updated_to_cart"), "error", 1000);
            console.error("No se ha Modificado el producto", err);
        } finally {
            isLoading3.setIsLoading(false);
        }
    }, []);

    const handleRemoveProduct = useCallback(async (event) => {
        event.stopPropagation();
        isLoading4.setIsLoading(true);
        try {
            const updatedCart = await deleteCartItem(id);

            if (updatedCart)
                return showToast(getText("orders_page.toast_removed_product_from_cart"), "success", 1000);
        } catch (err) {
            console.error("No se ha elimnado el producto", err);
            showToast(getText("orders_page.toast_error_removing_product_from_cart"), "error", 1000);
        } finally {
            isLoading4.setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        handleGetProductById();
    }, [qty]);

    if (!product && !isLoading1) return null;

    if (isLoading1 && !product) return <SkeletonCard showAvatar={false} textLines={1} />;

    return (
        <article className={articleClasses} onClick={handleToggleOpen}>
            <header className="flex items-center">
                <div className={`flex flex-1 items-center ${isMobileXs ? "gap-2" : "gap-4"}`}>
                    <div className="flex items-center gap-0.5">
                        <h6>{getText(product.name)}</h6>
                    </div>
                    {!isMobileXs && (
                        <div className="flex items-center gap-0.5">
                            <small>x</small>
                            <p>{product.qty}</p>
                        </div>
                    )}
                </div>
                <div className={iconClasses}>
                    <ImageContainer className={isMobileXs ? "w-2" : "w-4"}>
                        <Image
                            src={theme === "light" ? iconArrowDownBlack : iconArrowDownWhite}
                            alt="Icon Arrow"
                        />
                    </ImageContainer>
                </div>
            </header>
            <div className={containerClasses}>
                <div className="flex flex-col gap-3 min-w-0 overflow-hidden">
                    <div className="flex items-center gap-1">
                        <h6>{getText("cart_page.accordion_qty_text")}</h6>
                        <p>{product.qty}</p>
                    </div>

                    {!isMobile && (
                        <div className="flex items-center gap-1">
                            <h6>{getText("cart_page.accordion_description_text")}</h6>
                            <p>{getText(product.description)}</p>
                        </div>
                    )}
                    <div className="flex items-center gap-1">
                        <h6>{getText("cart_page.accordion_price_text")}</h6>
                        <p>{product.deliveryPrice}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-0.5">
                            <LoadingButton
                                className="flex-1"
                                variant="primary"
                                onClick={handleIncreaseProduct}
                                loading={isLoading2.isLoading}
                                loadingText={getText(
                                    "orders_page.loading_text_adding_products_to_cart_button"
                                )}
                                size={isMobileSm ? "sm" : "md"}
                            >
                                {getText("orders_page.add_one_more_product_to_cart_button")}
                            </LoadingButton>
                            {qty > 1 && (
                                <LoadingButton
                                    className="flex-1"
                                    variant="primary"
                                    loading={isLoading3.isLoading}
                                    loadingText={getText(
                                        "orders_page.loading_text_removing_products_from_cart_button"
                                    )}
                                    size={isMobileSm ? "sm" : "md"}
                                    onClick={handleDecreaseProduct}
                                >
                                    {getText("orders_page.remove_one_more_product_from_cart_button")}
                                </LoadingButton>
                            )}
                        </div>
                        <LoadingButton
                            variant="danger"
                            onClick={handleRemoveProduct}
                            loading={isLoading4.isLoading}
                            loadingText={getText(
                                "orders_page.loading_text_removing_products_from_cart_button"
                            )}
                            size={isMobileSm ? "sm" : "md"}
                        >
                            {getText("orders_page.remove_product_to_cart_button")}
                        </LoadingButton>
                    </div>
                </div>
            </div>
            <ToastContainer toasts={toasts} onClose={dismissToast} />
        </article>
    );
});

export const AccordionProductsCart = ({ products = [], defaultOpen = 0 }) => {
    const { getText } = useContext(LanguageContext);

    const renderAccordionProductsCartItem = (product, index) => {
        return (
            <AccordionProductsCartItem
                key={product.productId}
                id={product.productId}
                qty={product.qty}
                defaultOpen={index === defaultOpen}
            />
        );
    };

    if (!products?.length) return <h3 className="text-gray-400">{getText("cart_page.no_products_title")}</h3>;

    return <div className="flex flex-col gap-3">{products.map(renderAccordionProductsCartItem)}</div>;
};
