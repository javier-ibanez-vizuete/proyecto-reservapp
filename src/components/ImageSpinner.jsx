import { ImageContainer } from "../components/UI/ImageContainer";
import { Image } from "../components/UI/Image";

import emptyLogo from "../assets/logos/reservapp-logo/empty-logo-reservapp.png";
import emptyLogoWebp from "../assets/logos/reservapp-logo/empty-logo-reservapp.webp";
import emptyLogoAvif from "../assets/logos/reservapp-logo/empty-logo-reservapp.avif";

import centerLogo from "../assets/logos/reservapp-logo/center-logo-reservapp.png";
import centerLogoWebp from "../assets/logos/reservapp-logo/center-logo-reservapp.webp";
import centerLogoAvif from "../assets/logos/reservapp-logo/center-logo-reservapp.avif";

export const ImageSpinner = () => {
    return (
        <div className="relative flex justify-center items-center">
            <ImageContainer className="w-20 zooming">
                <Image imageData={{ default: emptyLogo, webp: emptyLogoWebp, avif: emptyLogoAvif }} />
            </ImageContainer>
            <ImageContainer className="absolute w-[50px] top-[5px] spin-and-zoom">
                <Image imageData={{ default: centerLogo, webp: centerLogoWebp, avif: centerLogoAvif }} />
            </ImageContainer>
        </div>
    );
};
