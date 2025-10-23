import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "../../helpers/storage";

export const saveUsersInLocalStorage = (users) => {
    saveDataInStorage("users", users);
};

export const getUsersFromLocalStorage = () => getDataFromStorage("users");

export const removeUsersFromLocalStorage = () => removeFromStorage("users");

export const saveUserDetailsInLocalStorage = (user) => {
    saveDataInStorage("userDetails", user);
};

export const getUserDetailsFromLocalStorage = () => getDataFromStorage("userDetails");

export const removeUserDetailsFromLocalStorage = () => removeFromStorage("userDetails");
