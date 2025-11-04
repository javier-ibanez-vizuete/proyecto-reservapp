import classNames from "classnames";
import { useContext, useMemo } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useDevice } from "../../hooks/useDevice";

/**
 * Modern checkbox component with smooth animations
 * Uses Tailwind CSS for styling and React hooks for state management
 *
 * @component
 * @example
 * <Checkbox />
 */
export const AdminCheckbox = ({
    isChecked,
    onClick,
    variant = "active",
    innerCircleBgColor,
    padding,
    height,
    innerCircleHeight,
    checkmarkHeight,
    verticalCheckmarkHeight,
    horizontalCheckmarkHeight,
    width,
    innerCircleWidth,
    checkmarkWidth,
    verticalCheckmarkWidth,
    horizontalCheckmarkWidth,
    className = "",
    disabled,
    ...props
}) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const { theme } = useContext(ThemeContext);

    const baseContainerClasses = "perfect-center";
    const baseButtonClasses = // overflow-hidden poner una vez terminada la prueba
        "relative rounded-full cursor-pointer shadow-md transition-all overflow-hidden duration-500 ease-in-out  hover:scale-105 active:scale-90";
    const baseInnerCircleClasses =
        "absolute top-1/2 left-1/2 rounded-full shadow-inner -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out";
    const baseCheckmarkClasses = "absolute left-1/2 -translate-x-1/2 rotate-[-50deg]";
    const baseVerticalCheckmarkClasses =
        "absolute left-0 bottom-0 rounded-sm opacity-0 translate-y-8 shadow-md transition-all duration-500 ease-in-out";
    const baseHorizontalCheckmarkClasses =
        "absolute left-0 bottom-0 rounded-sm opacity-0 translate-x-9 shadow-md transition-all duration-500 ease-in-out";

    const variantsConfig = {
        default: {
            classes: "bg-gray-400  border border-gray-500 shadow-sm hover:bg-gray-500/80 focus:ring-gray-900",
            hasHoverEffects: true,
            hasActiveEffects: true,
            shadowColor: null,
        },
        active: {
            classes: classNames("bg-gradient-to-tr hover:opacity-70", {
                "from-admin-primary-color via-[#0BABB0] to-admin-primary-hover": theme === "light",
                "from-admin-primary-color via-[#0A5A6E] to-admin-primary-hover": theme !== "light",
            }),
            hasHoverEffects: true,
            hasActiveEffects: true,
            shadowColor: null,
        },
        inactive: {
            classes: classNames("bg-gradient-to-tr opacity-70 hover:opacity-100", {
                "from-admin-secondary-color via-[#5ec1e8] to-admin-secondary-hover": theme === "light",
                "from-admin-secondary-color via-[#4cb0e8] to-admin-secondary-hover": theme !== "light",
            }),
            hasHoverEffects: true,
            hasActiveEffects: true,
            shadowColor: null,
        },
        primary: {
            classes:
                "bg-admin-primary-color border border-admin-primary-color/90 shadow-sm hover:bg-admin-primary-color/90 focus:ring-admin-primary-color",
            hasHoverEffects: true,
            hasActiveEffects: true,
            shadowColor: "hover:shadow-admin-primary-color/25",
        },
        secondary: {
            classes:
                "bg-admin-secondary-color border border-admin-secondary-color/90 shadow-sm hover:bg-admin-secondary-color/90 focus:ring-admin-secondary-color",
            hasHoverEffects: true,
            hasActiveEffects: true,
            shadowColor: "hover:shadow-admin-secondary-color/25",
        },
        outline: {
            classes: `bg-transparent border border-gray-500 shadow-sm hover:bg-gray-300 focus:ring-gray-500`,
            hasHoverEffects: true,
            hasActiveEffects: true,
            shadowColor: null,
        },
        ghost: {
            classes: "bg-transparent border-transparent hover:bg-gray-200/50 focus:ring-gray-500",
            hasHoverEffects: false,
            hasActiveEffects: false,
            shadowColor: null,
        },
        danger: {
            classes:
                "bg-error-600 text-white border border-error-500 shadow-md hover:bg-error-500 focus:ring-error-500",
            hasHoverEffects: true,
            hasActiveEffects: true,
            shadowColor: "hover:shadow-error-600/25",
        },
        none: {
            classes: "",
            hasHoverEffects: false,
            hasActiveEffects: true,
            shadowColor: null,
        },
    };

    const variantsInnerCircleBgColor = {
        default: "bg-white",
        background: "",
        accent: "",
        primary: "",
        secondary: "",
    };

    const variantsPadding = {
        default: "p-3",
        none: " ",
        "2xs": "p-1",
        xs: "p-2",
        sm: "p-3",
        md: "p-4",
        lg: "p-5",
        xl: "p-6",
    };

    const variantsHeight = {
        default: "h-6",
        none: " ",
        xs: "h-4.5",
        sm: "h-8",
        md: "h-10",
        lg: "h-14",
        xl: "h-18",
        "2xl": "",
        "4xl": "",
    };

    const variantsInnerCircleHeight = {
        default: "h-4.5",
        none: " ",
        xs: "h-3",
        sm: "h-6",
        md: "h-8",
        lg: "h-11",
        xl: "h-14",
        "2xl": "",
        "4xl": "",
    };

    const variantsCheckmarkHeight = {
        default: "h-1.5",
        none: " ",
        xs: "h-1",
        sm: "h-1.5",
        md: "h-1.5",
        lg: "h-2",
        xl: "h-2.5",
        "2xl": "",
        "4xl": "",
    };

    const variantsVerticalCheckmarkHeight = {
        default: "h-2",
        none: " ",
        xs: "h-1.5",
        sm: "h-2",
        md: "h-2.5",
        lg: "h-3.5",
        xl: "h-4",
        "2xl": "",
        "4xl": "",
    };

    const variantsHorizontalCheckmarkHeight = {
        default: "h-[3px]",
        none: " ",
        xs: "h-[2px]",
        sm: "h-[3px]",
        md: "h-1",
        lg: "h-1.5",
        xl: "h-1.5",
        "2xl": "",
        "4xl": "",
    };

    const variantsWidth = {
        default: "w-6",
        none: " ",
        xs: "w-4.5",
        sm: "w-8",
        md: "w-10",
        lg: "w-14",
        xl: "w-18",
        "2xl": "",
        "4xl": "",
    };

    const variantsInnerCircleWidth = {
        default: "w-4.5",
        none: " ",
        xs: "w-3",
        sm: "w-6",
        md: "w-8",
        lg: "w-11",
        xl: "w-14",
        "2xl": "",
        "4xl": "",
    };

    const variantsCheckmarkWidth = {
        default: "w-2.5",
        none: " ",
        xs: "w-3",
        sm: "w-2.5",
        md: "w-3",
        lg: "w-3.5",
        xl: "w-4",
        "2xl": "",
        "4xl": "",
    };

    const variantsVerticalCheckmarkWidth = {
        default: "w-[3px]",
        none: " ",
        xs: "w-[3px]",
        sm: "w-[3px]",
        md: "w-1",
        lg: "w-1.5",
        xl: "w-1.5",
        "2xl": "",
        "4xl": "",
    };

    const variantsHorizontalCheckmarkWidth = {
        default: "w-[13px]",
        none: " ",
        xs: "w-[13px]",
        sm: "w-4",
        md: "w-5.5",
        lg: "w-6.5",
        xl: "w-8",
        "2xl": "",
        "4xl": "",
    };

    const autoConfig = useMemo(
        () => ({
            innerCirlceBgColor: "bg-white",
            padding: classNames({
                "p-3": isMobile2Xs || isMobileXs || isMobileSm,
                "p-4": isTablet || isDesktop,
            }),
            height: classNames({
                "h-4": isMobile2Xs,
                "h-8": isMobileXs || isMobileSm,
                "h-10": isTablet || isDesktop,
            }),
            innerCircleHeight: classNames({
                "h-[11px]": isMobile2Xs && !isChecked,
                "h-5": isMobileXs || isMobileSm,
                "h-8": isTablet || isDesktop,
            }),
            checkmarkHeight: classNames({
                "h-1": isMobile2Xs,
                "h-1.5": isMobileXs || isMobileSm,
                "h-1.5": isTablet || isDesktop,
            }),
            verticalCheckmarkHeight: classNames({
                "h-1.5": isMobile2Xs,
                "h-2": isMobileXs || isMobileSm,
                "h-2.5": isTablet || isDesktop,
            }),
            horizontalCheckmarkHeight: classNames({
                "h-[2px]": isMobile2Xs,
                "h-[3px]": isMobileXs || isMobileSm,
                "h-1": isTablet || isDesktop,
            }),
            width: classNames({
                "w-4": isMobile2Xs,
                "w-8": isMobileXs || isMobileSm,
                "w-10": isTablet || isDesktop,
            }),
            innerCircleWidth: classNames({
                "w-[11px]": isMobile2Xs && !isChecked,
                "w-5": isMobileXs || isMobileSm,
                "w-8": isTablet || isDesktop,
            }),
            checkmarkWidth: classNames({
                "w-3": isMobile2Xs,
                "w-2.5": isMobileXs || isMobileSm,
                "w-3": isTablet || isDesktop,
            }),
            verticalCheckmarkWidth: classNames({
                "w-[3px]": isMobile2Xs,
                "w-[3px]": isMobileXs || isMobileSm,
                "w-1": isTablet || isDesktop,
            }),
            horizontalCheckmarkWidth: classNames({
                "w-[13px]": isMobile2Xs,
                "w-4": isMobileXs || isMobileSm,
                "w-5.5": isTablet || isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const currentVariant = variantsConfig[variant] || variantsConfig.default;

    const currentContainerClasses = classNames(
        baseContainerClasses,
        variantsPadding[padding] || autoConfig?.padding || variantsPadding.default,
        className
    );

    const currentButtonClasses = classNames(
        baseButtonClasses,
        currentVariant.classes,
        variantsHeight[height] || autoConfig?.height || variantsHeight.default,
        variantsWidth[width] || autoConfig?.width || variantsWidth.default,
        {
            "opacity-50 cursor-not-allowed pointer-events-none": disabled,
            "hover:shadow-lg": !disabled && currentVariant.hasHoverEffects,
            "active:scale-95 active:shadow-lg": !disabled && currentVariant.hasActiveEffects,
            [currentVariant.shadowColor]: !disabled && currentVariant.shadowColor,
        }
    );

    const currentInnerCircleClasses = classNames(
        baseInnerCircleClasses,
        variantsInnerCircleBgColor[innerCircleBgColor] ||
            autoConfig?.innerCirlceBgColor ||
            variantsInnerCircleBgColor.default,
        variantsInnerCircleHeight[innerCircleHeight] ||
            autoConfig?.innerCircleHeight ||
            variantsInnerCircleHeight.default,
        variantsInnerCircleWidth[innerCircleWidth] ||
            autoConfig?.innerCircleWidth ||
            variantsInnerCircleWidth.default,
        {
            "w-0! h-0!": isChecked,
        }
    );

    const currentCheckmarkClasses = classNames(
        baseCheckmarkClasses,
        variantsCheckmarkHeight[checkmarkHeight] ||
            autoConfig?.checkmarkHeight ||
            variantsCheckmarkHeight.default,
        variantsCheckmarkWidth[checkmarkWidth] || autoConfig?.checkmarkWidth || variantsCheckmarkWidth.default
    );

    const currentVerticalCheckmarkClasses = classNames(
        baseVerticalCheckmarkClasses,
        variantsInnerCircleBgColor[innerCircleBgColor] ||
            autoConfig?.innerCirlceBgColor ||
            variantsInnerCircleBgColor.default,
        variantsVerticalCheckmarkHeight[verticalCheckmarkHeight] ||
            autoConfig?.verticalCheckmarkHeight ||
            variantsVerticalCheckmarkHeight.default,
        variantsVerticalCheckmarkWidth[verticalCheckmarkWidth] ||
            autoConfig?.verticalCheckmarkWidth ||
            variantsVerticalCheckmarkWidth.default,
        {
            "opacity-100! translate-y-0!": isChecked,
        }
    );

    const currentHorizontalCheckmarkClasses = classNames(
        baseHorizontalCheckmarkClasses,
        variantsInnerCircleBgColor[innerCircleBgColor] ||
            autoConfig?.innerCirlceBgColor ||
            variantsInnerCircleBgColor.default,
        variantsHorizontalCheckmarkHeight[horizontalCheckmarkHeight] ||
            autoConfig?.horizontalCheckmarkHeight ||
            variantsHorizontalCheckmarkHeight.default,
        variantsHorizontalCheckmarkWidth[horizontalCheckmarkWidth] ||
            autoConfig?.horizontalCheckmarkWidth ||
            variantsHorizontalCheckmarkWidth.default,
        {
            "opacity-100! translate-x-0!": isChecked,
        }
    );

    return (
        <div className={currentContainerClasses}>
            <button
                onClick={onClick}
                className={currentButtonClasses}
                aria-label="Toggle checkbox"
                aria-checked={isChecked}
                role="checkbox"
                {...props}
            >
                {/* Inner white circle */}
                <div className={currentInnerCircleClasses} />

                {/* Checkmark */}
                <div className={currentCheckmarkClasses}>
                    {/* Vertical line of checkmark */}
                    <div className={currentVerticalCheckmarkClasses} />

                    {/* Horizontal line of checkmark */}
                    <div className={currentHorizontalCheckmarkClasses} />
                </div>
            </button>
        </div>
    );
};
