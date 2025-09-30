import classNames from "classnames";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LoadingButton } from "../Spinner/LoadingButton";
import { Image } from "../UI/Image";
import { ImageContainer } from "../UI/ImageContainer";

export const DeliveryProductItem = ({
    productData = {},
    className = "",
    verticalCard = true,
    imgSize = "w-20",
    isLoading,
    qty = null,
    onClick = () => {},
    handleDecrease = () => {},
    handleIncrease = () => {},
}) => {
    const { theme } = useContext(ThemeContext);

    return (
        <li>
            <article
                className={classNames(
                    `flex px-5 py-5 rounded-xl ${
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
                <div className="flex flex-1 flex-col gap-1">
                    <div className="flex flex-col gap-1">
                        <h3>{productData?.name}</h3>
                        <small>{productData.description}</small>
                        <h3>{productData.deliveryPrice} €</h3>
                    </div>
                    {!qty && (
                        <div>
                            <LoadingButton
                                variant="secondary"
                                loading={isLoading}
                                loadingText={"Añadiendo..."}
                                onClick={onClick}
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
                                loading={isLoading}
                                loadingText="Agregando..."
                                onClick={handleIncrease}
                                className="flex-1"
                            >
                                Agregar
                            </LoadingButton>
                            <LoadingButton
                                variant="secondary"
                                loading={isLoading}
                                loadingText={qty === 1 ? "Eliminando..." : "Restando..."}
                                onClick={handleDecrease}
                                className="flex-1"
                            >
                                {qty === 1 ? "Eliminar" : "Restar"}
                            </LoadingButton>
                        </div>
                    )}
                </div>
            </article>
        </li>
    );
};
