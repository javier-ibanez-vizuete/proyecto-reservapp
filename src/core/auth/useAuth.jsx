import { useContext } from "react";
import { replace, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { CartsContext } from "../../contexts/CartsContext";
import { saveDataInSessionStorage } from "../../helpers/storage";
import { useLoading } from "../../hooks/useLoading";
import { removeCartFromLocalStorage } from "../cart/cart.service";
import { useCart } from "../cart/useCart";
import { getProfileApi, loginApi, logoutApi, patchUserApi, registerApi } from "./auth.api";
import {
    removeTokenFromLocalStorage,
    removeUserFromLocalStorage,
    saveTokenInLocalStorage,
    saveUserInLocalStorage,
} from "./auth.service";

export const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);
    const { setCart } = useContext(CartsContext);
    const { getCartMe } = useCart();
    const loadingUserMe = useLoading();

    const navigate = useNavigate();

    const login = async ({ email, password }) => {
        // Enviar a la API de autenticación
        try {
            const authData = await loginApi({ email, password });

            if (authData) {
                saveTokenInLocalStorage(authData.token);
                saveUserInLocalStorage(authData.user);
                setUser(authData.user);
                await getCartMe(authData.user.id);

                navigate("/", { state: { fromLogin: true } });
                saveDataInSessionStorage("fromLogin", true);
            }
        } catch (err) {
            console.error("El login no ha podido Completarse 'useAuth-login()'", err);
        }

        // Si la API nos dice error, mostramos un mensaje de error
    };

    const logout = async () => {
        // Lógica de cierre de sesión
        try {
            const logoutResponse = await logoutApi();

            if (logoutResponse?.logout) {
                removeUserFromLocalStorage();
                removeTokenFromLocalStorage();
                setUser(false);
                setCart(null);
                removeCartFromLocalStorage();
                navigate("/", { state: { logoutSuccess: true } });
                saveDataInSessionStorage("logoutSuccess", true);
            }
        } catch (err) {
            console.error("El Logout no ha podido completarse", err);
        }
    };

    const register = async (user) => {
        // Enviar a la API de autenticación
        try {
            const authData = await registerApi(user);

            if (authData) {
                saveTokenInLocalStorage(authData.token);
                saveUserInLocalStorage(authData.user);
                setUser(authData.user);
                await getCartMe(authData.user.id);
                navigate("/", { state: { fromRegister: true } }, replace);
                saveDataInSessionStorage("fromRegister", true);
            }
        } catch (err) {
            console.error("ERROR", err);
        }
    };

    const getProfile = async () => {
        loadingUserMe.setIsLoading(true);
        try {
            const fullUser = await getProfileApi();
            if (!fullUser) throw new Error("No se ha obtenido user");
            return fullUser;
        } catch (err) {
            throw err;
        } finally {
            loadingUserMe.setIsLoading(false);
        }
    };

    const patchUser = async (newUserData) => {
        try {
            console.log("que vale user.id", user.id);

            const updatedUser = await patchUserApi(user.id, newUserData);
            console.log("Que vale UpdateUser", updatedUser);

            if (!updatedUser) throw new Error("Error updating User");
            setUser(updatedUser);
            saveUserInLocalStorage(updatedUser);
            return updatedUser;
        } catch (err) {
            throw err;
        }
    };

    return { login, logout, register, getProfile, patchUser, loadingUserMe };
};
