import { useContext } from "react";
import { UsersContext } from "../../contexts/UsersContext";
import { getUsersApi } from "./users.api";
import { saveUsersInLocalStorage } from "./users.service";

export const useUsers = () => {
    const { setUsers } = useContext(UsersContext);

    const getUsers = async () => {
        try {
            const data = await getUsersApi();
            if (!data) throw new Error("There is a Problem getting Users");
            const users = data?.users;
            saveUsersInLocalStorage(users);
            setUsers(users);
        } catch (err) {
            console.error("Get users didn't work", err);
            throw err;
        }
    };

    return { getUsers };
};
