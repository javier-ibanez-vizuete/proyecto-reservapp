import { useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BackButton } from "../../components/UI/BackButton";
import { UsersContext } from "../../contexts/UsersContext";
import {
    removeUserDetailsFromLocalStorage,
    saveUserDetailsInLocalStorage,
} from "../../core/users/users.service";
import { useUsers } from "../../core/users/useUsers";
import { useLoading } from "../../hooks/useLoading";
import { useAdminData } from "../hooks/useAdminData";

export const AdminUserDetail = () => {
    const { id } = useParams();
    const { users } = useAdminData({ enablePolling: false });
    const { userDetails, setUserDetails } = useContext(UsersContext);

    const { getUserById } = useUsers();
    const loaderUser = useLoading();

    const handleGetUserById = useCallback(async () => {
        try {
            if (!id) return;
            loaderUser.setIsLoading(true);
            await getUserById(id);
        } catch (err) {
            console.error("User not Found");
        } finally {
            loaderUser.setIsLoading(false);
        }
    }, [getUserById]);

    useEffect(() => {
        const userFound = users.find((user) => (user.id || user._id) === id);
        if (userFound) {
            saveUserDetailsInLocalStorage(userFound);
            return setUserDetails(userFound);
        }
        if (!userFound) {
            handleGetUserById();
        }

        return () => {
            removeUserDetailsFromLocalStorage();
            setUserDetails(null);
        };
    }, [id, users]);

    if (!userDetails) return <div>USUARIO NO ENCONTRADO</div>;

    return (
        <article className="flex flex-col">
            <div className="perfect-center self-start lg:self-center">
                <BackButton />
            </div>
            <h1>{userDetails.name}</h1>
        </article>
    );
};
