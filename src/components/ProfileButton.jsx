import { memo, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { useAuth } from "../core/auth/useAuth";
import { useLoading } from "../hooks/useLoading";
import { useToast } from "../hooks/useToast";
import { Avatar } from "./Avatar";
import { Dropdown } from "./Dropdown/Dropdown";
import { DropdownMenu } from "./Dropdown/DropdownMenu";
import { DropdownTrigger } from "./Dropdown/DropdownTrigger";
import { LoadingButton } from "./Spinner/LoadingButton";
import { ToastContainer } from "./ToastContainer";
import { Button } from "./UI/Button";

export const ProfileButton = memo(({ onClick }) => {
    const { user } = useContext(AuthContext);
    const { logout } = useAuth();

    const { isLoading, setIsLoading } = useLoading();
    const { toasts, showToast, dismissToast } = useToast();
    const navigate = useNavigate();

    const { getText } = useContext(LanguageContext);

    const handleGoProfile = useCallback(() => navigate("/user"), [navigate]);

    const handleLogout = useCallback(async () => {
        setIsLoading(true);
        try {
            await logout();
        } catch (err) {
            console.error("Hubo un problema con el Logouut 'Navbar-handleLogout()'", err);
            showToast(getText("navigation_bar.toast_logout_error"), "error", 2000);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <Dropdown placement="bottom-end" onClick={onClick}>
            <DropdownTrigger btnStyle={false} hasIcon={false} className={"lg:hover:-translate-y-[2px]"}>
                <Avatar
                    avatar={user?.avatar}
                    alt="Avatar"
                    online={user?.isActive}
                    fallback={user?.name}
                    className={"shadow-lg"}
                />
            </DropdownTrigger>
            <DropdownMenu gap="gap-2" classNameMenuContainer="flex-col">
                <Button className="flex-1" variant="primary" onClick={handleGoProfile}>
                    {getText("navigation_bar.profile_page_button")}
                </Button>
                <LoadingButton
                    loading={isLoading}
                    loadingText={getText("navigation_bar.loading_text_logout_button")}
                    variant="danger"
                    onClick={handleLogout}
                >
                    {getText("navigation_bar.logout_button")}
                </LoadingButton>
            </DropdownMenu>
            <ToastContainer toasts={toasts} onClose={dismissToast} />
        </Dropdown>
    );
});
