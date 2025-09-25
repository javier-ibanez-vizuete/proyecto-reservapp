import { X } from "lucide-react";
import { useEffect } from "react";

const SIZES = {
    sm: "w-[300px]",
    md: "w-[350px]",
    lg: "w-[450px]",
    xl: "w-[550px]",
    full: "w-full",
};

export const ModalContainer = ({
    isOpen = false,
    onClose,
    children,
    size = "xl",
    className = "",
    showClose = true,
}) => {
    // Bloquear scroll cuando esté abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            return () => (document.body.style.overflow = "unset");
        }
    }, [isOpen]);

    // Cerrar con Escape
    useEffect(() => {
        const handleEscape = (e) => e.key === "Escape" && onClose?.();
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            return () => document.removeEventListener("keydown", handleEscape);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-20"
            onClick={(e) => e.target === e.currentTarget && onClose?.()}
        >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/30 backdrop-blur-xs" />

            <div
                className={`relative flex flex-col max-w-full py-8 px-4 bg-white rounded-xl shadow-xl animate-in fade-in-0 zoom-in-95 duration-200
                    ${SIZES[size]}
                    ${className}`}
            >
                {/* Botón cerrar */}
                {showClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1.5 text-error-600 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Cerrar"
                    >
                        <X size={25} />
                    </button>
                )}

                {/* Contenido */}
                {children}
            </div>
        </div>
    );
};
