import classNames from "classnames";
import { useScroll } from "../../hooks/useScroll";
import { Image } from "./Image";
import { ImageContainer } from "./ImageContainer";

import iconArrow from "../../assets/icons/icon-arrow-top.png";

export const BackToTopButton = ({
    children,
    type = "button",
    placement = "top-right",
    size = "md",
    variant = "default",
    rounded = "lg",
    className = "",
    disabled = false,
    showAt = 800,
    onClick = () => {},
    ...props
}) => {
    const { scroll, scrollToTop } = useScroll();

    const showButton = scroll >= showAt;

    const baseClasses =
        "inline-flex justify-center opacity-90 hover:scale-105 hover:opacity-100 items-center font-medim transition-all duration-300 ease-in-out focus:outline-none cursor-pointer";

    const variantConfig = {
        default: "focus:ring-gray-900 shadow-lg",
        primary: "bg-primary-color text-text-color border border-primary-color focus:ring-gray-900 shadow-lg",
        secondary:
            "bg-secondary-color text-text-color border border-secondary-color focus:ring-secondary-color shadow-lg",
        outline: "bg-transparent text-text-color border border-gray-700 focus:ring-gray-500 shadow-lg",
        ghost: "bg-transparent text-text-color border-transparent hover:bg-gray-100 focus:ring-gray-500",
    };

    const roundedConfig = {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        xxl: "rounded-2xl",
        full: "rounded-full",
    };

    const sizeConfig = {
        sm: "px-3 py-1.5 text-base",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-sm",
        xl: "px-8 py-4 text-md",
        xxl: "px-10 py-5 text-md",
    };

    const placementConfig = {
        "top-full": ` ${showButton ? "top-2 left-0 right-0" : "-top-full left-0 right-0"}`,
        "top-left": ` ${showButton ? "top-2 left-2 xl:left-20 2xl:left-100" : "-left-full top-2"}`,
        "top-center": ` ${showButton ? "top-2 left-1/2 -translate-x-1/2" : "-left-full top-2"}`,
        "top-right": ` ${showButton ? "top-2 right-2 xl:right-10 2xl:right-100" : "-right-full top-2"}`,
        "left-center": ` ${showButton ? "top-1/2 left-2 -translate-y-1/2" : "-top-full left-2"}`,
        "center-center": ` ${
            showButton
                ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                : "top-1/2 -left-full -translate-y-1/2"
        }`,
        "right-center": ` ${
            showButton ? "top-1/2 right-2 -translate-y-1/2" : "top-1/2 -translate-y-1/2 -right-full"
        }`,
        "bottom-left": ` ${showButton ? "bottom-2 left-2 items-start" : "left-2 -bottom-full"}`,
        "bottom-center": ` ${
            showButton ? "bottom-2 left-1/2 -translate-x-1/2" : "-bottom-full left-1/2 -translate-x-1/2"
        }`,
        "bottom-right": ` ${showButton ? "bottom-2 right-2" : "-bottom-full right-2"}`,
    };

    const currentVariant = variantConfig[variant] || variantConfig.default;
    const currentRounded = roundedConfig[rounded] || roundedConfig.lg;
    const currentSize = sizeConfig[size] || sizeConfig.md;
    const currentPlacement = placementConfig[placement] || placementConfig["bottom-right"];

    const buttonClasses = classNames(
        baseClasses,
        currentVariant,
        currentRounded,
        currentSize,
        {
            "opacity-50 cursor-not-allowed pointer-events-none": disabled,
        },
        className
    );

    const containerClasses = classNames(
        "fixed flex justify-center items-center transition-all duration-900 ease-in-out z-50",
        currentPlacement
    );

    const handleClick = (event) => {
        event.preventDefault();
        scrollToTop();
        onClick?.();
    };

    return (
        <div className={containerClasses}>
            <button
                type={type}
                disabled={disabled}
                onClick={handleClick}
                className={buttonClasses}
                {...props}
            >
                {children || (
                    <ImageContainer className="w-8">
                        <Image imgSrc={iconArrow} />
                    </ImageContainer>
                )}
            </button>
        </div>
    );
};
