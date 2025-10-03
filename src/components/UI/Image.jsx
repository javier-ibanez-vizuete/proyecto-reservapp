import { useEffect, useState } from "react";

export const Image = ({ imageData = {}, alt = "", className = "", imgSrc = "", onLoad = () => {} }) => {
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
                        onLoad={onLoad}
                    />
                </>
            )}
            {imgSrc && (
                <img
                    className={`w-full ${className}`}
                    src={imgSrc}
                    alt="Picture is not working"
                    onLoad={onLoad}
                />
            )}

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
