import { useContext, useState } from "react";
import { Container } from "../components/Container";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/UI/Button";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../core/auth/useAuth";
import { usePasswordVisibility } from "../hooks/usePasswordVisibility";

const INITIAL_FORM = { email: "", password: "" };

const LOGIN_FIELDS = [
    {
        containerClass: "flex flex-col gap-2",
        input: {
            name: "email",
            type: "email",
            placeholder: "admin@admin.com",
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
            placeholder: "1234",
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
    const { login } = useAuth();
    const { theme } = useContext(ThemeContext);
    const { visible, toggleVisible } = usePasswordVisibility();

    const onInputChange = (event) => {
        const { name, value } = event.target;

        setForm({ ...form, [name]: value });
    };

    const onLoginSubmit = async (event) => {
        event.preventDefault();
        await login(form);
        setForm(INITIAL_FORM);
    };

    return (
        <Container className="perfect-center flex-1">
            <div className={`flex flex-col gap-md bg-accent-color rounded-2xl shadow-landing-lg p-8`}>
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

                    <Button type="submit" className="justify-center rounded-full">
                        Entrar
                    </Button>
                </form>
            </div>
        </Container>
    );
};
