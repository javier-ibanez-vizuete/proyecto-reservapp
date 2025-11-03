import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { UsersContext } from "../../contexts/UsersContext";
import { deleteUserByIdApi, getUserByIdApi, getUsersApi } from "./users.api";
import {
    removeUserDetailsFromLocalStorage,
    saveUserDetailsInLocalStorage,
    saveUsersInLocalStorage,
} from "./users.service";

export const useUsers = () => {
    const { user } = useContext(AuthContext);
    const { users, setUsers, setUserDetails } = useContext(UsersContext);
    const navigate = useNavigate();

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
            const user = await getUserByIdApi(id);
            if (!user) throw new Error("There is a Problem getting user by Id");
            saveUserDetailsInLocalStorage(user);
            setUserDetails(user);
        } catch (err) {
            console.error("We can't get User by Id", err);
            throw err;
        }
    };

    const deleteUserById = async (id) => {
        try {
            console.log("esto vale la id", id);

            if (id === user?.id) return;
            const userRemoved = await deleteUserByIdApi(id);
            if (userRemoved.ok) {
                const restUsers = users.filter((user) => user.id !== id);
                if (!restUsers.length) return console.error("No hay usuarios");
                saveUsersInLocalStorage(restUsers);
                removeUserDetailsFromLocalStorage();
                navigate("/dashboard/users", { replace: true });
                setUsers(restUsers);
                setUserDetails(null);
            }
        } catch (err) {
            console.error(("Error deleting User", err));
            throw err;
        }
    };

    return { getUsers, getUserById, deleteUserById };
};
