import classNames from "classnames";
import { useContext, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import iconTrolly from "../assets/icons/icon-trolly-black.webp";
import iconTrollyWhite from "../assets/icons/icon-trolly-white.webp";
import { CartsContext } from "../contexts/CartsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useDevice } from "../hooks/useDevice";
import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

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
            icon.style.animation = "glowPulse 2s ease-in-out infinite";

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
        "w-6 h-6": isMobile2Xs,
        "w-7 h-7": isMobileXs,
        "w-8 h-8": isMobileSm,
        "w-9 h-9": isTablet,
        "w-10 h-10": isDesktop,
    });

    const productsQuantityConfig = classNames({
        "text-[8px] -top-[3px]": isMobile2Xs,
        "text-[10px] -top-1": isMobileXs,
        "text-[12px] -top-1": isMobileSm,
        "text-[13px] -top-0.5": isTablet,
        "text-[13px] -top-0": isDesktop,
    });

    const variantConfig = {
        circle: "rounded-full",
        square: "rounded-lg",
        rounded: "rounded-md",
    };

    const baseClasses = classNames("relative perfect-center overflow-hidden bg-transparent");

    const currentVariant = variantConfig[variant] || variantConfig.circle;

    const iconClasses = classNames(baseClasses, iconTrollyConfig, currentVariant, className);

    const indicatorClasses = classNames("absolute right-1/2 translate-x-1/2", productsQuantityConfig);

    return (
        <div
            className="relative perfect-center cursor-pointer transition-scale duration-500 ease-in-out lg:hover:-translate-y-[2px]"
            onClick={() => Navigate("/cart")}
        >
            <div className={iconClasses} ref={iconRef}>
                <ImageContainer>
                    <Image
                        className="object-fill"
                        src={theme === "light" ? iconTrolly : iconTrollyWhite}
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
