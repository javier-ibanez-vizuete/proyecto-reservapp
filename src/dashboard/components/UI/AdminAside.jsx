import classNames from "classnames";
import { useContext, useMemo } from "react";
import { LoadingButton } from "../../../components/Spinner/LoadingButton";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useAuth } from "../../../core/auth/useAuth";
import { ASIDE_DATA } from "../../../data/ASIDE_DATA";
import { useDevice } from "../../../hooks/useDevice";
import { useLoading } from "../../../hooks/useLoading";
import { useWindowWidth } from "../../../hooks/useWindowWidth";
import { AdminAccordion } from "../AdminAccordion";

export const AdminAside = ({ isAsideOpen, bgColor, className = "" }) => {
    const loaderLogout = useLoading();
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const width = useWindowWidth();

    const { getText } = useContext(LanguageContext);
    const { theme } = useContext(ThemeContext);
    const { logout } = useAuth();

    const baseClasses =
        "fixed w-0 flex flex-col left-0 bottom-0 z-20 overflow-hidden transition-all duration-500 ease-in-out lg:flex-1 lg:relative lg:bottom-auto lg:left-auto";

    const autoAsideConfig = useMemo(
        () => ({
            padding: classNames({
                "p-xs": isMobile2Xs && isAsideOpen,
                "p-sm": isMobileXs && isAsideOpen,
                "p-md": isMobileSm && isAsideOpen,
                "p-lg": isTablet && isAsideOpen,
                "py-lg pr-md": isDesktop && isAsideOpen,
                "p-0": !isAsideOpen,
            }),
            bg: classNames({
                "bg-admin-accent-background": theme === "light",
                "bg-admin-accent-background-dark": theme !== "light",
            }),
            borderLine: classNames({
                "border-r-admin-text-color": theme === "light",
                "border-r-admin-text-color-dark": theme !== "light",
                "border-r": isAsideOpen,
                "border-r-0": !isAsideOpen,
            }),
            width: classNames({
                "w-1/2":
                    (isMobile2Xs && isAsideOpen) ||
                    (isMobileXs && isAsideOpen) ||
                    (isMobileSm && isAsideOpen),
                "w-1/3": isTablet && isAsideOpen,
                "w-0": !isAsideOpen,
            }),
            top: classNames({
                "top-14": isMobile2Xs,
                "top-15": isMobileXs,
                "top-16": isMobileSm,
                "top-17": isTablet,
                "top-auto": isDesktop,
            }),
        }),
        [width, isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop, theme, isAsideOpen]
    );

    const currentAsideClasses = classNames(
        baseClasses,
        autoAsideConfig.borderLine,
        bgColor || autoAsideConfig.bg,
        autoAsideConfig.padding,
        autoAsideConfig.width,
        autoAsideConfig.top || "top-14 lg:top-auto",
        className
    );

    const handleLogout = async () => {
        try {
            loaderLogout.setIsLoading(true);
            await logout();
        } catch (err) {
        } finally {
            loaderLogout.setIsLoading(false);
        }
    };

    return (
        <aside className={currentAsideClasses}>
            <div className="flex overflow-hidden flex-1 flex-col justify-between">
                <AdminAccordion contents={ASIDE_DATA} defaultOpen={null} />
                <LoadingButton
                    variant="danger"
                    loadingText={getText("navigation_bar.loading_text_logout_button")}
                    loading={loaderLogout.isLoading}
                    onClick={handleLogout}
                    className="m-1"
                >
                    {getText("navigation_bar.logout_button")}
                </LoadingButton>
            </div>
        </aside>
    );
};
