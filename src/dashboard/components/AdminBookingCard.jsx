import classNames from "classnames";
import { useContext, useMemo } from "react";
import { Image } from "../../components/UI/Image";
import { ImageContainer } from "../../components/UI/ImageContainer";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UsersContext } from "../../contexts/UsersContext";
import {
    ICON_BABY_CHAIR_ACTIVE,
    ICON_BABY_CHAIR_INACTIVE,
    ICON_NOTES_ACTIVE,
    ICON_NOTES_INACTIVE,
} from "../../data/ICONS_DATA";
import { useDevice } from "../../hooks/useDevice";

export const AdminBookingCard = ({
    bookingData,
    onClick = () => {},
    variant,
    padding,
    articleGap,
    elementsGap,
    rounded,
    borderColor,
    iconsSize,
    className = "",
    ...props
}) => {
    const { users } = useContext(UsersContext);

    const { getText } = useContext(LanguageContext);
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const { theme } = useContext(ThemeContext);

    const formatTime = useMemo(() => {
        if (!bookingData?.scheduledFor) return;
        const date = bookingData?.scheduledFor.split(".")[0].replace("T", " ");
        return date;
    }, [bookingData?.scheduledFor]);

    const bookingName = useMemo(() => {
        if (!users || !users?.length) return;
        const userBookingId = bookingData?.userId;

        const userData = users.find((user) => {
            return (user?.id || user?._id) === userBookingId;
        });

        if (!userData) return;
        return userData?.name;
    }, [users, bookingData]);

    const baseArticleClasses =
        "flex flex-col items-center cursor-pointer transition-all duration-500 ease-in-out lg:hover:-translate-y-[2px]";
    const baseContentContainerClasses = "flex flex-col items-center";
    const baseIconsContainerClasses = "flex items-center";

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
        delayed: classNames(
            "bg-gradient-to-br from-error-400 to-error-500",
            "hover:from-error-500 hover:to-error-400"
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

    const variantsArticleGap = {
        default: "gap-sm",
        none: " ",
        xs: "gap-xs",
        sm: "gap-sm",
        md: "gap-md",
        lg: "gap-lg",
        xl: "gap-xl",
    };

    const variantsElementsGap = {
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

    const variantsIconSize = {
        "2xs": "w-4",
        xs: "w-6",
        sm: "w-8",
        md: "w-10",
        xl: "w-14",
        "2xl": "w-20",
        full: "w-full",
    };

    const autoConfig = useMemo(
        () => ({
            variant: classNames("bg-gradient-to-bl hover:bg-gradient-to-tr", {
                "from-admin-accent-background via-[#9cd4ec] to-admin-background": theme === "light",
                "from-admin-accent-background-dark via-[#103247] to-admin-background-dark": theme !== "light",
            }),
            padding: classNames({
                "p-sm": isMobile2Xs || isMobileXs,
                "p-md": isMobileSm || isTablet,
                "p-lg": isDesktop,
            }),
            articleGap: classNames({
                "gap-sm": isMobile2Xs || isMobileXs,
                "gap-md": isMobileSm || isTablet || isDesktop,
            }),
            elementsGap: classNames({
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
            iconSize: classNames({
                "w-6": isMobile2Xs || isMobileXs,
                "w-8": isMobileSm || isTablet,
                "w-10": isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop, theme]
    );

    const currentArticleClasses = classNames(
        baseArticleClasses,
        variantsConfig[variant] || autoConfig?.variant || variantsConfig.default,
        variantsPadding[padding] || autoConfig?.padding || variantsPadding.default,
        variantsArticleGap[articleGap] || autoConfig?.articleGap || variantsArticleGap.default,
        variantsRounded[rounded] || autoConfig?.rounded || variantsRounded.default,
        variantsBorder[borderColor] || autoConfig?.border || variantsBorder.default,
        className
    );

    const currentContentContainerClasses = classNames(
        baseContentContainerClasses,
        variantsElementsGap[elementsGap] || autoConfig?.elementsGap || variantsElementsGap.default
    );

    const currentIconsContainerClasses = classNames(
        baseIconsContainerClasses,
        variantsElementsGap[elementsGap] || autoConfig?.elementsGap || variantsElementsGap.default
    );

    const currentIconSizeClasses = classNames(
        variantsIconSize[iconsSize] || autoConfig?.iconSize || variantsIconSize.full
    );

    return (
        <article onClick={() => onClick(bookingData?.id)} className={currentArticleClasses} {...props}>
            <p className="font-bold">{formatTime}</p>
            <div className={currentContentContainerClasses}>
                <p>
                    {getText("adminBookingCardCustomersText")} <span>{bookingData?.partySize}</span>
                </p>
                <p className="lg:flex lg:flex-col">
                    {getText("adminBookingCardBookedByText")} <span>{bookingName}</span>
                </p>
            </div>

            <div className={currentIconsContainerClasses}>
                <ImageContainer size={currentIconSizeClasses} title={bookingData?.notes}>
                    <Image imageData={bookingData?.notes ? ICON_NOTES_ACTIVE : ICON_NOTES_INACTIVE} />
                </ImageContainer>
                <ImageContainer size={currentIconSizeClasses}>
                    <Image
                        imageData={
                            bookingData?.extras?.highChair ? ICON_BABY_CHAIR_ACTIVE : ICON_BABY_CHAIR_INACTIVE
                        }
                    />
                </ImageContainer>
            </div>
        </article>
    );
};
