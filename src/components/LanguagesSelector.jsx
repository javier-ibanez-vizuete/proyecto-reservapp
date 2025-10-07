import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { Dropdown } from "./Dropdown/Dropdown";
import { DropdownTrigger } from "./Dropdown/DropdownTrigger";
import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

import iconChinesseFlag from "../assets/icons/icons-flags/icon-chinesse-flag.webp";
import iconDeutchFlag from "../assets/icons/icons-flags/icon-deutch-flag.webp";
import iconFranceFlag from "../assets/icons/icons-flags/icon-france-flag.webp";
import iconItalyFlag from "../assets/icons/icons-flags/icon-italy-flag.webp";
import iconSpanishFlag from "../assets/icons/icons-flags/icon-spanish-flag.webp";
import iconUkFlag from "../assets/icons/icons-flags/icon-uk-flag.webp";

import { DropdownItem } from "./Dropdown/DropdownItem";
import { DropdownMenu } from "./Dropdown/DropdownMenu";

export const LanguagesSelector = ({ placement = "bottom-start" }) => {
    const { lang, languages, handleLang } = useContext(LanguageContext);

    const LANGUAGES_FLAG = {
        en: iconUkFlag,
        es: iconSpanishFlag,
        fr: iconFranceFlag,
        it: iconItalyFlag,
        de: iconDeutchFlag,
        zh: iconChinesseFlag,
    };

    return (
        <Dropdown placement={placement} className={"rounded-full"}>
            <DropdownTrigger hasIcon={false} btnStyle={false}>
                <ImageContainer className="w-11">
                    <Image imgSrc={LANGUAGES_FLAG[lang]} alt="Language Flag" />
                </ImageContainer>
            </DropdownTrigger>
            <DropdownMenu>
                {Object.entries(languages).map(([langCode, langValue]) => (
                    <DropdownItem key={langCode} onClick={() => handleLang(langCode)}>
                        <div className="flex justify-between items-center">
                            <span>{langValue}</span>
                            <ImageContainer className="w-11">
                                <Image imgSrc={LANGUAGES_FLAG[langCode]} />
                            </ImageContainer>
                        </div>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};
