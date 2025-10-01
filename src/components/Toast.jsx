import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const Toast = ({ message, type = "info", onClose, closing = false }) => {
    const { theme } = useContext(ThemeContext);

    const OPTIONS = {
        success: "border border-green-500 bg-green-600 text-text-color",
        error: "border border-red-600 bg-red-700 text-white",
        info: `border border-gray-400 ${
            theme === "light"
                ? "text-text-color bg-accent-background"
                : "text-text-color-dark bg-accent-background-dark"
        }`,
    };

    const toastType = OPTIONS[type] || OPTIONS.info;

    // clases para animar entrada/salida
    const baseClasses =
        "p-4 transform min-w-[300px] transition-all duration-400 ease-in-out rounded-sm shadow-lg";
    const openState = "opacity-100 translate-y-0";
    const closingState = "opacity-0 -translate-y-4 pointer-events-none";

    return (
        <div
            role="status"
            aria-live="polite"
            className={`${baseClasses} ${toastType} ${
                closing ? closingState : openState
            } motion-reduce:transition-none`}
        >
            <div className="flex justify-between items-center">
                <span className="flex-1">{message}</span>
                <button
                    onClick={onClose}
                    className="ml-2 font-bold self-start"
                    aria-label="Cerrar notificación"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};
