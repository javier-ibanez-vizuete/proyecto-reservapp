import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "../../helpers/storage";

export const saveCartInLocalStorage = (cart) => {
    saveDataInStorage("cart", cart);
};

export const getCartFromLocalStorage = () => {
    return getDataFromStorage("cart");
};

export const removeCartFromLocalStorage = () => {
    removeFromStorage("cart");
};
