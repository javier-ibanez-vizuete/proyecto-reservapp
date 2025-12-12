import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Custom hook that tracks window width with performance optimizations
 * Includes debouncing to prevent excessive state updates during resize
 *
 * @returns {number} Current window width in pixels
 *
 * @example
 * const width = useWindowWidth();
 */
export const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    const timeoutRef = useRef(null);

    /**
     * Handles window resize with debouncing
     * useCallback evita recrear esta función en cada render
     */
    const handleResize = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setWidth(window.innerWidth);
        }, 150);
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);

    return width;
};
