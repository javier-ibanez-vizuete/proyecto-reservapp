import { CTAButton } from "./CTAButton";

export const CTAContent = ({ title, description, buttonText, buttonHref, onButtonClick, className }) => {
    return (
        <div className={`flex flex-col justify-center p-8 md:p-12 gap-2 ${className}`}>
            <h2 className="leading-tight">{title}</h2>

            <p className="leading-relaxed">{description}</p>

            <CTAButton text={buttonText} href={buttonHref} onClick={onButtonClick} />
        </div>
    );
};
