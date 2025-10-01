import classNames from "classnames";
import { useContext, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import iconTrolly from "../assets/icons/icon-trolly-black.webp";
import iconTrollyWhite from "../assets/icons/icon-trolly-white.webp";
import { CartsContext } from "../contexts/CartsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

export const TrollyButton = ({ size = "md", variant = "circle", className = "" }) => {
    const { theme } = useContext(ThemeContext);
    const { cart } = useContext(CartsContext);
    const iconRef = useRef(null);
    const Navigate = useNavigate();

    useEffect(() => {
        if (cart?.items?.length) {
            const icon = iconRef?.current;
            icon.classList.add("animate-pulse");
            icon.style.animation = "glowPulse 2s ease-in-out infinite";

            const timer = setTimeout(() => {
                icon.classList.remove("animate-pulse");
                icon.style.animation = "none";
            }, 5000);
        }
    }, [cart?.items]);

    const totalItems = useMemo(() => {
        return cart?.items?.reduce((acc, item) => acc + item?.qty, 0 || 0);
    }, [cart?.items]);

    const sizeConfig = {
        xs: {
            icon: "w-6 h-6",
            indicator: "text-[10px]",
            position: "-top-1.5 right-1/2 translate-x-1/2",
        },
        sm: {
            icon: "w-8 h-8",
            indicator: "text-[12px]",
            position: "-top-1 right-1/2 translate-x-1/2",
        },
        md: {
            icon: "w-10 h-10",
            indicator: "text-[13px]",
            position: "-top-0.5 right-1/2 translate-x-1/2",
        },
        lg: {
            icon: "w-12 h-12",
            indicator: "text-[14px]",
            position: "-top-0.5 right-1/2 translate-x-1/2",
        },
        xl: {
            icon: "w-14 h-14",
            indicator: "text-[15px]",
            position: "top-0.5 right-1/2 translate-x-1/2",
        },
        "2xl": {
            icon: "w-15 h-15",
            indicator: "text-[16px]",
            position: "top-0.5 right-1/2 translate-x-1/2",
        },
    };

    const variantConfig = {
        circle: "rounded-full",
        square: "rounded-lg",
        rounded: "rounded-md",
    };

    const baseClasses = `relative inline-flex items-center justify-center shadow-lg overflow-hidden ${
        theme === "light" ? "bg-background" : "bg-background-dark"
    } text-gray-600 font-medium`;

    const currentSize = sizeConfig[size] || sizeConfig.md;
    const currentVariant = variantConfig[variant] || variantConfig.circle;

    const iconClasses = classNames(baseClasses, currentSize.icon, currentVariant, className);

    const indicatorClasses = classNames("absolute", currentSize.indicator, currentSize.position);

    return (
        <div
            className="relative inline-flex cursor-pointer transition-scale duration-300 ease-in-out lg:hover:scale-105"
            onClick={() => Navigate("/cart")}
        >
            <div className={iconClasses} ref={iconRef}>
                <ImageContainer>
                    <Image
                        className="object-fill"
                        imgSrc={theme === "light" ? iconTrolly : iconTrollyWhite}
                        alt="Icon of Trolly"
                    />
                </ImageContainer>
            </div>

            {cart && cart?.items && cart?.items?.length > 0 && (
                <span className={indicatorClasses} aria-label="Products Number">
                    {totalItems}
                </span>
            )}
        </div>
    );
};
