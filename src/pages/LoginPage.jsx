import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Container } from "../components/Container";
import { FormInput } from "../components/FormInput";
import { LoadingButton } from "../components/Spinner/LoadingButton";
import { ToastContainer } from "../components/ToastContainer";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../core/auth/useAuth";
import { LoginVerificationFields } from "../helpers/FieldsVerificator";
import { useDevice } from "../hooks/useDevice";
import { usePasswordVisibility } from "../hooks/usePasswordVisibility";
import { useToast } from "../hooks/useToast";

const INITIAL_FORM = { email: "", password: "" };

const LOGIN_FIELDS = [
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "email",
            type: "email",
            placeholder: "email@example.com",
            label: "Email",
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
            name: "password",
            type: "password",
            placeholder: "passwordexample1",
            required: true,
            className: "rounded-r-none flex-1",
        },
        label: {
            text: "Contraseña",
            className: "",
        },
    },
];

export const LoginPage = () => {
    const [form, setForm] = useState(INITIAL_FORM);
    const [error, setError] = useState("");
    const [isLoading, setIsloading] = useState(false);

    const { user } = useContext(AuthContext);
    const { toasts, showToast, dismissToast } = useToast();
    const { login } = useAuth();
    const { theme } = useContext(ThemeContext);
    const { isMobile } = useDevice();
    const { visible, toggleVisible } = usePasswordVisibility();

    const onInputChange = (event) => {
        if (isLoading) return;
        const { name, value } = event.target;
        setError("");

        setForm({ ...form, [name]: value });
    };

    const onLoginSubmit = async (event) => {
        try {
            event.preventDefault();

            const isError = LoginVerificationFields(form);
            if (isError) return setError(isError);
            setIsloading(true);

            await login(form);
            setForm(INITIAL_FORM);
        } catch (error) {
            setForm(INITIAL_FORM);
            showToast("Algo ha salido mal", "error", 4000, "top-right");
        } finally {
            setIsloading(false);
        }
    };

    if (user) {
        return <Navigate to={"/"} replace />;
    }

    return (
        <Container className="flex flex-col justify-center flex-1">
            <div
                className={`flex flex-col gap-md ${
                    theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                } rounded-2xl shadow-landing-lg xs:p-6 2xs:py-6 2xs:px-2 sm:p-8 md:p-10`}
            >
                <h2 className={`${theme === "light" ? "text-text-color" : "text-text-color-dark"}`}>
                    Iniciar sesión
                </h2>

                <form className="flex flex-col gap-5" onSubmit={onLoginSubmit}>
                    {LOGIN_FIELDS.map(({ label, input, containerClass }) => {
                        const inputText = visible && input.name === "password" ? "text" : input.type;

                        return (
                            <FormInput
                                key={input.name}
                                containerClass={containerClass}
                                input={{
                                    name: input.name,
                                    type: inputText,
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
                                onClick={toggleVisible}
                                isPasswordVisible={visible}
                            />
                        );
                    })}
                    {error && <span className="italic font-semibold text-error-600">{error}</span>}

                    <LoadingButton
                        loading={isLoading}
                        type="submit"
                        variant="primary"
                        size={isMobile ? "md" : "lg"}
                        loadingText="Login in..."
                    >
                        Iniciar Sesion
                    </LoadingButton>
                </form>
            </div>

            <ToastContainer toasts={toasts} onClose={dismissToast} />
        </Container>
    );
};
