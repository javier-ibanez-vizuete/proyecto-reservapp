import classNames from "classnames";
import React, { useContext, useMemo } from "react";
import iconEquisWhite from "../../../assets/icons/icon-equis-white.webp";
import iconEquis from "../../../assets/icons/icon-equis.webp";
import { Image } from "../../../components/UI/Image";
import { ImageContainer } from "../../../components/UI/ImageContainer";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useDevice } from "../../../hooks/useDevice";
import { AdminButton } from "./AdminButton";

/**
 * AdminInputSearch Component - Search input with clear button
 *
 * A customizable search input that follows the admin design system.
 * Auto-configures styling based on screen size when props are not provided.
 * Supports forwarding refs to the underlying input element.
 *
 * @component
 * @example
 * // Basic usage with ref
 * const inputRef = useRef(null);
 *
 * <AdminInputSearch
 *   ref={inputRef}
 *   labelText="Search"
 *   id="search"
 *   value={searchTerm}
 *   onChange={handleChange}
 *   onRemove={handleClear}
 * />
 */
export const AdminInputSearch = React.forwardRef(
    (
        {
            /**
             * Label text for the input
             */
            labelText = "",

            /**
             * Input name attribute
             */
            name,

            /**
             * Input id attribute
             */
            id,

            /**
             * Current value of the input
             */
            value = "",

            /**
             * Placeholder text
             */
            placeholder = "",

            /**
             * Change event handler
             */
            onChange = () => {},

            /**
             * KeyDown event handler
             */
            onKeyDown = () => {},

            /**
             * Clear button click handler
             */
            onRemove = () => {},

            /**
             * Color variant
             * @type {'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'background' | 'accent'}
             */
            variant,

            /**
             * Padding size
             * @type {'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default'}
             */
            padding,

            /**
             * Gap between elements
             * @type {'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default'}
             */
            gap,

            /**
             * Border radius
             * @type {'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default'}
             */
            rounded,

            /**
             * Additional CSS classes for input container
             */
            className = "",

            /**
             * Additional CSS classes for outer container
             */
            containerClassName = "",

            /**
             * Additional CSS classes for input
             */
            inputClassName = "",
        },
        ref
    ) => {
        const { theme } = useContext(ThemeContext);
        const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

        const containerBaseClasses = "flex";
        const baseClasses = "flex items-center transition-all duration-500 ease-in-out";
        const baseInputClasses = classNames("focus:outline-none focus:ring-2 focus:ring-offset-2", {
            "focus:ring-admin-text-color/50": theme === "light",
            "focus:ring-admin-text-color-dark/50": theme !== "light",
        });

        /**
         * Color variants for the input container
         */
        const variantsColor = {
            default: "bg-white border border-white/40 shadow-md lg:hover:shadow-lg text-admin-text-color!",
            primary:
                "border shadow-md/30 shadow-admin-primary-color bg-admin-primary-color border-admin-primary-color/90 lg:hover:bg-admin-primary-color/90 lg:hover:shadow-lg/30",
            secondary:
                "border shadow-md/30 shadow-admin-secondary-color bg-admin-secondary-color border-admin-secondary-color/90 lg:hover:bg-admin-secondary-color/90 lg:hover:shadow-lg/30",
            outline: classNames("border bg-transparent shadow-sm lg:hover:shadow-md", {
                "border-admin-text-color": theme === "light",
                "border-admin-text-color-dark": theme !== "light",
            }),
            ghost: "bg-transparent border-transparent lg:hover:bg-gray-200/20",
            background: classNames("border shadow-sm lg:hover:shadow-md", {
                "bg-admin-background border-admin-background/90 lg:hover:bg-admin-background/90":
                    theme === "light",
                "bg-admin-background-dark border-admin-background/90 lg:hover:bg-admin-background-dark/90":
                    theme !== "light",
            }),
            accent: classNames("border shadow-sm lg:hover:shadow-md", {
                "bg-admin-accent-background border-admin-accent-background/90 lg:hover:bg-admin-accent-background/90":
                    theme === "light",
                "bg-admin-accent-background-dark border-admin-accent-background-dark/90 lg:hover:bg-admin-accent-background-dark/90":
                    theme !== "light",
            }),
        };

        /**
         * Padding variants
         */
        const variantsPadding = {
            default: "p-sm",
            none: "p-0",
            xs: "p-xs",
            sm: "p-sm",
            md: "px-md py-sm",
            lg: "px-lg py-md",
            xl: "px-xl py-lg",
        };

        /**
         * Gap variants
         */
        const variantsGap = {
            default: "gap-sm",
            none: " ",
            xs: "gap-xs",
            sm: "gap-sm",
            md: "gap-md",
            lg: "gap-lg",
            xl: "gap-xl",
        };

        /**
         * Rounded variants
         */
        const variantsRounded = {
            default: "rounded-default",
            none: "rounded-0",
            xs: "rounded-xs",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
        };

        /**
         * Auto-configuration based on screen size and theme
         */
        const autoConfig = useMemo(
            () => ({
                containerGap: classNames({
                    "gap-xs": isMobile2Xs || isMobileXs,
                    "gap-sm": isMobileSm || isTablet || isDesktop,
                }),
                iconSize: classNames({
                    "w-sm": isMobile2Xs || isMobileXs || isMobileSm || isTablet,
                    "w-md": isDesktop,
                }),
                padding: classNames({
                    "px-sm py-xs": isMobile2Xs || isMobileXs,
                    "px-md py-sm": isMobileSm || isTablet || isDesktop,
                }),
                gap: classNames({
                    "gap-xs": isMobile2Xs || isMobileXs || isMobileSm,
                    "gap-sm": isTablet || isDesktop,
                }),
                rounded: classNames({
                    "rounded-sm": isMobile2Xs || isMobileXs,
                    "rounded-default": isMobileSm || isTablet || isDesktop,
                }),
                color: classNames("bg-transparent border shadow-sm lg:hover:shadow-md", {
                    "border-admin-text-color/90 lg:hover:bg-admin-text-color-dark": theme === "light",
                    "border-admin-text-color-dark/90 lg:hover:bg-admin-text-color": theme !== "light",
                }),
                placeholder: classNames({
                    "placeholder:text-admin-text-color": theme === "light",
                    "placeholder:text-admin-text-color-dark": theme !== "light",
                }),
            }),
            [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop, theme]
        );

        const currentContainerClasses = classNames(
            containerBaseClasses,
            autoConfig.containerGap,
            containerClassName
        );

        const currentClasses = classNames(
            baseClasses,
            variantsColor[variant] || autoConfig.color || variantsColor.default,
            variantsPadding[padding] || autoConfig.padding || variantsPadding.default,
            variantsGap[gap] || autoConfig.gap || variantsGap.default,
            variantsRounded[rounded] || autoConfig.rounded || variantsRounded.default,
            className
        );

        const currentInputClasses = classNames(baseInputClasses, autoConfig.placeholder, inputClassName);

        return (
            <div className={currentContainerClasses}>
                {labelText && <label htmlFor={id}>{labelText}</label>}
                <div className={currentClasses}>
                    <input
                        ref={ref}
                        type="text"
                        name={name}
                        id={id}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        className={currentInputClasses}
                        title={`Search - ${value}`}
                    />
                    {value && (
                        <AdminButton variant={"ghost"} onClick={onRemove} padding={"none"}>
                            <ImageContainer size={autoConfig.iconSize}>
                                <Image src={theme === "light" ? iconEquis : iconEquisWhite} />
                            </ImageContainer>
                        </AdminButton>
                    )}
                </div>
            </div>
        );
    }
);

AdminInputSearch.displayName = "AdminInputSearch";
