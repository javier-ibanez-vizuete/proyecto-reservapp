import { createContext, useEffect, useState } from "react";
import { getUserDetailsFromLocalStorage, getUsersFromLocalStorage } from "../core/users/users.service";

export const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const usersFromStorage = getUsersFromLocalStorage();
        const userDetailsFromStorage = getUserDetailsFromLocalStorage();

        if (usersFromStorage) setUsers(usersFromStorage);
        if (userDetailsFromStorage) setUserDetails(userDetailsFromStorage);
    }, []);

    return <UsersContext value={{ users, setUsers, userDetails, setUserDetails }}>{children}</UsersContext>;
};
