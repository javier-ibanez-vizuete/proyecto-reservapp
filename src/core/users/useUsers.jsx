import { useCallback, useContext, useRef } from "react";
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

    const userIdRef = useRef(user?.id);
    const usersRef = useRef(users);

    userIdRef.current = user?.id;
    usersRef.current = users;

    const getUsers = useCallback(async () => {
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
    }, []);

    const getUserById = useCallback(async (id) => {
        try {
            const user = await getUserByIdApi(id);
            if (!user) throw new Error("There is a Problem getting user by Id");

            saveUserDetailsInLocalStorage(user);
            setUserDetails(user);
        } catch (err) {
            console.error("We can't get User by Id", err);
            throw err;
        }
    }, []);

    const deleteUserById = useCallback(
        async (id) => {
            try {
                if (id === userIdRef.current) {
                    console.warn("Cannot delete current user");
                    return;
                }

                const userRemoved = await deleteUserByIdApi(id);

                if (userRemoved.ok) {
                    const restUsers = usersRef.current.filter((user) => user.id !== id);

                    if (!restUsers.length) {
                        console.error("No hay usuarios");
                        return;
                    }

                    saveUsersInLocalStorage(restUsers);
                    removeUserDetailsFromLocalStorage();
                    setUsers(restUsers);
                    setUserDetails(null);
                    navigate("/dashboard/users", { replace: true });
                }
            } catch (err) {
                console.error(("Error deleting User", err));
                throw err;
            }
        },
        [navigate]
    );

    return { getUsers, getUserById, deleteUserById };
};
