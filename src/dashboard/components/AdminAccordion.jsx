import classNames from "classnames";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Image } from "../../components/UI/Image";
import { ImageContainer } from "../../components/UI/ImageContainer";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useDevice } from "../../hooks/useDevice";
import { ARROW_DOWN_BLACK, ARROW_DOWN_WHITE } from "../../utils/ICONS_DATA";

export const AdminAccordionItem = ({ title = "", links = [], defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onToggleOpen = () => setIsOpen((prev) => !prev);

    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const { theme } = useContext(ThemeContext);

    const location = useLocation();

    const containerRef = useRef(null);
    const baseHeaderClasses = "flex justify-between items-center cursor-pointer";
    const baseContainerClasses = "min-h-0 overflow-hidden transition-all duration-500 ease-in-out";
    const baseImageContainerClasses = "transition-all duration-500 ease-in-out";
    const baseLinkClasses = `relative cursor-pointer before:content-[''] before:rounded-full before:absolute before:-bottom-1 before:w-0 before:h-0.5 
                            before:transition-all before:duration-500 before:ease-in-out
                            before:-translate-x-1/2 hover:before:w-9/10 hover:before:left-1/2`;

    const autoAdminAccordionItemConfig = useMemo(
        () => ({
            iconSize: classNames({
                "w-3": isMobile2Xs || isMobileXs,
                "w-4": isMobileSm || isTablet,
                "w-5": isDesktop,
            }),
            iconDirection: classNames({
                "rotate-180": isOpen,
                "rotate-0": !isOpen,
            }),
            link: classNames({
                "before:bg-admin-background-dark": theme === "light",
                "before:bg-admin-background": theme !== "light",
            }),
            itemGap: classNames({
                "gap-xs": isMobile2Xs || isMobileXs,
                "gap-sm": isMobileSm || isTablet || isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop, isOpen, theme]
    );

    const currentImageContainerConfig = classNames(
        baseImageContainerClasses,
        autoAdminAccordionItemConfig.iconDirection
    );

    useEffect(() => {
        if (!containerRef?.current) return;
        const container = containerRef.current;

        if (isOpen) container.style.height = `${container.scrollHeight}px`;
        if (!isOpen) container.style.height = 0;
    }, [containerRef, isOpen]);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <article>
            <header className={baseHeaderClasses} onClick={onToggleOpen}>
                <h5>{title}</h5>
                <ImageContainer
                    size={autoAdminAccordionItemConfig.iconSize}
                    className={currentImageContainerConfig}
                >
                    <Image imageData={theme === "light" ? ARROW_DOWN_BLACK : ARROW_DOWN_WHITE} />
                </ImageContainer>
            </header>
            <div
                ref={containerRef}
                onClick={(event) => event.stopPropagation()}
                className={baseContainerClasses}
            >
                <ul className={`flex flex-col ${autoAdminAccordionItemConfig.itemGap}`}>
                    {links.map(({ label, url }) => (
                        <li key={url}>
                            <Link
                                to={url}
                                className={classNames(
                                    baseLinkClasses,
                                    location.pathname.includes(url) ? "font-medium" : "",
                                    autoAdminAccordionItemConfig.link
                                )}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
};

export const AdminAccordion = ({ contents = [], padding, gap, defaultOpen = 0, className = "" }) => {
    const { getText } = useContext(ThemeContext);
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const baseAdminAccordionClasses = "flex flex-col";

    const variantsPadding = {
        none: "p-0",
        xs: "p-xs",
        sm: "p-sm",
        default: "p-sm",
        md: "p-md",
        lg: "p-lg",
        xl: "p-xl",
    };

    const variantsGap = {
        none: "gap-0",
        xs: "gap-xs",
        sm: "gap-sm",
        default: "gap-sm",
        md: "gap-md",
        lg: "gap-lg",
        xl: "gap-xl",
    };

    const autoAdminAccordionConfig = useMemo(
        () => ({
            padding: classNames({
                "px-xs": isMobile2Xs || isMobileXs,
                "px-0": isMobileSm || isTablet || isDesktop,
            }),
            gap: classNames({
                "gap-sm": isMobile2Xs || isMobileXs,
                "gap-md": isMobileSm || isTablet,
                "gap-lg": isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const renderAdminAccordionItem = (content, index) => (
        <AdminAccordionItem
            key={index}
            title={content.title}
            links={content.links}
            defaultOpen={index === defaultOpen}
        />
    );

    const currentAdminAccordionClasses = classNames(
        baseAdminAccordionClasses,
        variantsPadding[padding] || autoAdminAccordionConfig?.padding || variantsPadding.default,
        variantsGap[gap] || autoAdminAccordionConfig?.gap || variantsGap.default,
        className
    );

    if (!contents.length) return null;
    return <div className={currentAdminAccordionClasses}>{contents.map(renderAdminAccordionItem)}</div>;
};
