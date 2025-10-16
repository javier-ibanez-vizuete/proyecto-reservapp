import { createContext, useEffect, useState } from "react";
import { getUsersFromLocalStorage } from "../core/users/users.service";

export const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const usersFromStorage = getUsersFromLocalStorage();
        if (usersFromStorage) setUsers(usersFromStorage);
    }, []);

    return <UsersContext value={{ users, setUsers }}>{children}</UsersContext>;
};
