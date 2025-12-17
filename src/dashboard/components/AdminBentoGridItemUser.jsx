import classNames from "classnames";
import { useContext, useMemo } from "react";
import { Avatar } from "../../components/Avatar";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useDevice } from "../../hooks/useDevice";

export const AdminBentoGridItemUser = ({ user }) => {
    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const { getText } = useContext(LanguageContext);

    const baseClasses = "flex flex-1 gap-sm flex-col overflow-hidden justify-between items-center";

    // FALTA TERMINAR EL PADDING AUTOMATICO
    // FALTA TERMINAR EL GAP AUTOMATICO
    const autoConfig = useMemo(
        () => ({
            padding: "p-xs",
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const shortenUserName = useMemo(() => user?.name.split(" ")[0], [user?.name]);

    const currentBentoUserClasses = classNames(baseClasses, autoConfig.padding);

    return (
        <div className={currentBentoUserClasses}>
            <Avatar
                avatar={user?.avatar}
                alt={user?.avatar?.alt}
                fallback={user?.name}
                online={user?.isActive}
            />
            {/* HAY QUE METER un recorte en el nombre para dejar solo el nombre antes del espacio */}
            <h6 className="text-[9px] whitespace-nowrap">{shortenUserName || user.name}</h6>
            <div className="perfect-center gap-xs">
                <small className="text-[10px] font-normal">
                    {getText("dashboard_items.bento_grid_user_role_text")}
                </small>
                <small className="text-[10px]">{user?.role}</small>
            </div>
        </div>
    );
};
