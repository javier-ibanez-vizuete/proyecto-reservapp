import { memo, useMemo } from "react";
import { Button } from "./UI/Button";

export const PageError = memo(
    ({
        title = "Error al cargar los datos",
        message,
        icon = "⚠️",
        onRetry,
        retryText = "Reintentar",
        className = "",
        containerClassName = "",
        fullPage = false,
    }) => {
        const containerClasses = useMemo(() => {
            const baseContainerClasses = "flex items-center justify-center";
            return fullPage
                ? `${baseContainerClasses} min-h-screen ${containerClassName}`
                : `${baseContainerClasses} py-12 ${containerClassName}`;
        }, [fullPage, containerClassName]);

        return (
            <div className={containerClasses}>
                <div className={`flex flex-col items-center ${className}`}>
                    <Text size="4xl" className="mb-4" color="danger" as="div">
                        {icon}
                    </Text>

                    <h2>{title}</h2>

                    {message && <p>{message}</p>}

                    {onRetry && (
                        <Button variant="danger" onClick={onRetry}>
                            {retryText}
                        </Button>
                    )}

                    <Button variant="tertiary" className="mt-4" onClick={() => (window.location.href = "/")}>
                        Volver al inicio
                    </Button>
                </div>
            </div>
        );
    }
);
