import { memo } from "react";
import { Dropdown } from "./Dropdown/Dropdown";
import { DropdownTrigger } from "./Dropdown/DropdownTrigger";
import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useDevice } from "../hooks/useDevice";
import { FLAGS_URL_DATA } from "../utils/FLAGS_URL_DATA";
import { DropdownItem } from "./Dropdown/DropdownItem";
import { DropdownMenu } from "./Dropdown/DropdownMenu";

export const LanguagesSelector = memo(({ placement = "bottom-start", onClick = () => {} }) => {
    const { i18n } = useTranslation();
    const languages = Object.keys(i18n.options.resources);
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const languagesMap = {
        es: "Español",
        en: "English",
        fr: "François",
        zh: "Chinese",
    };

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
                    <Image imageData={FLAGS_URL_DATA[i18n?.language]} alt={`${i18n?.language} Flag`} />
                </ImageContainer>
            </DropdownTrigger>
            <DropdownMenu classNameMenuContainer="flex-col">
                {languages.map((language) => (
                    <DropdownItem
                        key={language}
                        onClick={() => i18n.changeLanguage(language)}
                        variant="none"
                        className="flex justify-between items-center gap-4"
                    >
                        <span>{languagesMap[language]}</span>
                        <ImageContainer size={iconsSizeConfig}>
                            <Image imageData={FLAGS_URL_DATA[language]} />
                        </ImageContainer>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
});
