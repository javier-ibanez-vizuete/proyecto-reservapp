import classnames from "classnames";
import { memo, useMemo } from "react";

/**
 * Skeleton - Componente de esqueleto para estados de carga
 *
 * Proporciona placeholders visuales mientras se cargan los datos reales.
 * Útil para mejorar la experiencia de usuario durante los tiempos de carga.
 *
 * Características principales:
 * - Múltiples variantes (text, avatar, card, image, etc.)
 * - 4 tamaños diferentes para texto
 * - Animación de pulso suave
 * - Altamente customizable con CSS
 * - Responsive y accesible
 *
 * @component
 * @example
 * // Uso básico
 * <Skeleton />
 *
 * @example
 * // Skeleton de texto con tamaño
 * <Skeleton variant="text" size="lg" />
 *
 * @example
 * // Skeleton de avatar
 * <Skeleton variant="avatar" size="lg" />
 *
 * @example
 * // Skeleton personalizado
 * <Skeleton width="300px" height="200px" className="rounded-lg" />
 */
export const Skeleton = memo(
    ({
        /** @description Variante del skeleton: 'text' | 'avatar' | 'image' | 'card' | 'custom' */
        variant = "text",
        /** @description Tamaño para variantes text: 'sm' | 'md' | 'lg' | 'xl' */
        size = "md",
        /** @description Ancho personalizado (solo para variant="custom") */
        width,
        /** @description Alto personalizado (solo para variant="custom") */
        height,
        /** @description Desactivar animación de pulso */
        noAnimation = false,
        /** @description Clases CSS adicionales */
        className = "",
        /** @description Props adicionales */
        ...props
    }) => {
        // Clases base para el skeleton
        const baseClasses = classnames("bg-gray-200 rounded", !noAnimation && "animate-pulse", className);

        const variantClasses = useMemo(
            () => ({
                text: {
                    sm: "h-3 w-3/4",
                    md: "h-4 w-full",
                    lg: "h-5 w-full",
                    xl: "h-6 w-full",
                },
                avatar: {
                    sm: "h-8 w-8 rounded-full",
                    md: "h-10 w-10 rounded-full",
                    lg: "h-12 w-12 rounded-full",
                    xl: "h-16 w-16 rounded-full",
                },
                image: {
                    sm: "h-32 w-full",
                    md: "h-48 w-full",
                    lg: "h-64 w-full",
                    xl: "h-80 w-full",
                },
                card: {
                    sm: "h-24 w-full",
                    md: "h-32 w-full",
                    lg: "h-40 w-full",
                    xl: "h-48 w-full",
                },
            }),
            []
        );

        const skeletonClasses = useMemo(
            () => classnames(baseClasses, variantClasses[variant]?.[size] || variantClasses.text.md),
            [variant, size]
        );

        if (variant === "custom") {
            const customStyle = {};
            if (width) customStyle.width = width;
            if (height) customStyle.height = height;

            return <div className={baseClasses} style={customStyle} {...props} />;
        }

        return <div className={skeletonClasses} {...props} />;
    }
);

/**
 * SkeletonText - Componente especializado para texto skeleton
 *
 * @component
 * @example
 * <SkeletonText lines={3} />
 */
export const SkeletonText = memo(
    ({
        /** @description Número de líneas de texto */
        lines = 1,
        /** @description Tamaño del texto */
        size = "md",
        /** @description Clases CSS adicionales */
        className = "",
        /** @description Props adicionales */
        ...props
    }) => {
        return (
            <div className={classnames("space-y-2", className)} {...props}>
                {Array.from({ length: lines }, (_, index) => (
                    <Skeleton
                        key={index}
                        variant="text"
                        size={size}
                        className={index === lines - 1 ? "w-3/4" : "w-full"}
                    />
                ))}
            </div>
        );
    }
);

/**
 * SkeletonCard - Componente especializado para cards skeleton
 *
 * @component
 * @example
 * <SkeletonCard showAvatar showText />
 */
export const SkeletonCard = memo(
    ({
        /** @description Mostrar avatar en el card */
        showAvatar = true,
        /** @description Mostrar líneas de texto */
        showText = true,
        /** @description Número de líneas de texto */
        textLines = 3,
        /** @description Mostrar imagen */
        showImage = false,
        /** @description Tamaño del card */
        size = "md",
        /** @description Clases CSS adicionales */
        className = "",
        /** @description Props adicionales */
        ...props
    }) => {
        return (
            <div
                className={classnames("p-4 border border-gray-200 rounded-lg bg-white", className)}
                {...props}
            >
                {/* Header con avatar */}
                {showAvatar && (
                    <div className="flex items-center space-x-3 mb-4">
                        <Skeleton variant="avatar" size={size} />
                        <div className="flex-1 space-y-2">
                            <Skeleton variant="text" size="md" className="w-1/3" />
                            <Skeleton variant="text" size="sm" className="w-1/2" />
                        </div>
                    </div>
                )}

                {/* Imagen */}
                {showImage && <Skeleton variant="image" size={size} className="mb-4" />}

                {/* Contenido de texto */}
                {showText && <SkeletonText lines={textLines} size="md" />}
            </div>
        );
    }
);
