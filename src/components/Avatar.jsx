import classNames from "classnames";
import { useEffect, useState } from "react";

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
    src,
    alt = "",
    size = "md",
    variant = "circle",
    fallback,
    online = false,
    className = "",
    ...props
}) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [imageError, setImageError] = useState(false);

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

    const textSizeClass = `text-${size}`;

    const variantConfig = {
        circle: "rounded-full",
        square: "rounded-lg",
        rounded: "rounded-md",
    };

    // Función para procesar la imagen (URL normal o Base64)
    const processImageSrc = (srcInput) => {
        if (!srcInput) return null;

        // Si ya tiene el prefijo data:image, devolverlo tal como está
        if (srcInput.startsWith("data:image/")) {
            return srcInput;
        }

        // Si parece ser Base64 sin prefijo, agregarlo
        if (srcInput.length > 100 && !srcInput.startsWith("http") && !srcInput.startsWith("/")) {
            return `data:image/jpeg;base64,${srcInput}`;
        }

        // Si es una URL normal, devolverla tal como está
        return srcInput;
    };

    // Efecto para procesar el src cuando cambie
    useEffect(() => {
        setImageError(false);
        const processedSrc = processImageSrc(src);
        setImageSrc(processedSrc);
    }, [src]);

    const baseClasses =
        "relative inline-flex items-center justify-center overflow-hidden bg-gray-100 text-gray-600 font-medium";

    const currentSize = sizeConfig[size] || sizeConfig.md;
    const currentVariant = variantConfig[variant] || variantConfig.circle;

    const avatarClasses = classNames(
        baseClasses,
        currentSize.avatar,
        textSizeClass,
        currentVariant,
        className
    );

    const indicatorClasses = classNames(
        "absolute bg-success-400 border-2 border-white rounded-full",
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
        <div className="relative inline-block">
            <div className={avatarClasses} {...props}>
                {/* Imagen del avatar */}
                {imageSrc && !imageError && (
                    <img
                        src={imageSrc}
                        alt={alt}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                    />
                )}

                {/* Fallback text cuando no hay imagen o hay error */}
                {(!imageSrc || imageError) && <span className="select-none">{getFallbackText()}</span>}
            </div>

            {/* Indicador de estado online */}
            {online && <span className={indicatorClasses} aria-label="En línea" />}
        </div>
    );
};
