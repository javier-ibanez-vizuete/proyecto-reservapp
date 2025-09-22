import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { Dropdown } from "./Dropdown/Dropdown";
import { DropdownTrigger } from "./Dropdown/DropdownTrigger";
import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

import iconLanguages from "../assets/icons/icon-languages.png";
import { DropdownItem } from "./Dropdown/DropdownItem";
import { DropdownMenu } from "./Dropdown/DropdownMenu";

export const LanguagesSelector = ({ placement = "bottom-start" }) => {
    const { lang, languages, handleLang } = useContext(LanguageContext);

    return (
        <Dropdown placement={placement} className={"rounded-full"}>
            <DropdownTrigger hasIcon={false} btnStyle={false}>
                <ImageContainer className="w-11">
                    <Image imgSrc={iconLanguages} />
                </ImageContainer>
            </DropdownTrigger>
            <DropdownMenu>
                {Object.entries(languages).map(([langCode, langValue]) => (
                    <DropdownItem key={langCode} onClick={() => handleLang(langCode)}>
                        <span>{langValue}</span>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};
