import { Button } from "./Button";
import { Image } from "./Image";
import { ImageContainer } from "./ImageContainer";

export const ProductCard = ({
    productData = {},
    cardClassName = "",
    imgSize = "",
    handleIncreaseProduct,
    handleDecreaseProduct,
}) => {
    return (
        <article className={`flex flex-col items-center justify-between p-xl md:w-[200px] ${cardClassName}`}>
            <ImageContainer className={`${imgSize}`}>
                <Image imageData={productData?.productImage} alt={productData?.productImage.alt} />
            </ImageContainer>
            <h6>{productData.productName}</h6>
            <p>{productData.productDescription}</p>
            <h6>{productData.productPrice}€</h6>
            {!productData?.qty && (
                <Button className="btn-primary" onClick={() => handleIncreaseProduct(productData?.productId)}>
                    Añadir
                </Button>
            )}
            {productData?.qty > 0 && (
                <div className="flex self-stretch justify-between gap-lg">
                    <Button
                        className={`btn-primary`}
                        onClick={() => handleDecreaseProduct(productData?.productId)}
                    >
                        {`${productData?.qty === 1 ? "Eliminar" : "Restar"}`}
                    </Button>
                    <p>{productData?.qty}</p>
                    <Button
                        className={`btn-secondary`}
                        onClick={() => handleIncreaseProduct(productData?.productId)}
                    >
                        Aumentar
                    </Button>
                </div>
            )}
        </article>
    );
};
