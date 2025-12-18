import { memo } from "react";
import { useTranslate } from "../../translations/useTranslate";
import { CTAButton } from "./CTAButton";

export const CTAContent = memo(({ title, description, buttonText, buttonHref, onButtonClick, className }) => {
    const { t } = useTranslate();
    return (
        <div className={`flex flex-col justify-center p-8 md:p-12 gap-2 ${className}`}>
            <h2 className="leading-tight">{t(title)}</h2>

            <p className="leading-relaxed">{t(description)}</p>

            <CTAButton text={t(buttonText)} href={buttonHref} onClick={onButtonClick} />
        </div>
    );
});
