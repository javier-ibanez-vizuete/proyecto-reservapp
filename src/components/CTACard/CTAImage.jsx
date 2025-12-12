import { Image } from "../UI/Image";
import { ImageContainer } from "../UI/ImageContainer";

export const CTAImage = ({ src, alt, className }) => {
    return (
        <div className={`relative h-64 md:h-auto ${className}`}>
            <ImageContainer>
                <Image src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
            </ImageContainer>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
        </div>
    );
};
