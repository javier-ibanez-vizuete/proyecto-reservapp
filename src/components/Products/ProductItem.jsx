import { memo, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Image } from "../UI/Image";
import { ImageContainer } from "../UI/ImageContainer";

export const ProductItem = memo(({ productData = {}, className = "" }) => {
    const { theme } = useContext(ThemeContext);
    const { getText } = useContext(LanguageContext);

    return (
        <article
            className={`flex flex-col justify-between p-sm rounded-default gap-xs xs:p-md xs:rounded-md xs:gap-sm md:gap-md xl:p-lg xl:rounded-lg xl:gap-lg ${
                theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
            } ${className}`}
        >
            {productData?.image && (
                <ImageContainer size="w-full">
                    <Image className="rounded-2xl" imageData={productData?.image} />
                </ImageContainer>
            )}
            <div className="flex flex-col flex-1 justify-between gap-xs">
                {productData?.name && <h4>{getText(productData.name)}</h4>}
                {productData?.description && <p className="opacity-60">{getText(productData.description)}</p>}
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
});
