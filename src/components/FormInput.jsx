import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Input } from "./UI/Input";

import { Image } from "./UI/Image";
import { ImageContainer } from "./UI/ImageContainer";

import iconClosedEye from "../assets/icons/icon-closed-eye.svg";
import iconEye from "../assets/icons/icon-eye.svg";

export const FormInput = ({ containerClass, input, label, onClick, ...props }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={containerClass}>
            <label htmlFor={input.name} className={`${label.className}`}>
                {label.text}
            </label>
            <div className={`flex justify-center flex-1`}>
                <Input
                    id={input.name}
                    name={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={input.value}
                    onChange={input.onChange}
                    required={input.required}
                    className={input.className}
                />
                {input?.name === "password" && (
                    <button
                        type="button"
                        className={`py-md px-xl rounded-r-xl border-0 -ml-0.5 perfect-center rounded-l-none bg-white`}
                        onClick={() => {
                            console.log("Haciendo Click");
                            onClick();
                        }}
                    >
                        <ImageContainer className="w-xl">
                            <Image imgSrc={props.isPasswordVisible ? iconEye : iconClosedEye} />
                        </ImageContainer>
                    </button>
                )}
            </div>
        </div>
    );
};
