import classNames from "classnames";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

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
export const ThemeButton = ({ className = "", handleCloseMobileMenu = () => {}, ...props }) => {
    const { theme, onToggleTheme } = useContext(ThemeContext);

    const handleClick = () => {
        onToggleTheme?.();
        handleCloseMobileMenu();
    };

    const isDarkTheme = theme === "dark";

    return (
        <div className={getContainerClasses(className, theme)}>
            <button
                className={getButtonClasses()}
                onClick={handleClick}
                aria-label={getAriaLabel(theme, isDarkTheme)}
                title={`Currently ${theme} theme. Click to toggle.`}
                {...props}
            >
                {renderThemeIcon(isDarkTheme)}
            </button>
        </div>
    );
};

// Helper functions extracted to avoid nested logic
const getContainerClasses = (className, theme) => {
    return classNames(
        `relative rounded-full border ${theme === "light" ? "border-amber-500" : "border-gray-500"}`,
        "backdrop-blur-[15px]",
        "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.01)]",
        "w-9 h-9 perfect-center",
        className
    );
};

const getButtonClasses = () => {
    return classNames("perfect-center outline-none", "focus:outline-none rounded-full");
};

const getAriaLabel = (theme, isDarkTheme) => {
    const targetTheme = isDarkTheme ? "light" : "dark";
    return `Switch theme from ${theme} to ${targetTheme}`;
};

const renderThemeIcon = (isDarkTheme) => {
    if (isDarkTheme) {
        return renderMoonIcon();
    }

    return renderSunIcon();
};

const renderMoonIcon = () => {
    return (
        <span
            className={classNames(
                "relative z-10 rounded-full transition-colors duration-300 outline-none",
                "w-[14px] h-[14px] bg-gray-500",
                // Moon shape using pseudo-element
                'before:content-[""] before:w-[11px] before:h-[11px] before:rounded-full',
                "before:bg-accent-background-dark before:absolute before:top-[0px] before:-right-[1px]"
            )}
        />
    );
};

const renderSunIcon = () => {
    return (
        <>
            {renderSunCenter()}
            {renderSunRays()}
        </>
    );
};

const renderSunCenter = () => {
    return (
        <span
            className={classNames(
                "relative z-10 rounded-full transition-colors duration-300 outline-none",
                "w-[8px] h-[8px] bg-amber-500"
            )}
        />
    );
};

const renderSunRays = () => {
    return (
        <div className="absolute w-[17px] h-[17px]">
            {Array.from({ length: 8 }, (_, index) => (
                <span key={index} className={getSunRayClasses(index)} />
            ))}
        </div>
    );
};

const getSunRayClasses = (rayIndex) => {
    const baseClasses =
        "absolute w-[1.5px] h-[2.5px] rounded-full bg-amber-400 transition-colors duration-300 outline-none";
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
