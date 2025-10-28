import classNames from "classnames";
import { Users } from "lucide-react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
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
import { AdminSkeleton } from "../components/AdminSkeleton";
import { AdminUserCard } from "../components/AdminUserCard";
import { AdminInputSearch } from "../components/UI/AdminInputSearch";
import { useAdminData } from "../hooks/useAdminData";

export const AdminUsersPage = ({ padding, gap, columns }) => {
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

    const { getText } = useContext(LanguageContext);

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
        if (value === getText("adminUserPageActiveStatusFilter")) {
            saveDataInSessionStorage("selectedActiveFilter", value);
            saveDataInSessionStorage("showOnlyActivedUsersFilter", true);
            setSelectedActive(value);
            return setShowOnlyActivedUsers(true);
        }
        if (value === getText("adminUserPageInactiveStatusFilter")) {
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
    const baseFilterContainerClasses = "flex flex-col items-start";
    const baseUsersContainerClasses = "grid grid-flow-dense auto-rows-fr";

    const variantsPadding = {
        default: "py-sm",
        none: " ",
        xs: "py-xs",
        sm: "py-sm",
        md: "py-md",
        lg: "py-lg",
        xl: "py-xl",
    };

    const variantsGap = {
        xs: "gap-xs",
        sm: "gap-sm",
        default: "gap-sm",
        md: "gap-md",
        lg: "gap-lg",
        xl: "gap-xl",
    };

    const variantsColumns = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        default: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
    };

    const autoConfig = useMemo(
        () => ({
            padding: classNames({
                "py-md": isMobile2Xs || isMobileXs || isMobileSm,
                "py-lg": isTablet,
                "px-md py-lg": isDesktop,
            }),
            gap: classNames({
                "gap-sm": isMobile2Xs || isMobileXs || isMobileSm,
                "gap-md": isTablet || isDesktop,
            }),
            filtersGap: classNames({
                "gap-xs": isMobile2Xs || isMobileXs,
                "gap-sm": isMobileSm || isTablet || isDesktop,
            }),
            columns: classNames({
                "grid-cols-1": isMobile2Xs || isMobileXs,
                "grid-cols-2": isMobileSm,
                "grid-cols-3": isTablet,
                "grid-cols-4": isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const currentClasses = classNames(
        baseclasses,
        variantsPadding[padding] || autoConfig.padding || variantsPadding.default,
        variantsGap[gap] || autoConfig?.gap || variantsGap.default
    );

    const currentFiltersContainerClasses = classNames(baseFilterContainerClasses, autoConfig?.filtersGap);

    const currentUsersContainerClasses = classNames(
        baseUsersContainerClasses,
        variantsColumns[columns],
        autoConfig?.columns || variantsColumns.default,
        variantsGap[gap] || autoConfig?.filtersGap || variantsGap.default
    );

    const usersFiltersOptions = {
        isActive: getText("adminUserPageActiveStatusFilter"),
        isInactive: getText("adminUserPageInactiveStatusFilter"),
    };
    if (isLoadingUsers)
        return (
            <div className={currentClasses}>
                <AdminSkeleton variant="text" lines={1} padding="lg" className="sm:w-2/3 md:self-center" />
                <div className={currentFiltersContainerClasses}>
                    <AdminSkeleton variant="text" lines={1} className="w-1/3" padding="sm" />
                    <AdminSkeleton variant="text" lines={1} className="w-2/3" padding="md" />
                    <AdminSkeleton variant="button" lines={1} />
                </div>
                <div className={currentUsersContainerClasses}>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <AdminSkeleton variant="avatar" />
                    ))}
                </div>
            </div>
        );

    return (
        <section className={currentClasses}>
            <h1>{getText("h1AdminUserPage")}</h1>
            <div className={currentFiltersContainerClasses}>
                <AdminInputSearch
                    labelText={getText("adminUserPageLabelTextName")}
                    id={"name"}
                    value={inputName}
                    placeholder={getText("adminUserPagePlaceholderTextName")}
                    onChange={onInputChange}
                    onRemove={onInputClear}
                    containerClassName="flex-col"
                    ref={inputRef}
                />
                <AdminDropdown variant={"accent"} placement="bottom-start">
                    <AdminDropdownTrigger>
                        {!selectedActive ? getText("adminUserPageDefaultStatusFilter") : selectedActive}
                    </AdminDropdownTrigger>
                    <AdminDropdownMenu>
                        <AdminDropdownItem
                            disabled={selectedActive === "" ? true : false}
                            onClick={() => handleStateFilter()}
                        >
                            {getText("adminUserPageDefaultStatusFilter")}
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
                <div className={currentUsersContainerClasses}>
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
