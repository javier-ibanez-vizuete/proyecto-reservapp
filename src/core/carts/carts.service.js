import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "../../helpers/storage";

export const saveCartsInLocalStorage = (carts) => {
    saveDataInStorage("carts", carts);
};

export const getCartsFromLocalStorage = () => {
    return getDataFromStorage("carts");
};

export const removeCartsFromLocalStorage = () => {
    removeFromStorage("carts");
};
