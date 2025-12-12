import { memo, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { CTAButton } from "./CTAButton";

export const CTAContent = memo(({ title, description, buttonText, buttonHref, onButtonClick, className }) => {
    const { getText } = useContext(LanguageContext);
    return (
        <div className={`flex flex-col justify-center p-8 md:p-12 gap-2 ${className}`}>
            <h2 className="leading-tight">{getText(title)}</h2>

            <p className="leading-relaxed">{getText(description)}</p>

            <CTAButton text={getText(buttonText)} href={buttonHref} onClick={onButtonClick} />
        </div>
    );
});
