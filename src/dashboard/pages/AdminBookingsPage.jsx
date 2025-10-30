import classNames from "classnames";
import { useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BackButton } from "../../components/UI/BackButton";
import { useDevice } from "../../hooks/useDevice";
import { AdminButton } from "../components/UI/AdminButton";

export const AdminBookingsPage = ({ padding, gap }) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const { pathname } = useLocation();

    const baseSectionClasses =
        "flex-1 flex flex-col lg:max-h-[100vh] overflow-y-auto overflow-x-hidden scrollbar-hide";
    const baseLinksContainerClasses = "flex items-center";

    const variantsPadding = {
        default: "py-sm",
        none: " ",
        xs: "py-xs",
        sm: "py-sm",
        md: "py-md",
        lg: "py-lg",
        xl: "py-xl",
    };

    const variantsGap = {
        xs: "gap-xs",
        sm: "gap-sm",
        default: "gap-sm",
        md: "gap-md",
        lg: "gap-lg",
        xl: "gap-xl",
    };

    const autoConfig = useMemo(
        () => ({
            padding: classNames({
                "py-md": isMobile2Xs || isMobileXs || isMobileSm,
                "py-lg": isTablet,
                "px-md py-lg": isDesktop,
            }),
            gap: classNames({
                "gap-sm": isMobile2Xs || isMobileXs || isMobileSm,
                "gap-md": isTablet || isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const currentSectionClasses = classNames(
        baseSectionClasses,
        variantsPadding[padding] || autoConfig?.padding || variantsPadding.default,
        variantsGap[gap] || autoConfig?.gap || variantsGap.default
    );

    const currentLinksContainerClasses = classNames(
        baseLinksContainerClasses,
        variantsGap[gap] || autoConfig?.gap || variantsGap.default,
        {
            "justify-center": isDesktop,
        }
    );

    const LINKS_DATA = [
        { text: "TODAS", href: "/dashboard/bookings/all" },
        { text: "HOY", href: "/dashboard/bookings/today" },
        { text: "ELEGIR FECHA", href: "/dashboard/bookings/date" },
    ];

    return (
        <section className={currentSectionClasses}>
            <div className="perfect-center self-start lg:self-center">
                <BackButton />
            </div>
            <h1>BOOKINGS</h1>
            <div className={currentLinksContainerClasses}>
                {LINKS_DATA.map((link) => (
                    <AdminButton key={link.text} variant={link.href === pathname ? "active" : "inactive"}>
                        <Link to={link?.href} replace>
                            {link.text}
                        </Link>
                    </AdminButton>
                ))}
            </div>
            <Outlet />
        </section>
    );
};
