import classNames from "classnames";
import { memo, useMemo } from "react";
import { imageErrorData } from "../../data/IMAGES_DATA";
import { useDevice } from "../../hooks/useDevice";
import { useTranslate } from "../../translations/useTranslate";
import { Button } from "../UI/Button";
import { Image } from "../UI/Image";
import { ImageContainer } from "../UI/ImageContainer";
import { useErrorBoundary } from "./useErrorBoundary";

export const PageError = memo(
    ({ title, message, icon, retryText, className = "", containerClassName = "" }) => {
        const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
        const { onErrorRetry, onErrorReset } = useErrorBoundary();
        const { t } = useTranslate();

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

                    <h4>{title ? title : "Ha surgido un Problemilla"}</h4>

                    {message && <p>{message}</p>}

                    <Button variant="primary" onClick={onErrorRetry}>
                        {retryText ? retryText : t("error_sentences.on_error_retry_button_text")}
                    </Button>

                    <Button variant="danger" onClick={onErrorReset}>
                        {t("error_sentences.on_error_back_to_home_button_text")}
                    </Button>
                </div>
            </div>
        );
    }
);
