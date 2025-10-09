import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Container } from "../components/Container";
import { Dropdown } from "../components/Dropdown/Dropdown";
import { DropdownItem } from "../components/Dropdown/DropdownItem";
import { DropdownMenu } from "../components/Dropdown/DropdownMenu";
import { DropdownTrigger } from "../components/Dropdown/DropdownTrigger";
import { FormInput } from "../components/FormInput";
import { LoadingButton } from "../components/Spinner/LoadingButton";
import { ToastContainer } from "../components/ToastContainer";
import { Button } from "../components/UI/Button";
import { Image } from "../components/UI/Image";
import { ImageContainer } from "../components/UI/ImageContainer";
import { AuthContext } from "../contexts/AuthContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../core/auth/useAuth";
import { RegisterVerificationFields } from "../helpers/FieldsVerificator";
import { usePasswordVisibility } from "../hooks/usePasswordVisibility";
import { useToast } from "../hooks/useToast";
import { AVATAR_DATA } from "../utils/AVATAR_DATA";

const INITIAL_FORM_DATA = {
    name: "",
    email: "",
    address: "",
    password: "",
    repassword: "",
    avatar: {
        url: "/pictures/avatars/avatar-default.png",
        alt: "Avatar Desconocido",
    },
};

export const RegisterPage = () => {
    const [form, setForm] = useState(INITIAL_FORM_DATA);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useAuth();
    const { toasts, showToast, dismissToast } = useToast();

    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const { getText } = useContext(LanguageContext);

    const visibility1 = usePasswordVisibility();
    const visibility2 = usePasswordVisibility();

    const REGISTER_FORM_FIELDS = [
        {
            containerClass: "flex flex-col gap-2",
            input: {
                id: "name",
                name: "name",
                type: "text",
                placeholder: getText("namePlaceholderFieldText"),
                label: "Campo nombre completo",
                required: true,
                className: "flex-1",
            },
            label: {
                text: getText("fullNameFieldText"),
                className: "",
            },
        },
        {
            containerClass: "flex flex-col gap-2",
            input: {
                id: "email",
                name: "email",
                type: "email",
                placeholder: getText("emailPlaceholderFieldText"),
                label: "Campo Correo Electrónico",
                required: true,
                className: "flex-1",
            },
            label: {
                text: getText("emailFieldText"),
                className: "",
            },
        },
        {
            containerClass: "flex flex-col gap-2",
            input: {
                id: "address",
                name: "address",
                type: "text",
                placeholder: getText("addressPlaceholderFieldText"),
                label: "Campo Direccion Personal",
                required: true,
                className: "flex-1",
            },
            label: {
                text: getText("addressFieldText"),
                className: "",
            },
        },
        {
            containerClass: "flex flex-col gap-2",
            input: {
                id: "password",
                name: "password",
                type: "password",
                placeholder: getText("passwordPlaceholderFieldText"),
                label: "Campo contraseña",
                required: true,
                className: "rounded-r-none flex-1",
            },
            label: {
                text: getText("passwordFieldText"),
                className: "",
            },
        },
        {
            containerClass: "flex flex-col gap-2",
            input: {
                id: "repassword",
                name: "repassword",
                type: "password",
                placeholder: getText("confirmPasswordPlaceholderFieldText"),
                label: "Campo Confirmar Contraseña",
                required: true,
                className: "rounded-r-none flex-1",
            },
            label: {
                text: getText("confirmPasswordFieldText"),
                className: "",
            },
        },
    ];

    const onInputChange = (event) => {
        if (isLoading) return;
        const { name, value } = event.target;
        setError("");

        setForm((prevValue) => ({ ...prevValue, [name]: value }));
    };

    const onRegisterSubmit = async (event) => {
        try {
            event.preventDefault();

            const isError = RegisterVerificationFields(form);
            if (isError) return setError(isError);
            setIsLoading(true);
            const { repassword, ...restForm } = form;

            await register(restForm);
            setForm(INITIAL_FORM_DATA);
        } catch (err) {
            setForm(INITIAL_FORM_DATA);
            showToast(getText("toastRegisterError"), "error", 1000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAvatarClick = (avatar) => {
        setForm((prev) => ({ ...prev, avatar: { url: avatar.url, alt: avatar.alt } }));
    };

    if (user) {
        return <Navigate to={"/home"} replace />;
    }

    return (
        <Container className="perfect-center flex-1 py-4">
            <div
                className={`flex flex-col gap-md rounded-2xl p-md lg:p-lg ${
                    theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                }`}
            >
                <h1>{getText("h1RegisterPage")}</h1>

                <form className="flex flex-col gap-sm" onSubmit={onRegisterSubmit}>
                    <Dropdown placement="bottom-start">
                        <DropdownTrigger className={"flex justify-start gap-2 p-0 flex-1"}>
                            <ImageContainer className="w-14">
                                <Image className="rounded-xl" src={form?.avatar?.url} />
                            </ImageContainer>
                            <Button variant={"ghost"} className="flex-1">
                                {form?.avatar?.alt ? form.avatar.alt : "Avatar"}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu classNameMenuContainer="flex-col">
                            {AVATAR_DATA.map((avatar) => (
                                <DropdownItem
                                    key={avatar.url}
                                    className="flex items-center gap-3"
                                    onClick={() => handleAvatarClick(avatar)}
                                >
                                    <ImageContainer className="w-20">
                                        <Image src={avatar.url} />
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
                    {error && <span className="italic font-semibold text-error-600">{getText(error)}</span>}

                    <LoadingButton
                        type="submit"
                        loading={isLoading}
                        variant={"secondary"}
                        className="justify-center rounded-full py-sm px-md mt-2"
                        loadingText={getText("loadingRegisterButtonText")}
                    >
                        {getText("registerButtonText")}
                    </LoadingButton>
                </form>
            </div>
            <ToastContainer toasts={toasts} onClose={dismissToast} />
        </Container>
    );
};
