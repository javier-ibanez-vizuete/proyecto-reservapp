import { useWindowWidth } from "./useWindowWidth";

export const useDevice = () => {
    const width = useWindowWidth();

    const isMobile2Xs = width < 375;
    const isMobileXs = width >= 375 && width < 425;
    const isMobileSm = width >= 414 && width < 768;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    return { isMobile2Xs, isMobileXs, isMobileSm, isMobile, isTablet, isDesktop };
};
