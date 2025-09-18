import { useState } from "react";
import { Container } from "../components/Container";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/UI/Button";
import { useAuth } from "../core/auth/useAuth";
import { usePasswordVisibility } from "../hooks/usePasswordVisibility";

const INITIAL_FORM_DATA = {
    name: "",
    email: "",
    address: "",
    password: "",
    repassword: "",
};

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

    return (
        <Container className="perfect-center flex-1">
            <div className="flex flex-col gap-md bg-accent-color rounded-2xl p-md">
                <h2 className="">Registro</h2>

                <form className="flex flex-col gap-md" onSubmit={onRegisterSubmit}>
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

                    <Button type="submit" className="justify-center rounded-full py-sm px-md">
                        Registrarse
                    </Button>
                </form>
            </div>
        </Container>
    );
};
