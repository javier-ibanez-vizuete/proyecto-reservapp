import { useCallback, useEffect, useRef } from "react";
import fallbackImage from "../assets/pictures/image-fallback.png";

export const useImageFallback = () => {
    const observerRef = useRef(null);
    const processedImagesRef = useRef(new WeakSet());

    const handleImageError = useCallback((img) => {
        // Evitar procesar la misma imagen múltiples veces
        if (processedImagesRef.current.has(img)) {
            return;
        }

        img.src = fallbackImage;
        processedImagesRef.current.add(img);
    }, []);

    const processImage = useCallback(
        (img) => {
            // Si la imagen ya fue procesada, ignorar
            if (processedImagesRef.current.has(img)) {
                return;
            }

            // Manejar imágenes que ya fallaron antes de cargar el script
            if (img.complete && img.naturalWidth === 0) {
                handleImageError(img);
                return;
            }

            // Agregar listener para futuros errores
            const errorHandler = () => handleImageError(img);
            img.addEventListener("error", errorHandler, { once: true });

            // Limpiar si la imagen se remueve del DOM
            // (el WeakSet se encarga de la memoria automáticamente)
        },
        [handleImageError]
    );

    const fixBrokenImages = useCallback(() => {
        const allImages = document.querySelectorAll("img");
        allImages.forEach(processImage);
    }, [processImage]);

    useEffect(() => {
        // Procesar imágenes existentes
        fixBrokenImages();

        // Observar nuevas imágenes que se agreguen al DOM
        observerRef.current = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeName === "IMG") {
                        processImage(node);
                    } else if (node.querySelectorAll) {
                        const images = node.querySelectorAll("img");
                        images.forEach(processImage);
                    }
                });
            });
        });

        observerRef.current.observe(document.body, {
            childList: true,
            subtree: true,
        });

        // Cleanup
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            processedImagesRef.current = new WeakSet();
        };
    }, [fixBrokenImages, processImage]);

    return { fixBrokenImages };
};
