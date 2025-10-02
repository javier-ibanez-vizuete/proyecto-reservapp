import { useContext, useState } from "react";
import { CartsContext } from "../../contexts/CartsContext";
import { normalizeIdCart } from "../../helpers/normalizeIdCart";
import {
    deleteCartItemApi,
    getCartByIdApi,
    getCartMeApi,
    getCartSummaryApi,
    patchCartItemApi,
    postCartApi,
    postCartItemApi,
} from "./cart.api";
import { saveCartInLocalStorage, saveCartSummaryInLocalStorage } from "./cart.service";

export const useCart = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { cart, setCart, setCartSummary } = useContext(CartsContext);

    const getCartMe = async (userId) => {
        try {
            const cart = await getCartMeApi();

            if (cart) {
                const normalizedCard = normalizeIdCart(cart);

                setCart(normalizedCard);
                saveCartInLocalStorage(normalizedCard);
            }
        } catch (err) {
            if (err === 404) {
                const created = await postCart(userId);
                if (!created) throw new Error("No se ha podido crear el carrito");
            }
            throw new Error("Creacion de carrito no autorizada");
        }
    };

    const getCartsById = async (id) => {
        setIsLoading(true);
        try {
            const cart = await getCartByIdApi(id);
            if (cart) {
                setCart(cart);
                saveCartInLocalStorage(cart);
            }
            if (!cart) console.error("NO HAY CARRITO");
        } catch (err) {
            console.error("Algo salió mal en getCartsById", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const getCartSummary = async () => {
        try {
            const cartSummary = await getCartSummaryApi();
            if (cartSummary) {
                setCartSummary(cartSummary);
                saveCartSummaryInLocalStorage(cartSummary);
            }
        } catch (err) {
            console.error("No hemos obtenido el resumen del carrito", err);
            throw err;
        }
    };

    const postCart = async (userId) => {
        setIsLoading(true);
        try {
            const cart = await postCartApi(userId);
            if (!cart) return console.error("NO SE HA POSTEADO EL CARRITO");
            console.log("Esto es lo que estoy guardando", cart);
            setCart(cart);
            saveCartInLocalStorage(cart);
            return cart;
        } catch (err) {
            console.error("Algo ha salido mal en postCarts", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const postCartItem = async (productId) => {
        setIsLoading(true);
        try {
            const newProduct = {
                productId: productId,
                qty: 1,
            };

            const updatedCart = await postCartItemApi(cart.id, newProduct);
            if (!updatedCart) return console.error("NO SE HA AÑADIDO EL PRODUCTO AL CARRITO");
            setCart(updatedCart);
            saveCartInLocalStorage(updatedCart);
            return updatedCart;
        } catch (err) {
            console.error("Algo ha salido mal en postCartsItem", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const patchCartItem = async (productId, newProductData) => {
        setIsLoading(true);
        try {
            const updatedCart = await patchCartItemApi(cart.id, productId, newProductData);
            if (!updatedCart) return console.error("NO SE HA MODIFICADO EL PRODUCTO DEL CARRITO");
            setCart(updatedCart);
            saveCartInLocalStorage(updatedCart);
            return updatedCart;
        } catch (err) {
            console.error("Algo ha salido mal en patchCartsITem", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCartItem = async (productId) => {
        setIsLoading(true);
        console.log("Eliminado el producto", productId);

        try {
            const response = await deleteCartItemApi(cart.id, productId);
            const updatedCart = response.cart;

            if (!updatedCart) return console.error("NO SE HA ELIMINADO EL PRODUCTO DEL CARRITO");
            setCart(updatedCart);
            saveCartInLocalStorage(updatedCart);
            return updatedCart;
        } catch (err) {
            console.error("Algo ha salido mal en deleteCartsItem", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getCartMe,
        getCartsById,
        getCartSummary,
        postCart,
        postCartItem,
        patchCartItem,
        deleteCartItem,
        isLoading,
    };
};
