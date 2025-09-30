import classNames from "classnames";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useCart } from "../../core/cart/useCart";
import { useLoading } from "../../hooks/useLoading";
import { useToast } from "../../hooks/useToast";
import { LoadingButton } from "../Spinner/LoadingButton";
import { ToastContainer } from "../ToastContainer";
import { Image } from "../UI/Image";
import { ImageContainer } from "../UI/ImageContainer";

export const DeliveryProductItem = ({
    productData = {},
    className = "",
    verticalCard = true,
    imgSize = "w-20",
    qty = null,
}) => {
    const { theme } = useContext(ThemeContext);

    const { postCartItem, patchCartItem, deleteCartItem } = useCart();

    const loading1 = useLoading();
    const loading2 = useLoading();

    const toast = useToast();

    const handleAddProduct = async (productData) => {
        loading1.setIsLoading(true);
        try {
            console.log("Haciendo click en HandleProduct", productData);
            const updatedCart = await postCartItem(productData.id);
            if (updatedCart) toast.showToast("Product Añadido", "success", 1500);
        } catch (err) {
            console.error("No se ha añadido el producto", err);
        } finally {
            loading1.setIsLoading(false);
        }
    };

    const handleIncreaseProduct = async (productsId, productQty) => {
        loading1.setIsLoading(true);
        try {
            const newQty = { qty: productQty + 1 };
            const updatedCart = await patchCartItem(productsId, newQty);
            if (updatedCart) return toast.showToast("Cantidad Modificada", "info", 2000);
        } catch (err) {
            console.error("no se ha modificado el producto", err);
        } finally {
            loading1.setIsLoading(false);
        }
    };

    const handleDecreaseProduct = async (productId, productQty) => {
        loading2.setIsLoading(true);
        try {
            if (productQty === 1) {
                const updatedCart = await deleteCartItem(productId);
                if (updatedCart) return toast.showToast("Product Eliminado", "error", 2000);
            }
            if (productQty !== 1) {
                const newQty = { qty: productQty - 1 };
                const updatedCart = await patchCartItem(productId, newQty);
                if (updatedCart) return toast.showToast("Cantidad Modificada", "info", 2000);
            }
        } catch (err) {
            console.error("No se ha Modificado el producto", err);
        } finally {
            loading2.setIsLoading(false);
        }
    };

    return (
        <li className="flex flex-col">
            <article
                className={classNames(
                    `flex flex-1 px-5 py-5 rounded-xl ${
                        theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                    }`,
                    { "flex-col": verticalCard },
                    className
                )}
            >
                <div className="perfect-center">
                    <ImageContainer className={imgSize}>
                        <Image className="rounded-xl" imageData={productData?.image} />
                    </ImageContainer>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-1">
                    <div className="flex flex-col gap-1">
                        <h3>{productData?.name}</h3>
                        <small>{productData.description}</small>
                        <h3>{productData.deliveryPrice} €</h3>
                    </div>
                    {!qty && (
                        <div className="flex flex-col justify-between">
                            <LoadingButton
                                variant="secondary"
                                loading={loading1.isLoading}
                                loadingText={"Añadiendo..."}
                                onClick={() => handleAddProduct(productData)}
                            >
                                Añadir al Carrito
                            </LoadingButton>
                        </div>
                    )}
                    {qty && (
                        <div className="flex flex-col justify-between gap-2">
                            <div className="perfect-center">
                                <h5>{qty}</h5>
                            </div>
                            <LoadingButton
                                variant="primary"
                                loading={loading1.isLoading}
                                loadingText="Agregando..."
                                onClick={() => handleIncreaseProduct(productData.id, qty)}
                                className="flex-1"
                            >
                                Agregar
                            </LoadingButton>
                            <LoadingButton
                                variant="secondary"
                                loading={loading2.isLoading}
                                loadingText={qty === 1 ? "Eliminando..." : "Restando..."}
                                onClick={() => handleDecreaseProduct(productData.id, qty)}
                                className="flex-1"
                            >
                                {qty === 1 ? "Eliminar" : "Restar"}
                            </LoadingButton>
                        </div>
                    )}
                </div>
                <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
            </article>
        </li>
    );
};
