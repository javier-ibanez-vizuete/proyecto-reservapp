import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CTACard } from "../components/CTACard/CTACard";
import { ToastContainer } from "../components/ToastContainer";
import { AuthContext } from "../contexts/AuthContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { getDataFromSessionStorage, removeFromSessionStorage } from "../helpers/storage";
import { useToast } from "../hooks/useToast";

import { ctaCardsData } from "../components/CTACard/ctaCardsData";
import { Container } from "../components/Container";
import { ConfirmModal } from "../components/Modal";

export const HomePage = () => {
    const [showNotFoundModal, setShowNotFoundModal] = useState(false);
    const [notFoundRoute, setNotFoundRoute] = useState("");
    const { getText } = useContext(LanguageContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const { toasts, showToast, dismissToast } = useToast();

    useEffect(() => {
        const fromLogin =
            location.state?.fromLogin === true || getDataFromSessionStorage("fromLogin") === true;
        const fromRegister =
            location.state?.fromRegister === true || getDataFromSessionStorage("fromRegister") === true;
        const fromLogout =
            location?.state?.logoutSuccess === true || getDataFromSessionStorage("logoutSuccess") === true;

        const fromNotFound = location?.state?.errorRoute === true;
        console.log(fromNotFound);

        if (!fromLogin && !fromRegister && !fromLogout && !fromNotFound) return;

        console.log("Pasando por aqui");
        if (fromLogin) {
            showToast(getText("toastLoginSuccess"), "success", 2000, "top-center");
            removeFromSessionStorage("fromLogin");
            navigate(location.pathname, { replace: true, state: {} });
        }
        if (fromRegister) {
            showToast(
                `${getText("toastWelcomeRegister")} ${user?.name || getText("userReplaceName")}.`,
                "success",
                2000,
                "top-center"
            );
            removeFromSessionStorage("fromRegister");
            navigate(location.pathname, { replace: true, state: {} });
        }
        if (fromLogout) {
            showToast(getText("toastLogoutSuccess"), "success");
            removeFromSessionStorage("logoutSuccess");
            console.log("Eliminando user 'fromLogout-homePage'=>", user);
            console.log("Que ruta tengo aqui", location.pathname);

            navigate(location.pathname, { replace: true, state: {} });
        }

        if (fromNotFound) {
            setShowNotFoundModal(true);
            setNotFoundRoute(location.state.intendedRoute);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state]);

    const handleRedirectCTA = (url) => {
        navigate(url);
    };

    const handleCloseModal = () => {
        setShowNotFoundModal(false);
        setNotFoundRoute("");
    };

    return (
        <Container className="flex flex-col flex-1 gap-2 lg:gap-4 py-4">
            <h1>{getText("h1HomePage")}</h1>

            <div className="flex flex-col gap-4 lg:gap-8">
                {ctaCardsData.map(
                    (
                        { id, title, description, buttonText, imageSrc, imageAlt, imagePosition, redirectTo },
                        index
                    ) => {
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
};
