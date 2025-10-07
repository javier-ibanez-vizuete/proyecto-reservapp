import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CTACard } from "../components/CTACard/CTACard";
import { ToastContainer } from "../components/ToastContainer";
import { AuthContext } from "../contexts/AuthContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { getDataFromSessionStorage, removeFromSessionStorage } from "../helpers/storage";
import { useToast } from "../hooks/useToast";

import { ctaCardsData } from "../components/CTACard/ctaCardsData";
import { Container } from "../components/Container";

export const HomePage = () => {
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

        if (!fromLogin && !fromRegister && !fromLogout) return;

        if (fromLogin) {
            showToast(getText("toastLoginSuccess"), "success", 2000, "top-center");
            navigate(location.pathname, { replace: true, state: {} });
            removeFromSessionStorage("fromLogin");
        }
        if (fromRegister) {
            showToast(
                `${getText("toastWelcomeRegister")} ${user?.name || getText("userReplaceName")}.`,
                "success",
                2000,
                "top-center"
            );
            navigate(location.pathname, { replace: true, state: {} });
            removeFromSessionStorage("fromRegister");
        }
        if (fromLogout) {
            showToast(getText("toastLogoutSuccess"), "success");
            navigate(location.pathname, { replace: true, state: {} });
            removeFromSessionStorage("logoutSuccess");
        }
    }, [location.state]);

    const handleRedirectCTA = (url) => {
        navigate(url);
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
            <ToastContainer toasts={toasts} onClose={dismissToast} />
        </Container>
    );
};
