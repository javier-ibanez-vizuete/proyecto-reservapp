import { useWindowWidth } from "./useWindowWidth";

export const useDevice = () => {
	const width = useWindowWidth();

	const isMobile = width < 768;
	const isTablet = width >= 768 && width < 1024;
	const isDesktop = width >= 1024;

	return { isMobile, isTablet, isDesktop };
};