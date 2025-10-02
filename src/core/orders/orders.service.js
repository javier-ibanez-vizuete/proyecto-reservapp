import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "../../helpers/storage";

export const saveOrdersInLocalStorage = (orders) => {
    saveDataInStorage("orders", orders);
};

export const getOrdersFromLocalStorage = () => {
    return getDataFromStorage("orders");
};

export const removeOrdersFromLocalStorage = () => {
    removeFromStorage("orders");
};
