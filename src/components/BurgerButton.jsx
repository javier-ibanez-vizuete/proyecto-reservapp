import classNames from "classnames";
import { useContext, useMemo } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useDevice } from "../hooks/useDevice";

export const BurgerButton = ({ isMobileMenuOpen, toggleMobileMenu }) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const { theme } = useContext(ThemeContext);

    const baseClasses = "relative h-full cursor-pointer m-auto";
    const iconBaseClasses = `absolute left-0 right-0 h-1 rounded-sm transition-all duration-500 ease-in-out ${
        theme === "light" ? "bg-text-color" : "bg-text-color-dark"
    }`;

    const containerSizeConfig = useMemo(
        () =>
            classNames({
                "w-6": isMobile2Xs,
                "w-7": isMobileXs,
                "w-8": isMobileSm,
                "w-9": isTablet,
                "w-10": isDesktop,
            }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const iconSize = useMemo(() => {
        if (isMobile2Xs && !isMobileMenuOpen) return 24;
        if (isMobile2Xs && isMobileMenuOpen) return 24 * Math.sqrt(2) - 5;

        if (isMobileXs && !isMobileMenuOpen) return 28;
        if (isMobileXs && isMobileMenuOpen) return 28 * Math.sqrt(2) - 5;

        if (isMobileSm && !isMobileMenuOpen) return 32;
        if (isMobileSm && isMobileMenuOpen) return 32 * Math.sqrt(2) - 6;

        if (isTablet && !isMobileMenuOpen) return 36;
        if (isTablet && isMobileMenuOpen) return 36 * Math.sqrt(2) - 5;
    }, [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop, isMobileMenuOpen]);

    return (
        <div className="flex flex-col flex-1">
            <input
                id="burger-checkbox"
                type="checkbox"
                className="hidden"
                checked={isMobileMenuOpen}
                onChange={toggleMobileMenu}
            />
            <label htmlFor="burger-checkbox" className={classNames(baseClasses, containerSizeConfig)}>
                {/* Barra superior */}
                <div
                    className={classNames(iconBaseClasses, {
                        "top-0 origin-left left-0.5 rotate-[405deg] delay-0": isMobileMenuOpen,
                        "top-0 delay-200": !isMobileMenuOpen,
                    })}
                    style={{ width: `${iconSize}px` }}
                />

                <div
                    className={classNames(
                        iconBaseClasses,
                        {
                            "opacity-0 rotate-[-135deg] delay-100": isMobileMenuOpen,
                            "opacity-100 delay-100": !isMobileMenuOpen,
                        },
                        "top-1/2 -translate-y-1/2"
                    )}
                />

                {/* Barra inferior */}
                <div
                    className={classNames(
                        iconBaseClasses,
                        {
                            "origin-left left-0.5 rotate-[-405deg] delay-200": isMobileMenuOpen,
                            "delay-0": !isMobileMenuOpen,
                        },
                        "top-full -translate-y-full"
                    )}
                    style={{ width: `${iconSize}px` }}
                />
            </label>
        </div>
    );
};
