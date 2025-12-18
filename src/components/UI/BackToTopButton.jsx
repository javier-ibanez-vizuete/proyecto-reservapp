import classNames from "classnames";
import { useScroll } from "../../hooks/useScroll";
import { Image } from "./Image";
import { ImageContainer } from "./ImageContainer";

import { useCallback, useMemo } from "react";
import iconArrow from "../../assets/icons/icon-arrow-top.png";
import { Button } from "./Button";

export const BackToTopButton = ({
    children,
    placement = "top-right",
    iconSize = "w-4",
    paddingSize = "sm",
    variant = "default",
    className = "",
    disabled = false,
    showAt = 800,
    onClick = () => {},
    ...props
}) => {
    const { scroll, scrollToTop } = useScroll();

    const showButton = useMemo(() => scroll >= showAt, [scroll, showAt]);

    const placementConfig = useMemo(
        () => ({
            "top-left": ` ${
                showButton
                    ? "top-17 left-1 xs:left-2 sm:left-4 lg:left-8 xl:left-[calc((100vw-1280px)/2+2rem)]"
                    : "-left-full top-17"
            }`,

            "top-right": ` ${
                showButton
                    ? "top-17 right-1 xs:right-2 sm:right-4 lg:right-8 xl:right-[calc((100vw-1280px)/2+2rem)]"
                    : "-right-full top-17"
            }`,
            "bottom-left": ` ${
                showButton
                    ? "bottom-17 left-1 xs:left-2 sm:left-4 lg:left-8 xl:left-[calc((100vw-1280px)/2+2rem)]"
                    : "-left-full bottom-17"
            }`,

            "bottom-right": ` ${
                showButton
                    ? "bottom-17 right-1 xs:right-2 sm:right-4 lg:right-8 xl:right-[calc((100vw-1280px)/2+2rem)]"
                    : "bottom-17 -right-full"
            }`,
        }),
        [showButton]
    );

    const currentPlacement = placementConfig[placement] || placementConfig["bottom-right"];

    const containerClasses = classNames(
        "fixed flex justify-center items-center transition-all duration-900 ease-in-out z-50 xl:max-w-[1280px]",
        currentPlacement
    );

    const handleClick = useCallback(
        (event) => {
            event.preventDefault();
            scrollToTop();
            onClick?.();
        },
        [scrollToTop]
    );

    return (
        <div className={containerClasses}>
            <Button
                disabled={disabled}
                size={paddingSize}
                variant={variant}
                className={className}
                onClick={handleClick}
                {...props}
            >
                {children || (
                    <ImageContainer size={iconSize}>
                        <Image src={iconArrow} />
                    </ImageContainer>
                )}
            </Button>
        </div>
    );
};
