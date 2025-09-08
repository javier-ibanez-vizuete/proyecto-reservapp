import { useEffect, useState } from "react";

export const Image = ({ imageData = {}, alt = "", className = "" }) => {
    const [dataImage, setDataImage] = useState(() => imageData || {});

    useEffect(() => {
        setDataImage({ ...imageData });
    }, [imageData]);

    return (
        <>
            {dataImage?.avif && <source srcSet={dataImage.avif} type="image/avif" />}
            {dataImage?.webp && <source srcSet={dataImage.avif} type="image/webp" />}
            {dataImage?.default ? (
                <img
                    className={`w-full ${className}`}
                    src={dataImage?.default}
                    alt={alt ? alt : dataImage?.alt || ""}
                />
            ) : (
                <img className={`w-full ${className}`} src="#" alt="Picture is not working" />
            )}
        </>
    );
};
