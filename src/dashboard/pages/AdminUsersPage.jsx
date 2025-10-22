import classNames from "classnames";
import { useMemo, useState } from "react";
import { useDevice } from "../../hooks/useDevice";
import { AdminDropdown } from "../components/AdminDropdown/AdminDropdown";
import { AdminDropdownMenu } from "../components/AdminDropdown/AdminDropdownMenu";
import { AdminDropdownTrigger } from "../components/AdminDropdown/AdminDropdownTrigger";
import { AdminInputSearch } from "../components/UI/AdminInputSearch";
import { useAdminData } from "../hooks/useAdminData";

export const AdminUsersPage = ({ padding }) => {
    const [inputName, setInputname] = useState("");
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const { users, isLoadingUsers } = useAdminData({ enablePolling: true, pollingInterval: 60000 });

    const onInputChange = (event) => {
        const { value } = event.target;
        setInputname(value);
    };

    const onInputClear = () => setInputname("");

    const baseclasses = "flex flex-1 flex-col";

    const variantsPadding = {
        default: "py-sm",
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
                "py-lg": isTablet || isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const currentClasses = classNames(
        baseclasses,
        variantsPadding[padding] || autoConfig.padding || variantsPadding.default
    );

    if (isLoadingUsers) return <div>Actualizando usuarios...</div>;

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
                />
                <AdminDropdown>
                    <AdminDropdownTrigger>ABRETE</AdminDropdownTrigger>
                    <AdminDropdownMenu>JUANALULU</AdminDropdownMenu>
                </AdminDropdown>
            </div>
            <div>CONTENEDOR DE USUARIOS</div>
        </section>
    );
};
