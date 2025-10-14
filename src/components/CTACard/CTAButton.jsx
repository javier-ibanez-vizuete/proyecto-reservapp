import classNames from "classnames";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDevice } from "../../hooks/useDevice";

export const CTAButton = ({ text, href, onClick }) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const ctaButtonConfig = useMemo(
        () =>
            classNames({
                "px-2 py-1 text-2xs": isMobile2Xs,
                "px-3 py-1.5 text-base": isMobileXs || isMobileSm,
                "px-4 py-2 text-sm": isTablet,
                "px-6 py-3 text-md": isDesktop,
            }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const iconSizeConfig = classNames({
        12: isMobile2Xs || isMobileXs,
        14: isMobileSm,
        15: isTablet,
        16: isDesktop,
    });

    return (
        <div className="flex">
            <Link
                to={href}
                onClick={onClick}
                className={classNames(
                    "inline-flex items-center gap-2 rounded-default bg-primary-color font-semibold transition-all duration-300 ease-in-out hover:gap-3 active:scale-95",
                    ctaButtonConfig
                )}
            >
                {text}
                <ArrowRight size={iconSizeConfig} />
            </Link>
        </div>
    );
};
