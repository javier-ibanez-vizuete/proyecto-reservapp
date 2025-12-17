import classNames from "classnames";
import { useMemo } from "react";
import { useErrorBoundary } from "../components/ErrorBoundary/useErrorBoundary";
import { Spinner } from "../components/Spinner/Spinner";
import { Button } from "../components/UI/Button";
import { useDevice } from "../hooks/useDevice";
import { useTranslate } from "../translations/useTranslate";

export function LoadingPage() {
    const { t } = useTranslate();

    const { onErrorReset } = useErrorBoundary();
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const baseLoadingPageClasses = "flex flex-col justify-center items-center flex-1";

    const autoConfig = useMemo(
        () => ({
            gap: classNames({
                "gap-2": isMobile2Xs || isMobileXs,
                "gap-4": isMobileSm || isTablet,
                "gap-6": isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const currentLoadingPageClasses = useMemo(
        () => classNames(baseLoadingPageClasses, autoConfig.gap),
        [autoConfig.gap]
    );
    return (
        <div className={currentLoadingPageClasses}>
            <h2>{t("app.on_loading_page_text")}</h2>
            <Spinner size="xl" />
            <Button variant="danger" onClick={onErrorReset}>
                {t("app.on_reload_page_text")}
            </Button>
        </div>
    );
}
