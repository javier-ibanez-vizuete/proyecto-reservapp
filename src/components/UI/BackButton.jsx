import { useLocation, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ICON_GO_BACK_BLACK_DATA, ICON_GO_BACK_WHITE_DATA } from "../../data/ICONS_DATA";
import { Button } from "./Button";
import { Image } from "./Image";
import { ImageContainer } from "./ImageContainer";

export const BackButton = ({ fallbackPath = "/", children, variant = "outline" }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme } = useContext(ThemeContext);

    const defaultImage = (
        <ImageContainer size={"w-5"}>
            <Image
                imageData={theme === "light" ? ICON_GO_BACK_BLACK_DATA : ICON_GO_BACK_WHITE_DATA}
                alt={theme === "light" ? ICON_GO_BACK_BLACK_DATA.alt : ICON_GO_BACK_WHITE_DATA.alt}
            />
        </ImageContainer>
    );

    const handleBack = () => {
        const from = location.state?.from;
        if (from) return navigate(from);
        if (window.history.length > 1) return navigate(-1);
        return navigate(fallbackPath);
    };

    if (!children)
        return (
            <Button variant={variant} onClick={handleBack}>
                {defaultImage}
            </Button>
        );

    return (
        <Button variant={variant} onClick={handleBack}>
            {children}
        </Button>
    );
};
