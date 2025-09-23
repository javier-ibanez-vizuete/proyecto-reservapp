import { useCallback, useState } from "react";

export const useToast = (defaultDuration = 3000, defaultPosition = "top-center") => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type, duration = defaultDuration, position = defaultPosition) => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, message, type, duration, position }]);

        setTimeout(() => removeToast(id), duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return { toasts, showToast, removeToast };
};
