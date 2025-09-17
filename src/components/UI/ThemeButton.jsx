import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

/**
 * ThemeButton Component - Animated button for switching between light and dark themes
 *
 * This component automatically subscribes to ThemeContext and manages theme state.
 * Features smooth animations and visual feedback when toggling between themes.
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
 * @requires ThemeContext.theme - Current theme state ('light' | 'dark' | boolean)
 * @requires ThemeContext.onToggleTheme - Function to toggle theme state
 */
export const ThemeButton = ({ className = "", ...props }) => {
    // Subscribe to ThemeContext
    const { theme, onToggleTheme } = useContext(ThemeContext);

    const [isHovered, setIsHovered] = useState(() => {
        if (theme === "light") return false;
        return true;
    });

    // Handle both string ('light'/'dark') and boolean theme values

    console.log("QUE VALE THEME ", theme);

    const handleClick = () => {
        onToggleTheme?.();
    };

    useEffect(() => {
        console.log("Que vale isHovered antes", isHovered);
        if (theme === "light") return setIsHovered(false);
        console.log("Que vale isHovered despues", isHovered);
        if (theme === "dark") return setIsHovered(true);
    }, [theme]);

    const handleMouseEnter = () => setIsHovered((prevValue) => !prevValue);
    const handleMouseLeave = () => setIsHovered((prevValue) => !prevValue);

    return (
        <div
            className={classNames(
                // Background container styles
                "relative rounded-full border",
                "backdrop-blur-[15px]",
                "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.20)]",
                "w-10 h-10 perfect-center",
                className
            )}
        >
            <button
                className={classNames(
                    "perfect-center",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-full"
                )}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                aria-label={`Switch theme between "light" and "dark"`}
                title={`Currently ${theme} theme. Click to toggle.`}
                {...props}
            >
                {/* Sun/Moon icon */}
                <span
                    className={classNames(
                        "relative z-10 rounded-full transition-all duration-400",
                        // Size and color based on hover state
                        isHovered || theme === "dark"
                            ? "w-[20px] h-[20px] bg-gray-500"
                            : "w-[7px] h-[7px] bg-amber-500",

                        // Pseudo-element :before for moon shape
                        'before:content-[""] before:w-4.5 before:h-4.5 before:rounded-full',
                        `${
                            theme === "light"
                                ? "before:bg-accent-background"
                                : "before:bg-accent-background-dark"
                        } before:absolute before:-top-[3px] before:-right-[5px]`,
                        "before:transition-transform before:duration-500",
                        isHovered || theme === "dark"
                            ? "before:scale-100"
                            : "before:scale-[0.0] before:translate-x-full"
                    )}
                />

                {/* Sun rays */}
                <div
                    className={classNames(
                        "absolute w-[22px] h-[22px] transition-all duration-400",
                        isHovered
                            ? "animate-[sun-rays_0.4s_forwards]"
                            : "animate-[reverse-sun-rays_0.6s_forwards]"
                    )}
                >
                    {/* Generate 8 sun rays dynamically */}
                    {Array.from({ length: 8 }, (_, i) => (
                        <span
                            key={i}
                            className={classNames(
                                "absolute w-0.5 h-1 rounded-full bg-zinc-800",
                                // Specific positioning for each ray
                                i === 0 && "top-0", // Top
                                i === 1 && "bottom-0", // Bottom
                                i === 2 && "top-1/2 left-0 rotate-90 -translate-y-1/2", // Left
                                i === 3 && "top-1/2 right-0 rotate-90 -translate-y-1/2", // Right
                                i === 4 && "top-1/8 right-1/8 rotate-45", // Top-right
                                i === 5 && "top-1/8 left-1/8 -rotate-45", // Bottom-left
                                i === 6 && "bottom-1/8 left-1/8 rotate-45", // Top-left
                                i === 7 && "bottom-1/8 right-1/8 -rotate-45" // Bottom-right
                            )}
                        />
                    ))}
                </div>
            </button>

            {/* Custom CSS animations */}
            <style jsx>{`
                @keyframes theme-grow {
                    0% {
                        width: 11.5px;
                        height: 11.5px;
                    }
                    100% {
                        width: 20px;
                        height: 20px;
                    }
                }

                @keyframes theme-shrink {
                    0% {
                        width: 20px;
                        height: 20px;
                    }
                    50% {
                        width: 10px;
                        height: 10px;
                    }
                    100% {
                        width: 11.5px;
                        height: 11.5px;
                    }
                }

                @keyframes sun-rays {
                    0% {
                        transform: rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: rotate(-45deg);
                        opacity: 0;
                    }
                }

                @keyframes reverse-sun-rays {
                    0% {
                        transform: rotate(-45deg);
                        opacity: 0;
                    }
                    50% {
                        transform: rotate(8deg);
                        opacity: 1;
                    }
                    100% {
                        transform: rotate(0deg);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};
