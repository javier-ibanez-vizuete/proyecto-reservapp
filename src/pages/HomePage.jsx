import { useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "../components/Container";
import { ToastContainer } from "../components/ToastContainer";
import { LanguageContext } from "../contexts/LanguageContext";
import { useToast } from "../hooks/useToast";

export const HomePage = () => {
    const { getText } = useContext(LanguageContext);
    const location = useLocation();
    const navigate = useNavigate();

    const toast = useToast();
    const hasShow = useRef(false);

    useEffect(() => {
        const fromLogin = location.state?.fromLogin === true;
        if (!fromLogin) return;

        if (fromLogin && !hasShow.current) {
            console.log("que vale toast", toast);
            toast.showToast("Sesion iniciada con Exito", "success");
            hasShow.current = true;

            navigate(location.pathname, { replace: true, state: {} });
        }
    }, []);

    return (
        <div className="flex flex-col flex-1">
            <Container className="">
                <h1>{getText("h1HomePage")}</h1>
                <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
            </Container>
        </div>
    );
};
