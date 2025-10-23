import classNames from "classnames";
import { useContext, useMemo } from "react";
import { Avatar } from "../../components/Avatar";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useDevice } from "../../hooks/useDevice";

export const AdminUserCard = ({
    userData,
    onClick,
    variant,
    padding,
    gap,
    rounded,
    border,
    avatarSize,
    className = "",
    ...props
}) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const { theme } = useContext(ThemeContext);

    const handleClick = () => {
        if (!userData) return;
        onClick?.(userData?.id || userData?._id);
    };

    const baseClasses = "flex flex-1 flex-col items-center last:flex-none last:basis-auto cursor-pointer";

    const variantsConfig = {
        default: classNames("bg-gradient-to-br hover:bg-gradient-to-tr", {
            "from-admin-background to-admin-accent-background": theme === "light",
            "from-admin-background-dark to-admin-accent-background-dark": theme !== "light",
        }),
        accent: classNames("bg-gradient-to-tr hover:bg-gradient-to-br", {
            "from-admin-accent-background via-[#9cd4ec] to-admin-background": theme === "light",
            "from-admin-accent-background-dark via-[#103247] to-admin-background-dark": theme !== "light",
        }),
        primary: classNames(
            "bg-gradient-to-tr from-admin-primary-color to-admin-primary-hover",
            "hover:bg-gradient-to-r hover:from-admin-primary-hover hover:to-admin-primary-color"
        ),
        secondary: classNames(
            "bg-gradient-to-r from-admin-secondary-color to-admin-secondary-hover",
            "hover:bg-gradient-to-r hover:from-admin-secondary-hover hover:to-admin-secondary-color"
        ),
        success: classNames(
            "bg-gradient-to-br from-success-400 to-success-500",
            "hover:bg-gradient-to-lt hover:from-success-500 hover:to-success-400"
        ),
        warning: classNames(
            "bg-gradient-to-br from-warning-400 to-warning-500",
            "hover:bg-gradient-to-lt hover:from-warning-500 hover:to-warning-400"
        ),
        error: classNames(
            "bg-gradient-to-br from-error-400 to-error-500",
            "hover:bg-gradient-to-lt hover:from-error-500 hover:to-error-400"
        ),
    };

    const variantsPadding = {
        default: "p-sm",
        none: " ",
        xs: "p-xs",
        sm: "p-sm",
        md: "p-md",
        lg: "p-lg",
        xl: "p-xl",
    };

    const variantsGap = {
        default: "gap-sm",
        none: " ",
        xs: "gap-xs",
        sm: "gap-sm",
        md: "gap-md",
        lg: "gap-lg",
        xl: "gap-xl",
    };

    const variantsRounded = {
        default: "rounded-default",
        none: " ",
        xs: "rounded-xs",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
    };

    const variantsBorder = {
        default: classNames("border", {
            "border-gray-700/50": theme === "light",
            "border-gray-200/50": theme !== "light",
        }),
        accent: classNames("border", {
            "border-admin-accent-background/40": theme === "light",
            "border-admin-accent-background-dark/40": theme !== "light",
        }),
        primary: classNames("border", {
            "border-admin-primary-color/40": theme === "light",
            "border-admin-primary-color/20": theme !== "light",
        }),
        secondary: classNames("border", {
            "border-admin-secondary-color/40": theme === "light",
            "border-admin-secondary-color/20": theme !== "light",
        }),
        success: classNames("border", {
            "border-success-700/40": theme === "light",
            "border-success-200/20": theme !== "light",
        }),
        warning: classNames("border", {
            "border-warning-700/40": theme === "light",
            "border-warning-200/20": theme !== "light",
        }),
        error: classNames("border", {
            "border-error-700/40": theme === "light",
            "border-error-200/20": theme !== "light",
        }),
    };

    const variantsAvatarSize = {
        default: "w-full",
        xs: "w-20",
        sm: "w-28",
        md: "w-34",
        lg: "w-60",
        xl: "w-72",
    };

    const autoConfig = useMemo(
        () => ({
            padding: classNames({
                "p-xs": isMobile2Xs || isMobileXs,
                "p-sm": isMobileSm || isTablet,
                "p-md": isDesktop,
            }),
            variant: classNames("bg-gradient-to-bl hover:bg-gradient-to-tr", {
                "from-admin-accent-background via-[#9cd4ec] to-admin-background": theme === "light",
                "from-admin-accent-background-dark via-[#103247] to-admin-background-dark": theme !== "light",
            }),
            gap: classNames({
                "gap-xs": isMobile2Xs || isMobileXs,
                "gap-sm": isMobileSm || isTablet,
                "gap-md": isDesktop,
            }),
            rounded: classNames({
                "rounded-xs": isMobile2Xs || isMobileXs,
                "rounded-default": isMobileSm || isTablet,
                "rounded-md": isDesktop,
            }),
            border: classNames("border", {
                "border-admin-text-color/40": theme === "light",
                "border-admin-text-color-dark/40": theme !== "light",
            }),
            avatarSize: classNames({
                "w-32": isMobile2Xs || isMobileXs,
                "w-40": isMobileSm,
                "w-28": isTablet,
                "w-30": isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop, theme]
    );

    const currentClasses = classNames(
        baseClasses,
        variantsConfig[variant] || autoConfig?.variant || variantsConfig.default,
        variantsPadding[variant] || autoConfig?.padding || variantsPadding.default,
        variantsGap[gap] || autoConfig?.gap || variantsGap.default,
        variantsRounded[rounded] || autoConfig?.rounded || variantsRounded.default,
        variantsBorder[border] || autoConfig?.border || variantsBorder.default
    );

    const currentAvatarSizeClasses = classNames(
        variantsAvatarSize[avatarSize] || autoConfig?.avatarSize || variantsAvatarSize.default
    );

    return (
        <article className={currentClasses} onClick={handleClick} {...props}>
            <div className="perfect-center">
                <Avatar
                    avatar={userData?.avatar}
                    alt={userData?.avatar?.alt}
                    size="2xl"
                    fallback={userData?.name}
                    online={userData?.isActive}
                />
            </div>

            <small className="font-medium whitespace-nowrap">{userData?.name}</small>
            <small>
                Role:<span>{userData?.role}</span>
            </small>
        </article>
    );
};
