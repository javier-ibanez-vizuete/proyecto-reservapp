import classNames from "classnames";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useDevice } from "../../hooks/useDevice";
import { CTAContent } from "./CTAContent";
import { CTAImage } from "./CTAImage";

export const CTACard = ({
    title = "",
    description = "",
    buttonText = "",
    buttonHref = "#",
    imageSrc = "",
    variant = "default",
    imageAlt = "",
    imagePosition = "left",
    onButtonClick,
}) => {
    const { theme } = useContext(ThemeContext);
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const baseClasses = "shadow-md overflow-hidden transition-shadow duration-500 hover:shadow-xl";

    const variantBackgroundConfig = {
        default: "bg-white border-white/50 text-text-color",
        background: `${
            theme === "light"
                ? "bg-background border-background/50"
                : "bg-background-dark border-background-dark/50"
        }`,
        accent: `${
            theme === "light"
                ? "bg-accent-background border-accent-background/50"
                : "bg-accent-background-dark border-accent-background/50"
        }`,
    };

    const roundedConfig = classNames({
        "rounded-md": isMobile2Xs || isMobileXs || isMobileSm,
        "rounded-lg": isTablet || isDesktop,
    });

    const handleClick = (event) => {
        if (!onButtonClick) return;
        event.preventDefault();
        onButtonClick();
    };

    const isImageLeft = imagePosition === "left";
    const contentClass = isImageLeft ? "md:order-2" : "md:-order-2";
    const imageClass = isImageLeft ? "md:-order-2" : "md:order-2";
    const currentCardCn = classNames(
        baseClasses,
        variantBackgroundConfig[variant] || variantBackgroundConfig.accent,
        roundedConfig || "rounded-lg"
    );

    return (
        <article className={currentCardCn}>
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
