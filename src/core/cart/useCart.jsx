import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CartsContext } from "../../contexts/CartsContext";
import { normalizeIdCart } from "../../helpers/normalizeIdCart";
import { useOrders } from "../orders/useOrders";
import {
    deleteCartItemApi,
    getCartByIdApi,
    getCartMeApi,
    getCartSummaryApi,
    patchCartItemApi,
    postCartApi,
    postCartCheckoutApi,
    postCartItemApi,
} from "./cart.api";
import { saveCartInLocalStorage, saveCartSummaryInLocalStorage } from "./cart.service";

export const useCart = () => {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const { cart, setCart, setCartSummary } = useContext(CartsContext);
    const { postOrder } = useOrders();

    const getCartMe = useCallback(
        async (userId) => {
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
                    return;
                }
                throw new Error("Creacion de carrito no autorizada");
            }
        },
        [getCartMeApi, normalizeIdCart]
    );

    const getCartsById = useCallback(
        async (id) => {
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
        },
        [getCartByIdApi]
    );

    const getCartSummary = useCallback(async () => {
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
    }, [getCartSummaryApi]);

    const postCart = useCallback(
        async (userId) => {
            setIsLoading(true);
            try {
                const cart = await postCartApi(userId);
                if (!cart) return console.error("NO SE HA POSTEADO EL CARRITO");
                setCart(cart);
                saveCartInLocalStorage(cart);
                return cart;
            } catch (err) {
                console.error("Algo ha salido mal en postCarts", err);
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        [postCartApi]
    );

    const postCartItem = useCallback(
        async (productId) => {
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
        },
        [postCartItemApi]
    );

    const postCartCheckout = useCallback(async () => {
        try {
            const checkedCart = await postCartCheckoutApi(cart.id);
            if (!checkedCart.ok) return console.error("Algo ha sucedido mal");
            const newOrder = { ...checkedCart.cart };
            const postedOrder = await postOrder(newOrder);
            if (!postedOrder) throw new Error("Fallo al postear el pedido");

            const newCart = postCart(user.id);
            if (newCart) return newCart;
        } catch (err) {
            throw err;
        }
    }, [postCartCheckoutApi, postOrder, postCart]);

    const patchCartItem = useCallback(
        async (productId, newProductData) => {
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
        },
        [patchCartItemApi]
    );

    const deleteCartItem = useCallback(
        async (productId) => {
            setIsLoading(true);

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
        },
        [deleteCartItemApi]
    );

    return {
        getCartMe,
        getCartsById,
        getCartSummary,
        postCart,
        postCartItem,
        postCartCheckout,
        patchCartItem,
        deleteCartItem,
        isLoading,
    };
};
