import { useEffect } from "react";
import fallbackImage from "../assets/pictures/image-fallback.png";

export const useImageFallback = () => {
    const fixBrokenImages = () => {
        const allImages = document.querySelectorAll("img");

        if (allImages.length === 0) {
            return;
        }

        allImages.forEach((img) => {
            const handleError = () => {
                img.src = fallbackImage;
                img.removeEventListener("error", handleError);
            };

            img.addEventListener("error", handleError);

            if (img.complete && img.naturalWidth === 0) {
                handleError();
            }
        });
    };

    useEffect(() => {
        const timer = setTimeout(fixBrokenImages, 100);
        return () => clearTimeout(timer);
    }, []);

    return { fixBrokenImages };
};
