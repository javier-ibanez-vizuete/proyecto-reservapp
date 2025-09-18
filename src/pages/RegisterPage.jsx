import { useContext, useState } from "react";
import { Container } from "../components/Container";
import { Dropdown } from "../components/Dropdown/Dropdown";
import { DropdownItem } from "../components/Dropdown/DropdownItem";
import { DropdownMenu } from "../components/Dropdown/DropdownMenu";
import { DropdownTrigger } from "../components/Dropdown/DropdownTrigger";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/UI/Button";
import { Image } from "../components/UI/Image";
import { ImageContainer } from "../components/UI/ImageContainer";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../core/auth/useAuth";
import { usePasswordVisibility } from "../hooks/usePasswordVisibility";

const INITIAL_FORM_DATA = {
    name: "",
    email: "",
    address: "",
    password: "",
    repassword: "",
    avatar: {
        url: "/public/pictures/avatars/avatar-default.png",
        alt: "Avatar Desconocido",
    },
};

const AVATARS_OPTIONS = [
    {
        url: "/public/pictures/avatars/avatar-default.png",
        alt: "Avatar Desconocido",
    },
    {
        url: "/pictures/avatars/avatar-chef.png",
        alt: "Avatar Chef",
    },
    {
        url: "/pictures/avatars/avatar-spiderman.png",
        alt: "Avatar Spiderman",
    },
    {
        url: "/public/pictures/avatars/avatar-gaming.png",
        alt: "Avatar Developer",
    },
];

const REGISTER_FORM_FIELDS = [
    {
        containerClass: "flex flex-col gap-2",
        input: {
            id: "name",
            name: "name",
            type: "text",
            placeholder: "Nombre Completo",
            label: "Campo nombre completo",
            required: true,
            className: "flex-1",
        },
        label: {
            text: "Nombre Completo",
            className: "",
        },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            id: "email",
            name: "email",
            type: "email",
            placeholder: "usuario@usuario.com",
            label: "Campo Correo Electrónico",
            required: true,
            className: "flex-1",
        },
        label: {
            text: "Email",
            className: "",
        },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            id: "address",
            name: "address",
            type: "text",
            placeholder: "Calle Inventada, 12 Ciudad",
            label: "Campo Direccion Personal",
            required: true,
            className: "flex-1",
        },
        label: {
            text: "Dirección",
            className: "",
        },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            id: "password",
            name: "password",
            type: "password",
            placeholder: "123456789",
            label: "Campo contraseña",
            required: true,
            className: "rounded-r-none flex-1",
        },
        label: {
            text: "Contraseña",
            className: "",
        },
    },
    {
        containerClass: "flex flex-col gap-2",
        input: {
            id: "repassword",
            name: "repassword",
            type: "password",
            placeholder: "123456789",
            label: "Campo Confirmar Contraseña",
            required: true,
            className: "rounded-r-none flex-1",
        },
        label: {
            text: "Confirmar Contraseña",
            className: "",
        },
    },
];

export const RegisterPage = () => {
    const [form, setForm] = useState(INITIAL_FORM_DATA);
    const [error, setError] = useState("");
    const { register } = useAuth();

    const { theme } = useContext(ThemeContext);

    const visibility1 = usePasswordVisibility();
    const visibility2 = usePasswordVisibility();

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setError("");

        setForm((prevValue) => ({ ...prevValue, [name]: value }));
    };

    const onRegisterSubmit = async (event) => {
        event.preventDefault();

        const isError = RegisterVerificationFields(form);
        if (isError) return setError(isError);
        const { repassword, ...restForm } = form;

        console.log("Esto es el formulario acabado ", restForm);

        // await register(restForm);
        // setForm(INITIAL_FORM_DATA);
    };

    const handleAvatarClick = (avatar) => {
        setForm((prev) => ({ ...prev, avatar: { url: avatar.url }, alt: avatar.alt }));
    };

    return (
        <Container className="perfect-center flex-1 py-4">
            <div
                className={`flex flex-col gap-md rounded-2xl p-md ${
                    theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                }`}
            >
                <h1 className="">Registro</h1>

                <form className="flex flex-col gap-md" onSubmit={onRegisterSubmit}>
                    <Dropdown placement="bottom-start">
                        <DropdownTrigger className={"flex justify-start gap-2 p-0"}>
                            <ImageContainer className="w-14 ">
                                <Image className="rounded-xl" imgSrc={form?.avatar?.url} />
                            </ImageContainer>
                            <Button variant={"ghost"} className="flex-1">
                                Avatar
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu className="w-full">
                            {AVATARS_OPTIONS.map((avatar) => (
                                <DropdownItem
                                    key={avatar.url}
                                    className="flex items-center gap-3"
                                    onClick={() => handleAvatarClick(avatar)}
                                >
                                    <ImageContainer className="w-20">
                                        <Image imgSrc={avatar.url} />
                                    </ImageContainer>
                                    <span>{avatar.alt}</span>
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    {REGISTER_FORM_FIELDS.map(({ containerClass, input, label }) => {
                        const password1 = visibility1.visible && input.name === "password";
                        const password2 = visibility2.visible && input.name === "repassword";
                        const typeText = password1 || password2 ? "text" : input.type;

                        return (
                            <FormInput
                                key={input.id}
                                containerClass={containerClass}
                                input={{
                                    id: input.id,
                                    name: input.name,
                                    type: typeText,
                                    placeholder: input.placeholder,
                                    value: form[input.name],
                                    onChange: onInputChange,
                                    required: input.required,
                                    className: input.className,
                                }}
                                label={{
                                    text: label.text,
                                    className: label.className,
                                }}
                                onClick={
                                    input.name === "password"
                                        ? visibility1.toggleVisible
                                        : visibility2.toggleVisible
                                }
                                isPasswordVisible={
                                    input.name === "password" ? visibility1.visible : visibility2.visible
                                }
                            />
                        );
                    })}
                    {error && <h3>{error}</h3>}

                    <Button type="submit" className="justify-center rounded-full py-sm px-md mt-2">
                        Registrarse
                    </Button>
                </form>
            </div>
        </Container>
    );
};
