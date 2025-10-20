import classNames from "classnames";
import { useMemo } from "react";
import { underConstructionImagesData } from "../data/IMAGES_DATA";
import { useDevice } from "../hooks/useDevice";
import { BackButton } from "./UI/BackButton";
import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

export const UnderConstruction = ({ pageName = "This Page" }) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const title = useMemo(() => `${pageName} is still under Development`, [pageName]);

    const baseClasses = "flex-1 flex flex-col md:items-center";

    const autoConfig = useMemo(
        () => ({
            imageSize: classNames({
                "w-full": isMobile2Xs || isMobileXs,
                "w-4/5": isMobileSm,
                "w-1/2": isTablet,
                "w-[300px]": isDesktop,
            }),
            padding: classNames({
                "py-sm": isMobile2Xs,
                "py-md": isMobileXs || isMobileSm,
                "py-lg": isTablet || isDesktop,
            }),
            gap: classNames({
                "gap-md": isMobile2Xs || isMobileXs || isMobileSm || isTablet,
                "gap-lg": isDesktop,
            }),
            h1: classNames("font-bold", {
                "text-sm": isMobile2Xs,
                "text-md": isMobileXs || isMobileSm,
                "text-2xl": isTablet,
                "text-3xl": isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const currentClasses = classNames(baseClasses, autoConfig.padding, autoConfig.gap);

    return (
        <div className={currentClasses}>
            <div className="perfect-center self-start lg:self-center">
                <BackButton />
            </div>
            <h1 className={classNames(autoConfig.h1)}>{title}</h1>
            <div className="perfect-center">
                <ImageContainer size={autoConfig.imageSize}>
                    <Image imageData={underConstructionImagesData} />
                </ImageContainer>
            </div>
            <p>Sorry for the inconvenience!</p>
        </div>
    );
};
