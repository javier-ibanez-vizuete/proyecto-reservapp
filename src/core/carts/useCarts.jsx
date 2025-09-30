import { useContext, useState } from "react";
import { CartsContext } from "../../contexts/CartsContext";
import {
    deleteCartsItemApi,
    getCartsApi,
    getCartsByIdApi,
    patchCartsItemApi,
    postCartsApi,
    postCartsItemApi,
} from "./carts.api";
import { saveCartsInLocalStorage } from "./carts.service";

export const useCarts = () => {
    const [isLoading, setIsloading] = useState(false);
    const { setCarts } = useContext(CartsContext);

    const getCarts = async () => {
        setIsloading(true);
        try {
            const carts = await getCartsApi();
            if (carts && carts?.length) {
                setCarts(carts);
                saveCartsInLocalStorage(carts);
            }
            if (!carts?.length) console.error("NO HAY CARRITOS");
        } catch (err) {
            console.error("ALGO SALIÓ MAL en getCarts", err);
            throw err;
        } finally {
            setIsloading(false);
        }
    };

    const getCartsById = async (id) => {
        setIsloading(true);
        try {
            const cart = await getCartsByIdApi(id);
            if (cart) {
                setCarts(cart);
                saveCartsInLocalStorage(cart);
            }
            if (!cart) console.error("NO HAY CARRITO");
        } catch (err) {
            console.error("Algo salió mal en getCartsById", err);
            throw err;
        } finally {
            setIsloading(false);
        }
    };

    const postCarts = async (userId) => {
        setIsloading(true);
        try {
            const cart = await postCartsApi(userId);
            if (!cart) return console.error("NO SE HA POSTEADO EL CARRITO");
            setCarts(cart);
            saveCartsInLocalStorage(cart);
            return cart;
        } catch (err) {
            console.error("Algo ha salido mal en postCarts", err);
            throw err;
        } finally {
            setIsloading(false);
        }
    };

    const postCartsItem = async (cartId, newItem) => {
        setIsloading(true);
        try {
            const updatedCart = await postCartsItemApi(cartId, newItem);
            if (!updatedCart) return console.error("NO SE HA AÑADIDO EL PRODUCTO AL CARRITO");
            setCarts(updatedCart);
            saveCartsInLocalStorage(updatedCart);
            return updatedCart;
        } catch (err) {
            console.error("Algo ha salido mal en postCartsItem", err);
            throw err;
        } finally {
            setIsloading(false);
        }
    };

    const patchCartsItem = async (cartId, productId, newProductData) => {
        setIsloading(true);
        try {
            const updatedCart = await patchCartsItemApi(cartId, productId, newProductData);
            if (!updatedCart) return console.error("NO SE HA MODIFICADO EL PRODUCTO DEL CARRITO");
            setCarts(updatedCart);
            saveCartsInLocalStorage(updatedCart);
            return updatedCart;
        } catch (err) {
            console.error("Algo ha salido mal en patchCartsITem", err);
            throw err;
        } finally {
            setIsloading(false);
        }
    };

    const deleteCartsItem = async (cartId, productId) => {
        setIsloading(true);
        try {
            const response = await deleteCartsItemApi(cartId, productId);
            const updatedCart = response.cart;

            if (!updatedCart) return console.error("NO SE HA ELIMINADO EL PRODUCTO DEL CARRITO");
            setCarts(updatedCart);
            saveCartsInLocalStorage(updatedCart);
            return updatedCart;
        } catch (err) {
            console.error("Algo ha salido mal en deleteCartsItem", err);
            throw err;
        } finally {
            setIsloading(false);
        }
    };

    return { getCarts, getCartsById, postCarts, postCartsItem, patchCartsItem, deleteCartsItem, isLoading };
};
