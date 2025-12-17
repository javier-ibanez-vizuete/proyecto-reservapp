import classNames from "classnames";
import { memo, useContext, useMemo } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { imageErrorData } from "../../data/IMAGES_DATA";
import { useDevice } from "../../hooks/useDevice";
import { Button } from "../UI/Button";
import { Image } from "../UI/Image";
import { ImageContainer } from "../UI/ImageContainer";
import { useErrorBoundary } from "./useErrorBoundary";

export const PageError = memo(
    ({
        title = "Error Loading Data",
        message,
        icon,
        retryText = "Retry",
        className = "",
        containerClassName = "",
    }) => {
        const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
        const { onErrorRetry, onErrorReset } = useErrorBoundary();
        const { getText } = useContext(LanguageContext);

        const baseContainerClasses = "flex flex-1 flex-col justify-center";
        const baseContentClasses = "flex flex-col items-center";

        const autoConfig = useMemo(
            () => ({
                imageSize: classNames({
                    "w-20": isMobile2Xs,
                    "w-30": isMobileXs,
                    "w-40": isMobileSm,
                    "w-48": isTablet,
                    "w-56": isDesktop,
                }),
                gap: classNames({
                    "gap-2": isMobile2Xs || isMobileXs || isMobileSm,
                    "gap-3": isTablet || isDesktop,
                }),
            }),
            [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
        );

        const currentContainerClasses = useMemo(() => classNames(baseContainerClasses, containerClassName));

        const currentContentClasses = useMemo(() =>
            classNames(baseContentClasses, autoConfig?.gap, className)
        );
        const currentImageClasses = classNames(autoConfig?.imageSize || "w-40");

        return (
            <div className={currentContainerClasses}>
                <div className={currentContentClasses}>
                    {!icon && (
                        <ImageContainer size={currentImageClasses}>
                            <Image imageData={imageErrorData} />
                        </ImageContainer>
                    )}

                    {icon && <h3>{icon}</h3>}

                    <h4>{title}</h4>

                    {message && <p>{message}</p>}

                    <Button variant="primary" onClick={onErrorRetry}>
                        {retryText ? retryText : getText("error_sentences.on_error_retry_button_text")}
                    </Button>

                    <Button variant="danger" onClick={onErrorReset}>
                        {getText("error_sentences.on_error_back_to_home_button_text")}
                    </Button>
                </div>
            </div>
        );
    }
);
