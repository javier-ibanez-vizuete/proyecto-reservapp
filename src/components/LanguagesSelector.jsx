import { memo, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { Dropdown } from "./Dropdown/Dropdown";
import { DropdownTrigger } from "./Dropdown/DropdownTrigger";
import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

import classNames from "classnames";
import { useDevice } from "../hooks/useDevice";
import { FLAGS_URL_DATA } from "../utils/FLAGS_URL_DATA";
import { DropdownItem } from "./Dropdown/DropdownItem";
import { DropdownMenu } from "./Dropdown/DropdownMenu";

export const LanguagesSelector = memo(({ placement = "bottom-start", onClick = () => {} }) => {
    const { lang, languages, handleLang } = useContext(LanguageContext);
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const iconsSizeConfig = classNames({
        "w-6": isMobile2Xs,
        "w-7": isMobileXs,
        "w-8": isMobileSm,
        "w-9": isTablet,
        "w-10": isDesktop,
    });

    return (
        <Dropdown placement={placement} className={"rounded-full"} onClick={onClick}>
            <DropdownTrigger
                hasIcon={false}
                btnStyle={false}
                className={"active:scale-95 lg:hover:-translate-y-[2px]"}
            >
                <ImageContainer size={iconsSizeConfig}>
                    <Image imageData={FLAGS_URL_DATA[lang]} alt={`${lang} Flag`} />
                </ImageContainer>
            </DropdownTrigger>
            <DropdownMenu classNameMenuContainer="flex-col">
                {Object.entries(languages).map(([langCode, langValue]) => (
                    <DropdownItem
                        key={langCode}
                        onClick={() => handleLang(langCode)}
                        variant="none"
                        className="flex justify-between items-center gap-4"
                    >
                        <span>{langValue}</span>
                        <ImageContainer size={iconsSizeConfig}>
                            <Image imageData={FLAGS_URL_DATA[langCode]} />
                        </ImageContainer>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
});
