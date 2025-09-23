import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Image } from "../UI/Image";
import { ImageContainer } from "../UI/ImageContainer";

export const ProductItem = ({ productData = {}, className = "", imgSize = "" }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <article
            className={`flex ${
                theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
            } ${className}`}
        >
            {productData?.image && (
                <ImageContainer className={` ${imgSize}`}>
                    <Image className="rounded-2xl object-contain" imageData={productData?.image} />
                </ImageContainer>
            )}
            <div className="flex flex-1 self-center flex-col justify-between gap-4 lg:text-center lg:gap-2 lg:self-stretch">
                {productData?.name && <h3>{productData.name}</h3>}
                {productData?.description && <p className="opacity-60">{productData.description}</p>}
                {productData?.price && <h3>{productData.price}€</h3>}
                {productData?.categories && (
                    <ul className="flex items-center gap-1 lg:justify-center">
                        {productData.categories.map((category) => (
                            <li key={category}>
                                <small>{category}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </article>
    );
};
