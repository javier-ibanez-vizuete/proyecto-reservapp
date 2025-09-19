import { getPositionStyle } from "../utils/getPositionStyle";
import { Toast } from "./Toast";

export const ToastContainer = ({ toasts = [], onClose = () => {}, className = "" }) => {
    if (toasts?.length === 0) return null;

    const position = toasts[0]?.position || "top-right";

    return (
        <div className={`${className}${getPositionStyle(position)}`}>
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} onClose={() => onClose(toast.id)} />
            ))}
        </div>
    );
};
