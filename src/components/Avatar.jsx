import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { useDevice } from "../hooks/useDevice";
import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

/**
 * Avatar Component - Componente de avatar versátil del sistema de diseño Eleven Code
 *
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.src] - URL de la imagen del avatar o string Base64
 * @param {string} [props.alt=''] - Texto alternativo para la imagen
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'} [props.size='md'] - Tamaño del avatar
 * @param {'circle' | 'square' | 'rounded'} [props.variant='circle'] - Forma del avatar
 * @param {string} [props.fallback] - Texto a mostrar cuando no hay imagen (por defecto: primera letra del alt)
 * @param {boolean} [props.online=false] - Si mostrar indicador de estado online
 * @param {string} [props.className=''] - Clases CSS adicionales para personalización
 * @param {Object} [props...rest] - Resto de props HTML del elemento div
 *
 * Valores aceptados:
 * - size: 'xs' (24px), 'sm' (32px), 'md' (40px), 'lg' (48px), 'xl' (64px), '2xl' (80px)
 * - variant: 'circle', 'square', 'rounded'
 * - online: true, false
 *
 * Soporte para Base64:
 * - Acepta strings Base64 con o sin prefijo data:image/...
 * - Maneja automáticamente la conversión y validación
 */
export const Avatar = ({
    avatar = {},
    alt = "",
    size,
    variant = "circle",
    fallback,
    online = false,
    className = "",
    ...props
}) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [imageError, setImageError] = useState(false);

    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const sizeConfig = {
        xs: {
            avatar: "w-6 h-6",
            indicator: "bg-green-500 w-1.5 h-1.5",
            position: "top-0 right-0",
        },
        sm: {
            avatar: "w-8 h-8",
            indicator: "bg-green-500 w-2 h-2 ",
            position: "top-0 right-0",
        },
        md: {
            avatar: "w-10 h-10",
            indicator: "bg-green-500 w-2.5 h-2.5",
            position: "top-0.5 right-0.5",
        },
        lg: {
            avatar: "w-12 h-12",
            indicator: "bg-green-500 w-3 h-3",
            position: "top-0.5 right-0.5",
        },
        xl: {
            avatar: "w-16 h-16",
            indicator: "bg-green-500 w-3.5 h-3.5",
            position: "top-1 right-1",
        },
        "2xl": {
            avatar: "w-20 h-20",
            indicator: "bg-green-500 w-4 h-4",
            position: "top-1 right-1",
        },
    };

    const automaticallySizeConfig = useMemo(
        () => ({
            avatar: classNames({
                "w-6 h-6": isMobile2Xs,
                "w-7 h-7": isMobileXs,
                "w-8 h-8": isMobileSm,
                "w-9 h-9": isTablet,
                "w-10 h-10": isDesktop,
            }),
            indicator: classNames({
                "w-1.5 h-1.5": isMobile2Xs,
                "w-[6px] h-[6px]": isMobileXs,
                "w-2 h-2": isMobileSm,
                "w-[9px] h-[9px]": isTablet,
                "w-2.5 h-2.5": isDesktop,
            }),
            position: "top-0 right-0",
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const textSizeClass = `text-${size}`;

    const variantConfig = {
        circle: "rounded-full",
        square: "rounded-lg",
        rounded: "rounded-md",
    };

    // Función para procesar la imagen (URL normal o Base64)
    const processImageSrc = (url) => {
        if (!url) return null;

        // Si ya tiene el prefijo data:image, devolverlo tal como está
        if (url.startsWith("data:image/")) {
            return url;
        }

        // Si parece ser Base64 sin prefijo, agregarlo
        if (url.length > 100 && !url.startsWith("http") && !url.startsWith("/")) {
            return `data:image/jpeg;base64,${url}`;
        }

        // Si es una URL normal, devolverla tal como está
        return url;
    };

    // Efecto para procesar el src cuando cambie
    useEffect(() => {
        setImageError(false);
        const processedSrc = processImageSrc(avatar?.url);
        setImageSrc(processedSrc);
    }, [avatar?.url]);

    const baseClasses = "relative perfect-center overflow-hidden bg-gray-200/50 text-gray-600 font-medium";

    const currentSize = sizeConfig[size] || automaticallySizeConfig;
    const currentVariant = variantConfig[variant] || variantConfig.circle;

    const avatarClasses = classNames(
        baseClasses,
        currentSize.avatar,
        textSizeClass,
        currentVariant,
        className
    );

    const indicatorClasses = classNames(
        "absolute bg-green-400 border-1 border-white rounded-full",
        currentSize.indicator,
        currentSize.position
    );

    const getFallbackText = () => {
        if (fallback) return fallback.charAt(0).toUpperCase();
        if (alt) return alt.charAt(0).toUpperCase();
        return "?";
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="relative inline-flex">
            <div className={avatarClasses} {...props}>
                {/* Imagen del avatar */}
                {imageSrc && !imageError && (
                    <ImageContainer className="flex-1">
                        <Image src={imageSrc} alt={alt} className="object-cover rounded-full" />
                    </ImageContainer>
                )}

                {(!imageSrc || imageError) && <span className="select-none">{getFallbackText()}</span>}
            </div>

            {online && <span className={indicatorClasses} aria-label="En línea" />}
        </div>
    );
};
