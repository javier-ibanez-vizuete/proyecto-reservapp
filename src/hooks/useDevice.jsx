import { useWindowWidth } from "./useWindowWidth";

export const useDevice = () => {
    const width = useWindowWidth();

    const isMobileXs = width < 375;
    const isMobileSm = width < 414;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    return { isMobileXs, isMobileSm, isMobile, isTablet, isDesktop };
};
