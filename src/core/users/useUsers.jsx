import { useContext } from "react";
import { UsersContext } from "../../contexts/UsersContext";
import { getUserByIdApi, getUsersApi } from "./users.api";
import { saveUserDetailsInLocalStorage, saveUsersInLocalStorage } from "./users.service";

export const useUsers = () => {
    const { setUsers, setUserDetails } = useContext(UsersContext);

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

    const getUserById = async (id) => {
        try {
            const user = await getUserByIdApi();
            if (!user) throw new Error("There is a Problem getting user by Id");
            saveUserDetailsInLocalStorage(user);
            setUserDetails(user);
        } catch (err) {
            console.error("We can't get User by Id", err);
            throw err;
        }
    };

    return { getUsers, getUserById };
};
