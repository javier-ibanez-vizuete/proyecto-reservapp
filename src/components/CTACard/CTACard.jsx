import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CTAContent } from "./CTAContent";
import { CTAImage } from "./CTAImage";

export const CTACard = ({
    title = "",
    description = "",
    buttonText = "",
    buttonHref = "#",
    imageSrc = "",
    imageAlt = "",
    imagePosition = "right",
    onButtonClick,
}) => {
    const { theme } = useContext(ThemeContext);

    const handleClick = (event) => {
        if (!onButtonClick) return;
        event.preventDefault();
        onButtonClick();
    };

    const isImageLeft = imagePosition === "left";
    const contentClass = isImageLeft ? "md:order-2" : "";
    const imageClass = isImageLeft ? "md:order-1" : "";

    return (
        <article
            className={`${
                theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
            } rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300`}
        >
            <div className="grid grid-cols-1 md:grid-cols-2">
                <CTAImage src={imageSrc} alt={imageAlt} className={imageClass} />

                <CTAContent
                    title={title}
                    description={description}
                    buttonText={buttonText}
                    buttonHref={buttonHref}
                    onButtonClick={handleClick}
                    className={contentClass}
                />
            </div>
        </article>
    );
};
