import { useContext } from "react";
import { replace, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { CartsContext } from "../../contexts/CartsContext";
import { saveDataInSessionStorage } from "../../helpers/storage";
import { removeCartFromLocalStorage } from "../cart/cart.service";
import { useCart } from "../cart/useCart";
import { getProfileApi, loginApi, logoutApi, registerApi } from "./auth.api";
import {
    removeTokenFromLocalStorage,
    removeUserFromLocalStorage,
    saveTokenInLocalStorage,
    saveUserInLocalStorage,
} from "./auth.service";

export const useAuth = () => {
    const { setUser } = useContext(AuthContext);
    const { setCart } = useContext(CartsContext);
    const { getCartMe } = useCart();

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

                console.log("Estoy llegando a navigate");
                navigate("/", { state: { fromLogin: true } });
                saveDataInSessionStorage("fromLogin", true);
            }
        } catch (err) {
            console.log("El login no ha podido Completarse 'useAuth-login()'", err);
        }

        // Si la API nos dice error, mostramos un mensaje de error
    };

    const logout = async () => {
        // Lógica de cierre de sesión
        try {
            console.log("Cerrando sesión");

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
            console.log("El Logout no ha podido completarse", err);
        }
    };

    const register = async (user) => {
        // Enviar a la API de autenticación
        try {
            console.log(`Registrando al usuario: ${user.email} y password: ${user.password}`);

            const authData = await registerApi(user);

            if (authData) {
                saveTokenInLocalStorage(authData.token);
                saveUserInLocalStorage(authData.user);
                setUser(authData.user);
                await getCartMe(authData.user.id);
                navigate("/", { state: { fromRegister: true } }, replace);
                saveDataInSessionStorage("fromRegister", true);
            }
        } catch (error) {
            console.log("ERROR", error);
        }
        // Si la API nos dice error, mostramos un mensaje de error
    };

    const getProfile = async () => {
        // Lógica para obtener el usuario actual
        console.log("Obteniendo usuario actual");
        try {
            const { user } = await getProfileApi();

            if (user) {
                console.log("La api dice que hay usuario", user);
            } else {
                console.log("NO hay usuario");
            }
        } catch (err) {}
    };

    return { login, logout, register, getProfile };
};
