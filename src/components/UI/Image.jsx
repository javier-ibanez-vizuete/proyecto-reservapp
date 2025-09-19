import { useEffect, useState } from "react";

export const Image = ({ imageData = {}, alt = "", className = "", imgSrc = "" }) => {
    const [dataImage, setDataImage] = useState(() => imageData || {});

    useEffect(() => {
        setDataImage({ ...imageData });
    }, []);

    return (
        <>
            {imageData?.url && (
                <>
                    <source srcSet={dataImage.avif} type="image/avif" />
                    <source srcSet={dataImage.webp} type="image/webp" />
                    <img
                        className={`w-full ${className}`}
                        src={dataImage?.default}
                        alt={alt ? alt : dataImage?.alt || ""}
                    />
                </>
            )}
            {imgSrc && <img className={`w-full ${className}`} src={imgSrc} alt="Picture is not working" />}

            {/* {dataImage?.avif && <source srcSet={dataImage.avif} type="image/avif" />}
            {dataImage?.webp && <source srcSet={dataImage.avif} type="image/webp" />}
            {dataImage?.default ? (
                <img
                    className={`w-full ${className}`}
                    src={dataImage?.default}
                    alt={alt ? alt : dataImage?.alt || ""}
                />
            ) : (
                <img className={`w-full ${className}`} src={imgSrc} alt="Picture is not working" />
            )} */}
        </>
    );
};
