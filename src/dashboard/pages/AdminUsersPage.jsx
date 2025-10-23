import classNames from "classnames";
import { Users } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getDataFromSessionStorage,
    removeFromSessionStorage,
    saveDataInSessionStorage,
} from "../../helpers/storage";
import { useDevice } from "../../hooks/useDevice";
import { AdminDropdown } from "../components/AdminDropdown/AdminDropdown";
import { AdminDropdownItem } from "../components/AdminDropdown/AdminDropdownItem";
import { AdminDropdownMenu } from "../components/AdminDropdown/AdminDropdownMenu";
import { AdminDropdownTrigger } from "../components/AdminDropdown/AdminDropdownTrigger";
import { AdminUserCard } from "../components/AdminUserCard";
import { AdminInputSearch } from "../components/UI/AdminInputSearch";
import { useAdminData } from "../hooks/useAdminData";

export const AdminUsersPage = ({ padding }) => {
    const [inputName, setInputname] = useState(() => {
        const inputNameFromStorage = getDataFromSessionStorage("inputUsersNameFilter");
        if (!inputNameFromStorage) return "";
        return inputNameFromStorage;
    });
    const [selectedActive, setSelectedActive] = useState(() => {
        const selectedActiveFromStorage = getDataFromSessionStorage("selectedActiveFilter");
        if (!selectedActiveFromStorage) return "";
        return selectedActiveFromStorage;
    });
    const [showOnlyActivedUsers, setShowOnlyActivedUsers] = useState(() => {
        const showOnlyActiveUsersFromStorage = getDataFromSessionStorage("showOnlyActivedUsersFilter");
        if (!showOnlyActiveUsersFromStorage && showOnlyActiveUsersFromStorage !== false) return null;
        return showOnlyActiveUsersFromStorage;
    });

    const inputRef = useRef(null);
    const navigate = useNavigate();

    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const { users, isLoadingUsers } = useAdminData({ enablePolling: true, pollingInterval: 120000 });

    const onInputChange = (event) => {
        const { value } = event.target;
        setInputname(value);
        saveDataInSessionStorage("inputUsersNameFilter", value);
    };

    const onInputClear = () => {
        removeFromSessionStorage("inputUsersNameFilter");
        return setInputname("");
    };

    const handleStateFilter = (value) => {
        if (!value) {
            removeFromSessionStorage("selectedActiveFilter");
            removeFromSessionStorage("showOnlyActivedUsersFilter");
            setSelectedActive("");
            return setShowOnlyActivedUsers(null);
        }
        if (value === "Activos") {
            saveDataInSessionStorage("selectedActiveFilter", value);
            saveDataInSessionStorage("showOnlyActivedUsersFilter", true);
            setSelectedActive(value);
            return setShowOnlyActivedUsers(true);
        }
        if (value === "Inactivos") {
            saveDataInSessionStorage("selectedActiveFilter", value);
            saveDataInSessionStorage("showOnlyActivedUsersFilter", false);
            setSelectedActive(value);
            return setShowOnlyActivedUsers(false);
        }
    };

    const handleOpenUserDetails = (id) => {
        return navigate(`/dashboard/users/${id}`);
    };

    const filteredUsers = useMemo(() => {
        if (!inputName && showOnlyActivedUsers === null)
            return users.sort((userA, userB) => userB?.isActive - userA?.isActive);
        if (!inputName && showOnlyActivedUsers === false) return users.filter((user) => !user?.isActive);
        if (!inputName && showOnlyActivedUsers) return users.filter((user) => user?.isActive);
        if (inputName && !showOnlyActivedUsers)
            return users.filter((user) =>
                user?.name?.trim().toLowerCase().includes(inputName.trim().toLowerCase())
            );
        if (inputName && showOnlyActivedUsers)
            return users.filter((user) => {
                const lowerUserName = user?.name?.trim().toLowerCase();
                const lowerInputName = inputName?.trim().toLowerCase();
                const isActive = user?.isActive;

                return lowerUserName.includes(lowerInputName) && isActive;
            });
    }, [Users, inputName, showOnlyActivedUsers]);

    useEffect(() => {
        if (inputRef?.current && inputName) inputRef.current.focus();
    }, []);

    const baseclasses = "flex flex-1 flex-col lg:max-h-[100vh] overflow-y-auto overflow-x-hidden";

    const variantsPadding = {
        default: "py-sm",
        none: " ",
        xs: "py-xs",
        sm: "py-sm",
        md: "py-md",
        lg: "py-lg",
        xl: "py-xl",
    };

    const autoConfig = useMemo(
        () => ({
            padding: classNames({
                "py-md": isMobile2Xs || isMobileXs || isMobileSm,
                "py-lg": isTablet,
                "px-md py-lg": isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const currentClasses = classNames(
        baseclasses,
        variantsPadding[padding] || autoConfig.padding || variantsPadding.default
    );

    if (isLoadingUsers) return <div>Actualizando usuarios...</div>;

    const usersFiltersOptions = {
        isActive: "Activos",
        isInactive: "Inactivos",
    };

    return (
        <section className={currentClasses}>
            <h1>USERS</h1>
            <div className="flex flex-col items-start gap-2">
                <AdminInputSearch
                    labelText="User Name"
                    id={"name"}
                    value={inputName}
                    placeholder="Buscar Usuario..."
                    onChange={onInputChange}
                    onRemove={onInputClear}
                    containerClassName="flex-col"
                    ref={inputRef}
                />
                <AdminDropdown variant={"accent"} placement="bottom-start">
                    <AdminDropdownTrigger>
                        {!selectedActive ? "Filtrar por Estado" : selectedActive}
                    </AdminDropdownTrigger>
                    <AdminDropdownMenu>
                        <AdminDropdownItem
                            disabled={selectedActive === "" ? true : false}
                            onClick={() => handleStateFilter()}
                        >
                            Filtrar por Estado
                        </AdminDropdownItem>
                        {Object.entries(usersFiltersOptions).map(([key, value]) => (
                            <AdminDropdownItem
                                key={key}
                                disabled={selectedActive === value ? true : false}
                                onClick={() => handleStateFilter(value)}
                            >
                                {value}
                            </AdminDropdownItem>
                        ))}
                    </AdminDropdownMenu>
                </AdminDropdown>
            </div>
            {users && (
                <div className="flex flex-wrap justify-start items-stretch gap-2">
                    {filteredUsers.map((user) => (
                        <AdminUserCard
                            key={user?.email}
                            userData={user}
                            variant={user?.isActive ? "success" : "error"}
                            onClick={handleOpenUserDetails}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};
