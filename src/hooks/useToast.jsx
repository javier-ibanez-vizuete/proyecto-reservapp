import { useCallback, useEffect, useRef, useState } from "react";

export const useToast = (defaultDuration = 2000, defaultPosition = "top-center", animationDuration = 400) => {
    const [toasts, setToasts] = useState([]);
    const timersRef = useRef({}); // { [id]: { auto: timeoutId, remove: timeoutId } }

    useEffect(() => {
        return () => {
            Object.values(timersRef.current).forEach(({ auto, remove }) => {
                if (auto) clearTimeout(auto);
                if (remove) clearTimeout(remove);
            });
            timersRef.current = {};
        };
    }, []);

    const removeToast = useCallback((id) => {
        // cleanup timers for this toast
        const timers = timersRef.current[id];
        if (timers?.auto) clearTimeout(timers.auto);
        if (timers?.remove) clearTimeout(timers.remove);
        delete timersRef.current[id];

        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const startRemove = useCallback(
        (id) => {
            // mark toast as closing -> UI applies fade-out
            setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, closing: true } : t)));

            // clear auto timer if any
            const timers = timersRef.current[id];
            if (timers?.auto) {
                clearTimeout(timers.auto);
                timersRef.current[id].auto = null;
            }

            // schedule final removal after animation duration
            timersRef.current[id] = {
                ...(timersRef.current[id] || {}),
                remove: setTimeout(() => removeToast(id), animationDuration),
            };
        },
        [animationDuration, removeToast]
    );

    const showToast = useCallback(
        (message, type = "info", duration = defaultDuration, position = defaultPosition) => {
            const id = Date.now().toString();
            const toast = { id, message, type, duration, position, closing: false };
            setToasts((prev) => [...prev, toast]);

            timersRef.current[id] = {
                ...(timersRef.current[id] || {}),
                auto: setTimeout(() => startRemove(id), duration),
            };

            return id;
        },
        [defaultDuration, defaultPosition, startRemove]
    );

    const dismissToast = useCallback(
        (id) => {
            startRemove(id);
        },
        [startRemove]
    );

    return { toasts, showToast, dismissToast, removeToast };
};
