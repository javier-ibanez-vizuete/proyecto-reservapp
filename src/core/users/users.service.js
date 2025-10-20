import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "../../helpers/storage";

export const saveUsersInLocalStorage = (users) => {
    saveDataInStorage("users", users);
};

export const getUsersFromLocalStorage = () => getDataFromStorage("users");

export const removeUsersFromLocalStorage = () => removeFromStorage("users");
