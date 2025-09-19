import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "../components/Container";
import { ToastContainer } from "../components/ToastContainer";
import { AuthContext } from "../contexts/AuthContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { getDataFromSessionStorage, removeFromSessionStorage } from "../helpers/storage";
import { useToast } from "../hooks/useToast";

export const HomePage = () => {
    const { getText } = useContext(LanguageContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const toast = useToast();
    useEffect(() => {
        const fromLogin =
            location.state?.fromLogin === true || getDataFromSessionStorage("fromLogin") === true;
        const fromRegister =
            location.state?.fromRegister === true || getDataFromSessionStorage("fromRegister") === true;

        if (!fromLogin && !fromRegister) return;

        if (fromLogin) {
            toast.showToast("Sesion iniciada con Exito", "success");
            navigate(location.pathname, { replace: true, state: {} });
            removeFromSessionStorage("fromLogin");
        }
        if (fromRegister) {
            toast.showToast(`Welcome ${user?.name || "User"}.`, "success", 4000, "top-right");
            navigate(location.pathname, { replace: true, state: {} });
            removeFromSessionStorage("fromRegister");
        }
    }, [location.state]);

    return (
        <div className="flex flex-col flex-1">
            <Container className="">
                <h1>{getText("h1HomePage")}</h1>

                <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
            </Container>
        </div>
    );
};
