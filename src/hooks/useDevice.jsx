import { useMemo } from "react";
import { useWindowWidth } from "./useWindowWidth";

/**
 * Custom hook that detects device type based on window width
 * All breakpoints are memoized to prevent unnecessary recalculations
 *
 * @returns {Object} Device detection flags
 * @returns {boolean} returns.isMobile2Xs - Width < 375px (extra small mobile)
 * @returns {boolean} returns.isMobileXs - Width >= 375px and < 425px (small mobile)
 * @returns {boolean} returns.isMobileSm - Width >= 414px and < 768px (medium mobile)
 * @returns {boolean} returns.isMobile - Width < 768px (any mobile)
 * @returns {boolean} returns.isTablet - Width >= 768px and < 1024px
 * @returns {boolean} returns.isDesktop - Width >= 1024px
 *
 * @example
 * const { isMobile, isTablet, isDesktop } = useDevice();
 */
export const useDevice = () => {
    const width = useWindowWidth();

    const deviceFlags = useMemo(() => {
        return {
            isMobile2Xs: width < 375,

            isMobileXs: width >= 375 && width < 425,

            isMobileSm: width >= 414 && width < 768,

            isMobile: width < 768,

            isTablet: width >= 768 && width < 1024,

            isDesktop: width >= 1024,
        };
    }, [width]);

    return deviceFlags;
};
