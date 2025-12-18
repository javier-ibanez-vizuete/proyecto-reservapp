import classNames from "classnames/bind";
import { useCallback, useContext, useMemo, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
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
import { useTranslate } from "../translations/useTranslate";

const INITIAL_FORM = { email: "", password: "" };

function LoginPage() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [error, setError] = useState("");
    const [isLoading, setIsloading] = useState(false);

    const { user } = useContext(AuthContext);
    const { toasts, showToast, dismissToast } = useToast();
    const { login } = useAuth();
    const { theme } = useContext(ThemeContext);
    const { isMobile2Xs, isMobileXs, isMobileSm, isMobile, isTablet, isDesktop } = useDevice();
    const { visible, toggleVisible } = usePasswordVisibility();
    const { t } = useTranslate();

    const location = useLocation();

    const loginContainerConfig = useMemo(
        () =>
            classNames({
                "px-md py-sm rounded-md gap-xs": isMobile2Xs,
                "px-lg py-md rounded-md gap-sm": isMobileXs || isMobileSm || isTablet || isDesktop,
            }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const LOGIN_FIELDS = [
        {
            containerClass: "flex flex-col gap-2",
            input: {
                name: "email",
                type: "email",
                placeholder: t("register_page.email_placeholder_field_text"),
                label: "Email",
                required: true,
                className: "flex-1",
            },
            label: {
                text: t("user_data.email_field_text"),
                className: "",
            },
        },
        {
            containerClass: "flex flex-col gap-2",
            input: {
                name: "password",
                type: "password",
                placeholder: t("register_page.password_placeholder_field_text"),
                required: true,
                className: "rounded-r-none flex-1",
            },
            label: {
                text: t("user_data.password_field_text"),
                className: "",
            },
        },
    ];

    const onInputChange = (event) => {
        if (isLoading) return;
        const { name, value } = event.target;
        setError("");

        setForm({ ...form, [name]: value });
    };

    const onLoginSubmit = useCallback(
        async (event) => {
            try {
                event.preventDefault();

                const isError = LoginVerificationFields(form);
                if (isError) return setError(isError);
                setIsloading(true);

                await login(form);
                setForm(INITIAL_FORM);
            } catch (error) {
                setForm(INITIAL_FORM);
                showToast(t("login_page.toast_login_error"), "error", 1000);
            } finally {
                setIsloading(false);
            }
        },
        [form]
    );

    const currentContainerConfig = useMemo(
        () =>
            classNames("flex flex-col border shadow-md md:mx-auto md:w-[600px]", loginContainerConfig, {
                "bg-accent-background border-text-color/50": theme === "light",
                "bg-accent-background-dark border-text-color-dark/50": theme !== "light",
            }),
        [theme, loginContainerConfig]
    );

    if (user) {
        return <Navigate to={"/"} replace />;
    }

    return (
        <Container className="flex flex-col justify-center flex-1">
            <div
                className={currentContainerConfig}
                // className={`flex flex-col gap-md ${
                //     theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                // } rounded-2xl shadow-md xs:p-6 2xs:py-6 2xs:px-2 sm:p-8 md:p-10 max-w-[800px] mx-auto`}
            >
                <h1>{t("login_page.h1_login_page")}</h1>
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
                    {error && <span className="italic font-semibold text-error-600">{t(error)}</span>}

                    <LoadingButton
                        loading={isLoading}
                        type="submit"
                        variant="primary"
                        size={isMobile ? "md" : "lg"}
                        loadingText={t("login_page.loading_login_button_text")}
                    >
                        {t("navigation_bar.login_button")}
                    </LoadingButton>
                </form>
                <div className="flex items-center gap-2">
                    <small className="text-2xs">¿No tienes cuenta?</small>
                    <Link to={"/register"} state={location.state || null} className="font-bold text-sm">
                        Registrate
                    </Link>
                </div>
            </div>

            <ToastContainer toasts={toasts} onClose={dismissToast} />
        </Container>
    );
}

export default LoginPage;
