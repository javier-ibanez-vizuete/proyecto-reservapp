import { useCallback } from "react";

export function useErrorBoundary() {
    const onErrorRetry = useCallback(() => window.location.reload(), []);

    const onErrorReset = useCallback(() => (window.location.href = "/"), []);

    return { onErrorRetry, onErrorReset };
}
