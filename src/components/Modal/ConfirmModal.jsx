import { LoadingButton } from "../Spinner/LoadingButton";
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
    loadingText = "Confirmando...",
    cancelText = "Cancelar",
    variant = "danger",
    loading = false,
    className = "",
}) => {
    const variantClasses = {
        danger: "bg-error-600 hover:bg-error-700 text-white",
        warning: "bg-brand-600 hover:bg-brand-700 text-white", // Usando brand del tema
        primary: "bg-primary-color hover:bg-primary-color text-gray-900", // Usando primary del tema
        success: "bg-success-600 hover:bg-success-700 text-white",
    };

    const handleConfirm = () => {
        onConfirm?.();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm" className={className}>
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
                <LoadingButton
                    loading={loading}
                    variant={variant}
                    loadingText={loadingText}
                    onClick={handleConfirm}
                >
                    {confirmText}
                </LoadingButton>
            </ModalFooter>
        </Modal>
    );
};
