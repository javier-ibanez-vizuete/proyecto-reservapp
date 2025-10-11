import classNames from "classnames";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LoadingButton } from "../Spinner/LoadingButton";
import { Button } from "../UI/Button";
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
    showCloseButton,
    variant = "accent",
    loading = false,
    className = "",
}) => {
    const { theme } = useContext(ThemeContext);

    const variantClasses = {
        danger: "bg-error-600 hover:bg-error-700 text-white",
        warning: "bg-brand-600 hover:bg-brand-700 text-white", // Usando brand del tema
        primary: "bg-primary-color hover:bg-primary-color", // Usando primary del tema
        success: "bg-success-600 hover:bg-success-700 text-white",
        accent: `${
            theme === "light"
                ? "bg-accent-background border-accent-background/50 divide-y divide-text-color/50"
                : "bg-accent-background-dark border-accent-background-dark/50 divide-y divide-text-color-dark/50"
        }`,
    };

    const handleConfirm = (event) => {
        onConfirm?.(event);
    };

    const currentClassName = classNames(variantClasses[variant] || variantClasses.accent, className);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="sm"
            className={currentClassName}
            showCloseButton={showCloseButton}
        >
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
                <p>{message}</p>
            </ModalBody>
            <ModalFooter>
                <Button variant="outline" onClick={onClose} disabled={loading}>
                    {cancelText}
                </Button>
                <LoadingButton
                    loading={loading}
                    variant={variant}
                    loadingText={loadingText}
                    onClick={handleConfirm}
                    disabled={loading}
                >
                    {confirmText}
                </LoadingButton>
            </ModalFooter>
        </Modal>
    );
};
