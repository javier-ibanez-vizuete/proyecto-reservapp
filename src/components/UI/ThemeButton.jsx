import classNames from "classnames";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useDevice } from "../../hooks/useDevice";

/**
 * ThemeButton Component - Simple button for switching between light and dark themes
 *
 * This component automatically subscribes to ThemeContext and manages theme state.
 * Shows sun icon for light theme and moon icon for dark theme.
 *
 * @component
 * @example
 * // Basic usage (automatically connects to ThemeContext)
 * <ThemeButton />
 *
 * @example
 * // With additional styling
 * <ThemeButton className="fixed top-4 right-4" />
 *
 * @param {Object} props - Component props
 * @param {string} [props.className=''] - Additional CSS classes for customization
 * @param {Object} [props...rest] - Additional HTML button element props
 *
 * @requires ThemeContext - Must be wrapped within a ThemeProvider
 * @requires ThemeContext.theme - Current theme state ('light' | 'dark')
 * @requires ThemeContext.onToggleTheme - Function to toggle theme state
 */
export const ThemeButton = ({ className = "", ...props }) => {
    const { theme, onToggleTheme } = useContext(ThemeContext);
    const sizesDevice = useDevice();

    const handleClick = () => {
        onToggleTheme?.();
    };

    const isDarkTheme = theme === "dark";

    return (
        <div
            className={getContainerClasses(className, theme, sizesDevice)}
            onClick={handleClick}
            role="button"
        >
            <button
                className={getButtonClasses()}
                aria-label={getAriaLabel(theme, isDarkTheme)}
                title={`Currently ${theme} theme. Click to toggle.`}
                {...props}
            >
                {renderThemeIcon(isDarkTheme, sizesDevice)}
            </button>
        </div>
    );
};

// Helper functions extracted to avoid nested logic
const getContainerClasses = (className, theme, sizesDevice) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = sizesDevice;

    const iconSunContainer = classNames({
        "w-6 h-6": isMobile2Xs,
        "w-7 h-7": isMobileXs,
        "w-8 h-8": isMobileSm,
        "w-9 h-9": isTablet,
        "w-10 h-10": isDesktop,
    });

    return classNames(
        `relative rounded-full cursor-pointer border transition-all duration-500 ease-in-out active:scale-95 lg:hover:-translate-y-[2px] ${
            theme === "light" ? "border-amber-500" : "border-text-color-dark/50"
        }`,
        "backdrop-blur-[15px]",
        "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.01)]",
        "perfect-center",
        iconSunContainer,
        className
    );
};

const getButtonClasses = () => {
    return classNames("perfect-center cursor-pointer outline-none", "focus:outline-none rounded-full");
};

const getAriaLabel = (theme, isDarkTheme) => {
    const targetTheme = isDarkTheme ? "light" : "dark";
    return `Switch theme from ${theme} to ${targetTheme}`;
};

const renderThemeIcon = (isDarkTheme, sizesDevice) => {
    if (isDarkTheme) {
        return renderMoonIcon(sizesDevice);
    }

    return renderSunIcon(sizesDevice);
};

const renderMoonIcon = (sizesDevice) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = sizesDevice;
    console.log("isMobileSm", isMobileSm);

    const iconMoonConfig = classNames({
        "w-3.5 h-3.5 before:h-3 before:w-3 before:-right-0.5 before:top-0": isMobile2Xs,
        "w-4 h-4 before:h-3.5 before:w-3.5 before:-right-[2px] before:top-0": isMobileXs,
        "w-4.5 h-4.5 before:h-4 before:w-4 before:-right-[2px] before:top-0": isMobileSm,
        "w-5 h-5 before:h-4.5 before:w-4.5 before:-right-[2px] before:top-0": isTablet,
        "w-5.5 h-5.5 before:h-5 before:w-5 before:-right-[3px] before:-top-[1px]": isDesktop,
    });

    return (
        <span
            className={classNames(
                "relative z-10 rounded-full transition-colors ease-in-out duration-500 outline-none",
                "bg-text-color-dark shadow-2xs shadow-text-color-dark",
                'before:content-[""] before:rounded-full',
                "before:bg-accent-background-dark before:absolute",
                iconMoonConfig
            )}
        />
    );
};

const renderSunIcon = (sizesDevice) => {
    return (
        <>
            {renderSunCenter(sizesDevice)}
            {renderSunRays(sizesDevice)}
        </>
    );
};

const renderSunCenter = (sizesDevice) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = sizesDevice;

    const iconSunCenterConfig = classNames({
        "w-2.5 h-2.5": isMobile2Xs,
        "w-3 h-3": isMobileXs,
        "w-3.5 h-3.5": isMobileSm,
        "w-4 h-4": isTablet,
        "w-4.5 h-4.5": isDesktop,
    });

    return (
        <span
            className={classNames(
                "relative z-10 rounded-full transition-colors duration-500 outline-none",
                "bg-amber-500",
                iconSunCenterConfig
            )}
        />
    );
};

const renderSunRays = (sizesDevice) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = sizesDevice;

    const iconSunRaysConfig = classNames({
        "w-[16px] h-[16px]": isMobile2Xs,
        "w-[18px] h-[18px]": isMobileXs,
        "w-[20px] h-[20px]": isMobileSm,
        "w-[23px] h-[23px]": isTablet,
        "w-[26px] h-[26px]": isDesktop,
    });

    return (
        <div className={`absolute ${iconSunRaysConfig}`}>
            {Array.from({ length: 8 }, (_, index) => (
                <span key={index} className={getSunRayClasses(index)} />
            ))}
        </div>
    );
};

const getSunRayClasses = (rayIndex) => {
    const baseClasses =
        "absolute w-[1.5px] h-[2.5px] rounded-full bg-amber-400 transition-colors duration-500 outline-none";
    const positionClasses = getSunRayPosition(rayIndex);

    return classNames(baseClasses, positionClasses);
};

const getSunRayPosition = (index) => {
    const positions = {
        0: "top-0 left-1/2 -translate-x-1/2", // Top
        1: "bottom-0 left-1/2 -translate-x-1/2", // Bottom
        2: "top-1/2 left-0 rotate-90 -translate-y-1/2", // Left
        3: "top-1/2 right-0 rotate-90 -translate-y-1/2", // Right
        4: "top-1/8 right-1/8 rotate-45", // Top-right
        5: "top-1/8 left-1/8 -rotate-45", // Top-left
        6: "bottom-1/8 left-1/8 rotate-45", // Bottom-left
        7: "bottom-1/8 right-1/8 -rotate-45", // Bottom-right
    };

    return positions[index];
};
