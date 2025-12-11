import classNames from "classnames";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";

/**
 * Modal Component - Modal/Dialog personalizable del sistema de diseño Eleven Code
 *
 * @param {Object} props - Propiedades del componente
 * @param {boolean} [props.isOpen=false] - Si el modal está abierto o cerrado
 * @param {Function} [props.onClose] - Función callback para cerrar el modal
 * @param {React.ReactNode} props.children - Contenido del modal
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'} [props.size='md'] - Tamaño del modal
 * @param {boolean} [props.closeOnOverlayClick=true] - Si se cierra al hacer clic en el overlay
 * @param {boolean} [props.closeOnEscape=true] - Si se cierra al presionar Escape
 * @param {boolean} [props.showCloseButton=true] - Si muestra el botón de cerrar (X)
 * @param {boolean} [props.blurBackground=true] - Si aplica blur al fondo
 * @param {string} [props.overlayColor='bg-black/30'] - Color del overlay de fondo
 * @param {string} [props.className=''] - Clases CSS adicionales para el modal
 * @param {string} [props.overlayClassName=''] - Clases CSS adicionales para el overlay
 * @param {Object} [props...rest] - Props adicionales para el contenedor del modal
 *
 * Valores aceptados:
 * - size: 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'full'
 * - overlayColor: cualquier clase CSS de Tailwind para background y opacity
 * - isOpen: true, false
 * - closeOnOverlayClick: true, false
 * - closeOnEscape: true, false
 * - showCloseButton: true, false
 * - blurBackground: true, false
 */
export const Modal = memo(
    ({
        isOpen = false,
        onClose,
        children,
        size = "md",
        closeOnOverlayClick = true,
        closeOnEscape = true,
        showCloseButton = true,
        blurBackground = true,
        overlayColor = "bg-black/30",
        className = "",
        overlayClassName = "",
        ...props
    }) => {
        const modalRef = useRef(null);

        const baseClasses = "fixed inset-0 z-50 overflow-y-auto";

        const sizeConfig = {
            xs: "max-w-[320px]",
            sm: "max-w-[384px]",
            md: "max-w-[448px]",
            lg: "max-w-[512px]",
            xl: "max-w-[576px]",
            "2xl": "max-w-[672px]",
            "3xl": "max-w-[768px]",
            "4xl": "max-w-[896px]",
            "5xl": "max-w-[1024px]",
            "6xl": "max-w-[1152px]",
            full: "max-w-full mx-4",
        };

        const handleOverlayClick = useCallback(
            (event) => {
                if (closeOnOverlayClick && event.target === event.currentTarget) {
                    onClose?.();
                }
            },
            [closeOnOverlayClick]
        );

        useEffect(() => {
            const handleKeyDown = (event) => {
                if (closeOnEscape && event.key === "Escape" && isOpen) {
                    onClose?.();
                }
            };

            if (isOpen) {
                document.addEventListener("keydown", handleKeyDown);
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }

            return () => {
                document.removeEventListener("keydown", handleKeyDown);
                document.body.style.overflow = "auto";
            };
        }, [isOpen, closeOnEscape, onClose]);

        useEffect(() => {
            if (isOpen && modalRef.current) {
                modalRef.current.focus();
            }
        }, [isOpen]);

        const currentSize = sizeConfig[size] || sizeConfig.md;

        const overlayClasses = useMemo(() => classNames(baseClasses, overlayClassName), [overlayClassName]);

        const backdropClasses = useMemo(
            () =>
                classNames("fixed inset-0 transition-opacity duration-500", {
                    "backdrop-blur-sm": blurBackground,
                }),
            [blurBackground]
        );

        const backgroundClasses = useMemo(() => classNames("fixed inset-0", overlayColor), [overlayColor]);

        const modalClasses = useMemo(
            () =>
                classNames(
                    "relative rounded-lg shadow-xl mx-auto my-8 transition-all duration-500 transform animate-in fade-in-0 zoom-in-95",
                    currentSize,
                    className
                ),
            [currentSize, className]
        );

        const closeButtonClasses = classNames(
            "absolute top-2 right-2 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary z-10"
        );

        if (!isOpen) return null;

        return (
            <div className={overlayClasses} onClick={handleOverlayClick}>
                {/* Capa de blur */}
                <div className={backdropClasses} />
                {/* Capa de color de fondo */}
                <div className={backgroundClasses} />
                {/* Contenido del modal */}
                <div className="relative flex min-h-full items-center justify-center p-4">
                    <div
                        ref={modalRef}
                        className={modalClasses}
                        tabIndex={-1}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        {...props}
                    >
                        {showCloseButton && (
                            <button
                                className={closeButtonClasses}
                                onClick={onClose}
                                aria-label="Close Modal"
                                type="button"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        );
    }
);
