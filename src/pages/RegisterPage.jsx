import classNames from "classnames";
import { useCallback, useContext, useMemo, useState } from "react";
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
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../core/auth/useAuth";
import { RegisterVerificationFields } from "../helpers/FieldsVerificator";
import { useDevice } from "../hooks/useDevice";
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

function RegisterPage() {
    const [form, setForm] = useState(INITIAL_FORM_DATA);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useAuth();
    const { toasts, showToast, dismissToast } = useToast();

    const { theme } = useContext(ThemeContext);
    const { getText } = useContext(LanguageContext);

    const visibility1 = usePasswordVisibility();
    const visibility2 = usePasswordVisibility();
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();

    const registerPageConfig = useMemo(
        () => ({
            avatar: classNames({
                "w-10": isMobile2Xs,
                "w-11": isMobileXs,
                "w-12": isMobileSm,
                "w-13": isTablet,
                "w-14": isDesktop,
            }),
            containerClasses: classNames({
                "px-md py-sm rounded-md gap-xs": isMobile2Xs,
                "px-lg py-md rounded-md gap-sm": isMobileXs || isMobileSm || isTablet || isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const REGISTER_FORM_FIELDS = useMemo(
        () => [
            {
                containerClass: "flex flex-col gap-2",
                input: {
                    id: "name",
                    name: "name",
                    type: "text",
                    placeholder: getText("register_page.name_placeholder_field_text"),
                    label: "Campo nombre completo",
                    required: true,
                    className: "flex-1",
                },
                label: {
                    text: getText("user_data.full_name_field_text"),
                    className: "",
                },
            },
            {
                containerClass: "flex flex-col gap-2",
                input: {
                    id: "email",
                    name: "email",
                    type: "email",
                    placeholder: getText("register_page.email_placeholder_field_text"),
                    label: "Campo Correo Electrónico",
                    required: true,
                    className: "flex-1",
                },
                label: {
                    text: getText("user_data.email_field_text"),
                    className: "",
                },
            },
            {
                containerClass: "flex flex-col gap-2",
                input: {
                    id: "address",
                    name: "address",
                    type: "text",
                    placeholder: getText("register_page.address_placeholder_field_text"),
                    label: "Campo Direccion Personal",
                    required: true,
                    className: "flex-1",
                },
                label: {
                    text: getText("user_data.address_field_text"),
                    className: "",
                },
            },
            {
                containerClass: "flex flex-col gap-2",
                input: {
                    id: "password",
                    name: "password",
                    type: "password",
                    placeholder: getText("register_page.password_placeholder_field_text"),
                    label: "Campo contraseña",
                    required: true,
                    className: "rounded-r-none flex-1",
                },
                label: {
                    text: getText("user_data.password_field_text"),
                    className: "",
                },
            },
            {
                containerClass: "flex flex-col gap-2",
                input: {
                    id: "repassword",
                    name: "repassword",
                    type: "password",
                    placeholder: getText("register_page.confirm_password_placeholder_field_text"),
                    label: "Campo Confirmar Contraseña",
                    required: true,
                    className: "rounded-r-none flex-1",
                },
                label: {
                    text: getText("user_data.confirm_password_field_text"),
                    className: "",
                },
            },
        ],
        []
    );

    const onInputChange = useCallback(
        (event) => {
            if (isLoading) return;
            const { name, value } = event.target;
            setError("");

            setForm((prevValue) => ({ ...prevValue, [name]: value }));
        },
        [isLoading]
    );

    const onRegisterSubmit = useCallback(
        async (event) => {
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
                showToast(getText("register_page.toast_register_error"), "error", 1000);
            } finally {
                setIsLoading(false);
            }
        },
        [form]
    );

    const handleAvatarClick = useCallback((avatar) => {
        setForm((prev) => ({ ...prev, avatar: { url: avatar.url, alt: avatar.alt } }));
    }, []);

    return (
        <Container className="perfect-center flex-1 py-4">
            <div
                className={classNames(
                    "flex flex-col border shadow-md md:mx-auto md:w-[600px]",
                    registerPageConfig?.containerClasses,
                    {
                        "bg-accent-background border-text-color/50": theme === "light",
                        "bg-accent-background-dark border-text-color-dark/50": theme !== "light",
                    }
                )}
            >
                <h1>{getText("register_page.h1_register_page")}</h1>

                <form className="flex flex-col gap-sm" onSubmit={onRegisterSubmit}>
                    <Dropdown placement="bottom-full">
                        <DropdownTrigger className={"flex justify-start gap-2 p-0 flex-1"}>
                            <ImageContainer size={registerPageConfig.avatar}>
                                <Image className={`rounded-full`} src={form?.avatar?.url} />
                            </ImageContainer>
                            <Button variant={"ghost"} className="flex-1">
                                {form?.avatar?.alt ? form.avatar.alt : "Avatar"}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu classNameMenuContainer="flex-col">
                            {AVATAR_DATA.map((avatar) => (
                                <DropdownItem
                                    key={avatar.url}
                                    className="flex justify-start flex-1 items-center gap-3"
                                    onClick={() => handleAvatarClick(avatar)}
                                >
                                    <ImageContainer size={registerPageConfig.avatar}>
                                        <Image src={avatar.url} />
                                    </ImageContainer>
                                    <span className="flex">{avatar.alt}</span>
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
                        loadingText={getText("register_page.loading_register_button_text")}
                    >
                        {getText("register_page.register_button_text")}
                    </LoadingButton>
                </form>
            </div>
            <ToastContainer toasts={toasts} onClose={dismissToast} />
        </Container>
    );
}

export default RegisterPage;
