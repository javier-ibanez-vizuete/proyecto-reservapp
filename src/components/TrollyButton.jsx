import classNames from "classnames";
import { useContext, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CartsContext } from "../contexts/CartsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useDevice } from "../hooks/useDevice";
import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

import iconCartWhiteAvif from "../assets/icons/icons-cart/icon-cart-white.avif";
import iconCartWhite from "../assets/icons/icons-cart/icon-cart-white.png";
import iconCartWhiteWebp from "../assets/icons/icons-cart/icon-cart-white.webp";

import iconCartBlackAvif from "../assets/icons/icons-cart/icon-cart-black.avif";
import iconCartBlack from "../assets/icons/icons-cart/icon-cart-black.png";
import iconCartBlackWebp from "../assets/icons/icons-cart/icon-cart-black.webp";

const ICON_CART_DATA = {
    light: {
        url: iconCartBlack,
        webp: iconCartBlackWebp,
        avif: iconCartBlackAvif,
        alt: "Icon Cart Black",
    },

    dark: {
        url: iconCartWhite,
        webp: iconCartWhiteWebp,
        avif: iconCartWhiteAvif,
        alt: "Icon Cart White",
    },
};

export const TrollyButton = ({ variant = "circle", className = "" }) => {
    const { theme } = useContext(ThemeContext);
    const { cart } = useContext(CartsContext);
    const iconRef = useRef(null);
    const Navigate = useNavigate();

    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    useEffect(() => {
        if (cart?.items?.length) {
            const icon = iconRef?.current;
            if (!iconRef?.current) return;
            icon.classList.add("animate-pulse");
            icon.style.animation = "glowPulse 1s ease-in-out infinite";

            const timer = setTimeout(() => {
                icon.classList.remove("animate-pulse");
                icon.style.animation = "none";
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [cart?.items]);

    const totalItems = useMemo(() => {
        return cart?.items?.reduce((acc, item) => acc + item?.qty, 0 || 0);
    }, [cart?.items]);

    const iconTrollyConfig = classNames({
        "w-6 h-6 pb-[2px]": isMobile2Xs,
        "w-7 h-7 pb-[2px]": isMobileXs,
        "w-8 h-8 pb-[3px]": isMobileSm,
        "w-9 h-9 pb-[4px]": isTablet,
        "w-10 h-10 pb-1": isDesktop,
    });

    const productsQuantityConfig = classNames({
        "text-[8px] -top-[3px]": isMobile2Xs,
        "text-[10px] -top-[5px]": isMobileXs,
        "text-[12px] -top-[6px]": isMobileSm,
        "text-[13px] -top-[6px]": isTablet,
        "text-[13px] -top-1": isDesktop,
    });

    const variantConfig = {
        circle: "rounded-full",
        square: "rounded-lg",
        rounded: "rounded-md",
    };

    const baseClasses = classNames("relative perfect-center bg-transparent");

    const currentVariant = variantConfig[variant] || variantConfig.circle;

    const iconClasses = classNames(baseClasses, iconTrollyConfig, currentVariant, className);

    const indicatorClasses = classNames(
        "absolute backdrop-blur-2xs bg-transparent right-1/2 translate-x-1/2",
        productsQuantityConfig
    );

    return (
        <div
            className="relative perfect-center cursor-pointer transition-scale duration-500 ease-in-out lg:hover:-translate-y-[2px]"
            onClick={() => Navigate("/cart")}
        >
            <div className={iconClasses} ref={iconRef}>
                <ImageContainer>
                    <Image className="object-fill" imageData={ICON_CART_DATA[theme]} alt="Icon of Trolly" />
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
