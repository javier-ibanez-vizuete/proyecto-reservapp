import { useLocation, useNavigate } from "react-router-dom";

import iconBackPng from "../../assets/icons/icon-go-back/icon-go-back.avif";
import iconBackAvif from "../../assets/icons/icon-go-back/icon-go-back.png";
import iconBackWebp from "../../assets/icons/icon-go-back/icon-go-back.webp";
import { Button } from "./Button";
import { Image } from "./Image";
import { ImageContainer } from "./ImageContainer";

const DEFAULT_PICTURE_DATA = {
    url: iconBackPng,
    webp: iconBackWebp,
    avif: iconBackAvif,
    alt: "Icon go Back",
};

const defaultImage = (
    <ImageContainer size={"w-5"}>
        <Image imageData={DEFAULT_PICTURE_DATA} alt={DEFAULT_PICTURE_DATA.alt} />
    </ImageContainer>
);

export const BackButton = ({ fallbackPath = "/", children = defaultImage, variant = "outline" }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        const from = location.state?.from;
        if (from) return navigate(from);
        if (window.history.length > 1) return navigate(-1);
        return navigate(fallbackPath);
    };

    return (
        <Button variant={variant} onClick={handleBack}>
            {children}
        </Button>
    );
};
