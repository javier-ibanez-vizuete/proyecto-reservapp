import classnames from "classnames";
import { Modal } from "./Modal";
import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";
import { ModalHeader } from "./ModalHeader";

export const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirmar acción",
    message = "¿Estás seguro de que deseas continuar?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    variant = "danger",
    loading = false,
}) => {
    const variantClasses = {
        danger: "bg-error-600 hover:bg-error-700 text-white",
        warning: "bg-brand-600 hover:bg-brand-700 text-white", // Usando brand del tema
        primary: "bg-primary hover:bg-primary-dark text-gray-900", // Usando primary del tema
        success: "bg-success-600 hover:bg-success-700 text-white",
    };

    const handleConfirm = () => {
        onConfirm?.();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
                <p className="text-gray-700">{message}</p>
            </ModalBody>
            <ModalFooter>
                <button
                    className="px-md py-sm text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                    onClick={onClose}
                    disabled={loading}
                >
                    {cancelText}
                </button>
                <button
                    className={classnames(
                        "px-md py-sm text-sm font-medium rounded-md transition-colors inline-flex items-center",
                        variantClasses[variant],
                        {
                            "opacity-50 cursor-not-allowed": loading,
                        }
                    )}
                    onClick={handleConfirm}
                    disabled={loading}
                >
                    {loading && (
                        <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    )}
                    {confirmText}
                </button>
            </ModalFooter>
        </Modal>
    );
};
