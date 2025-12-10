import { createContext, useEffect, useMemo, useState } from "react";
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

    const valueContext = useMemo(
        () => ({ users, setUsers, userDetails, setUserDetails }),
        [users, userDetails]
    );

    return <UsersContext value={valueContext}>{children}</UsersContext>;
};
