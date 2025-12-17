import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CTACard } from "../components/CTACard/CTACard";
import { ToastContainer } from "../components/ToastContainer";
import { AuthContext } from "../contexts/AuthContext";
import { getDataFromSessionStorage, removeFromSessionStorage } from "../helpers/storage";
import { useToast } from "../hooks/useToast";

import { ctaCardsData } from "../components/CTACard/ctaCardsData";
import { Container } from "../components/Container";
import { ConfirmModal } from "../components/Modal";
import { useTranslate } from "../translations/useTranslate";

function HomePage() {
    const [showNotFoundModal, setShowNotFoundModal] = useState(false);
    const [notFoundRoute, setNotFoundRoute] = useState("");
    const { t } = useTranslate();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const { toasts, showToast, dismissToast } = useToast();

    console.log("Render HomePage.jsx");

    useEffect(() => {
        const fromLogin =
            location.state?.fromLogin === true || getDataFromSessionStorage("fromLogin") === true;
        const fromRegister =
            location.state?.fromRegister === true || getDataFromSessionStorage("fromRegister") === true;
        const fromLogout =
            location?.state?.logoutSuccess === true || getDataFromSessionStorage("logoutSuccess") === true;

        const fromNotFound = location?.state?.errorRoute === true;

        if (!fromLogin && !fromRegister && !fromLogout && !fromNotFound) return;

        if (fromLogin) {
            showToast(t("home_page.toast_login_success"), "success", 2000, "top-center");
            removeFromSessionStorage("fromLogin");
            navigate(location.pathname, { replace: true, state: {} });
        }
        if (fromRegister) {
            showToast(
                `${t("home_page.toast_welcome_register")} ${
                    user?.name || t("navigation_bar.user_replace_name")
                }.`,
                "success",
                2000,
                "top-center"
            );
            removeFromSessionStorage("fromRegister");
            navigate(location.pathname, { replace: true, state: {} });
        }
        if (fromLogout) {
            showToast(t("home_page.toast_logout_success"), "success");
            removeFromSessionStorage("logoutSuccess");
            navigate(location.pathname, { replace: true, state: {} });
        }

        if (fromNotFound) {
            setShowNotFoundModal(true);
            setNotFoundRoute(location.state.intendedRoute);

            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state]);

    const handleRedirectCTA = useCallback((url) => {
        navigate(url);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowNotFoundModal(false);
        setNotFoundRoute("");
    }, []);

    return (
        <Container className="flex flex-col flex-1 gap-2 lg:gap-4 py-4">
            <h1>{t("home_page.h1_home_page")}</h1>

            <div className="flex flex-col gap-4 lg:gap-8">
                {ctaCardsData.map(
                    ({ id, title, description, buttonText, imageSrc, imageAlt, redirectTo }, index) => {
                        if (redirectTo === "/login" && user) return;

                        return (
                            <CTACard
                                key={id}
                                title={title}
                                description={description}
                                buttonText={buttonText}
                                variant="accent"
                                imageSrc={imageSrc}
                                imageAlt={imageAlt}
                                imagePosition={index % 2 === 0 ? "left" : "right"}
                                onButtonClick={() => handleRedirectCTA(redirectTo)}
                                buttonHref={redirectTo}
                            />
                        );
                    }
                )}
            </div>

            <ConfirmModal
                isOpen={showNotFoundModal}
                onClose={handleCloseModal}
                onConfirm={handleCloseModal}
                title="Not Found 404"
                message={`Route: ${notFoundRoute}`}
                confirmText="Entendido"
                showCloseButton={false}
                variantButton="primary"
                variant="accent"
            />
            <ToastContainer toasts={toasts} onClose={dismissToast} />
        </Container>
    );
}

export default HomePage;
