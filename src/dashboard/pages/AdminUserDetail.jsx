import classNames from "classnames";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "../../components/Avatar";
import { ConfirmModal } from "../../components/Modal/ConfirmModal";
import { Modal } from "../../components/Modal/Modal";
import { ModalBody } from "../../components/Modal/ModalBody";
import { ModalFooter } from "../../components/Modal/ModalFooter";
import { ModalHeader } from "../../components/Modal/ModalHeader";
import { LoadingButton } from "../../components/Spinner/LoadingButton";
import { BackButton } from "../../components/UI/BackButton";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UsersContext } from "../../contexts/UsersContext";
import {
    removeUserDetailsFromLocalStorage,
    saveUserDetailsInLocalStorage,
} from "../../core/users/users.service";
import { useUsers } from "../../core/users/useUsers";
import { normalizeId } from "../../helpers/normalizeId";
import { useDevice } from "../../hooks/useDevice";
import { useLoading } from "../../hooks/useLoading";
import { AdminButton } from "../components/UI/AdminButton";
import { useAdminData } from "../hooks/useAdminData";

const INITIAL_FORM_DATA = {
    subject: "",
    contactBody: "",
};

export const AdminUserDetail = ({ padding, gap }) => {
    const { user } = useContext(AuthContext);

    const { id } = useParams();
    const { users } = useAdminData({ enablePolling: false });
    const { userDetails, setUserDetails } = useContext(UsersContext);

    const [contactForm, setContactForm] = useState(INITIAL_FORM_DATA);
    const [showContactModal, setShowContactModal] = useState(false);
    const [contactError, setContactError] = useState("");

    const [showCallModal, setShowCallModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const loaderDeleteUser = useLoading();

    const { getUserById, deleteUserById } = useUsers();
    const loaderUser = useLoading();

    const { isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop } = useDevice();
    const { theme } = useContext(ThemeContext);

    const handleGetUserById = useCallback(async () => {
        try {
            if (!id || userDetails) return;
            loaderUser.setIsLoading(true);
            await getUserById(id);
        } catch (err) {
            console.error("User not Found");
        } finally {
            loaderUser.setIsLoading(false);
        }
    }, [getUserById, userDetails]);

    useEffect(() => {
        const userFound = users.find((user) => (user.id || user._id) === id);
        if (userFound) {
            saveUserDetailsInLocalStorage(userFound);
            return setUserDetails(userFound);
        }
        if (!userFound && !userDetails) {
            handleGetUserById();
        }

        return () => {
            removeUserDetailsFromLocalStorage();
            setUserDetails(null);
        };
    }, [id, users]);

    const handleContactModal = () => {
        setContactForm(INITIAL_FORM_DATA);
        setShowContactModal((prev) => !prev);
    };

    const onContactInputChange = (event) => {
        const { name, value } = event.target;
        setContactError("");
        setContactForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSendEmail = () => {
        if (!contactForm?.subject) return setContactError("Asunto Obligatorio");
        if (!contactForm?.contactBody) return setContactError("Debes introducir un Mensaje");

        const encodedSubject = encodeURIComponent(contactForm?.subject);
        const encodedBody = encodeURIComponent(contactForm?.contactBody);

        const mailtoURL = `mailto:${userDetails?.email}?subject=${encodedSubject}&body=${encodedBody}`;

        const anchor = document.createElement("a");
        anchor.href = mailtoURL;
        anchor.target = "_blank";

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);

        handleContactModal();
    };

    const handleCallModal = () => setShowCallModal((prev) => !prev);

    const handleCallUser = () => {
        const calltoURL = `tel:${userDetails?.phoneNumber}`;

        const anchor = document.createElement("a");
        anchor.href = calltoURL;
        anchor.target = "_blank";

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };

    const handleDeleteModal = () => setShowDeleteModal((prev) => !prev);

    const handleDeleteUser = async () => {
        try {
            console.log("Eliminando usuario");

            loaderDeleteUser.setIsLoading(true);
            const normalizedUser = normalizeId(userDetails);
            if (!normalizedUser) return;

            await deleteUserById(normalizedUser?.id);
        } catch (err) {
            console.error("No se ha podido Eliminar User", err);
            // colocar un Toast.
        } finally {
            loaderDeleteUser.setIsLoading(false);
        }
    };

    const baseArticleClasses = "flex flex-col";
    const baseDetailsClasses = "flex";
    const baseDetailsLabelClasses = "font-bold";
    const baseContactModalClasses = classNames("flex flex-col", {
        "bg-admin-accent-background": theme === "light",
        "bg-admin-accent-background-dark": theme !== "light",
    });
    const baseDeleteModalClasses = classNames("flex flex-col", {
        "bg-admin-accent-background": theme === "light",
        "bg-admin-accent-background-dark": theme !== "light",
    });

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
        default: "gap-sm",
        none: " ",
        xs: "gap-xs",
        sm: "gap-sm",
        md: "gap-md",
        lg: "gap-lg",
        xl: "gap-xl",
    };

    const autoConfig = useMemo(
        () => ({
            padding: classNames({
                "py-md": isMobile2Xs || isMobileXs || isMobileSm,
                "py-lg": isTablet,
                "px-md py-lg": isDesktop,
            }),
            gap: classNames({
                "gap-xs": isMobile2Xs || isMobileXs,
                "gap-sm": isMobileSm || isTablet,
                "gap-md": isDesktop,
            }),
            avatarSize: classNames({
                "4xl": isMobile2Xs || isMobileXs || isMobileSm,
                "6xl": isTablet || isDesktop,
            }),
            detailsDirection: classNames({
                "flex-col": isMobile2Xs || isMobileXs || isMobileSm,
                "flex-row items-center": isTablet || isDesktop,
            }),
            detailsGap: classNames({
                "gap-0": isMobile2Xs || isMobileXs || isMobileSm,
                "gap-sm": isTablet || isDesktop,
            }),
        }),
        [isMobile2Xs, isMobileXs, isMobileSm, isTablet, isDesktop]
    );

    const currentArticleClasses = classNames(
        baseArticleClasses,
        variantsPadding[padding] || autoConfig?.padding || variantsPadding.default,
        variantsGap[gap] || autoConfig?.gap || variantsGap.default
    );

    const currentDetailsClasses = classNames(
        baseDetailsClasses,
        autoConfig?.detailsDirection,
        autoConfig?.detailsGap
    );

    if (!userDetails) return <div>USUARIO NO ENCONTRADO</div>;

    return (
        <article className={currentArticleClasses}>
            <Modal isOpen={showContactModal} onClose={handleContactModal} className={baseContactModalClasses}>
                <ModalHeader>{`Mail to ${userDetails?.name}`}</ModalHeader>
                <ModalBody className="flex flex-col gap-sm">
                    <div className="flex flex-col gap-xs">
                        <p className="font-medium">Subject</p>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            value={contactForm?.subject}
                            placeholder="Write a Subject..."
                            onChange={onContactInputChange}
                        />
                    </div>
                    <div className="flex flex-col gap-xs">
                        <p className="font-medium">Body</p>
                        <textarea
                            name="contactBody"
                            id="contactBody"
                            value={contactForm?.contactBody}
                            placeholder="write a Message to"
                            onChange={onContactInputChange}
                        />
                    </div>
                </ModalBody>
                <ModalFooter className="flex flex-col">
                    {contactError && (
                        <small className="italic text-error-500 opacity-70">{contactError}</small>
                    )}
                    <div className="perfect-center gap-sm">
                        <AdminButton variant={"danger"} onClick={handleContactModal}>
                            Cancelar
                        </AdminButton>
                        <AdminButton variant={"primary"} onClick={handleSendEmail}>
                            Enviar
                        </AdminButton>
                    </div>
                </ModalFooter>
            </Modal>
            <ConfirmModal
                isOpen={showCallModal}
                onClose={handleCallModal}
                onConfirm={handleCallUser}
                title={`Are you Sure?`}
                message={`Call ${userDetails?.name} - [${userDetails?.phoneNumber}] ?`}
                showCloseButton={false}
            />
            <Modal isOpen={showDeleteModal} className={baseDeleteModalClasses}>
                <ModalHeader>¿Eliminar Usuario?</ModalHeader>
                <ModalBody>¿Seguro que quiere eliminar al usuario {userDetails?.name}</ModalBody>
                <ModalFooter>
                    <AdminButton variant={"outline"} onClick={handleDeleteModal}>
                        Cancelar
                    </AdminButton>
                    <LoadingButton
                        variant="danger"
                        onClick={handleDeleteUser}
                        loading={loaderDeleteUser.isLoading}
                        disabled={loaderDeleteUser.isLoading}
                        loadingText="Eliminando..."
                    >
                        Eliminar
                    </LoadingButton>
                </ModalFooter>
            </Modal>
            <div className="perfect-center self-start lg:self-center">
                <BackButton />
            </div>
            <h1>{userDetails.name}</h1>
            <div className={classNames("flex flex-col", autoConfig?.gap)}>
                <div className="perfect-center self-center">
                    <Avatar
                        avatar={userDetails?.avatar}
                        alt={userDetails?.avatar?.alt}
                        size={autoConfig?.avatarSize}
                        fallback={userDetails?.name}
                        online={userDetails?.isActive}
                    />
                </div>
                <div className={currentDetailsClasses}>
                    <p className={baseDetailsLabelClasses}>Email:</p>
                    <div className="flex justify-between items-center gap-2 md:flex-1">
                        <p>{userDetails?.email}</p>
                        <AdminButton variant={"primary"} onClick={handleContactModal}>
                            Contactar
                        </AdminButton>
                    </div>
                </div>
                {userDetails?.phoneNumber && (
                    <div className={currentDetailsClasses}>
                        <p className={baseDetailsLabelClasses}>Phone Number:</p>
                        <div className="flex justify-between items-center gap-2 md:flex-1">
                            <p>{userDetails?.phoneNumber}</p>
                            {!isDesktop && (
                                <AdminButton variant={"primary"} onClick={handleCallModal}>
                                    Llamar
                                </AdminButton>
                            )}
                        </div>
                    </div>
                )}
                <div className={currentDetailsClasses}>
                    <p className={baseDetailsLabelClasses}>Address:</p>
                    <p>{userDetails?.address}</p>
                </div>
                <div className={currentDetailsClasses}>
                    <p className={baseDetailsLabelClasses}>Role:</p>
                    <p>{userDetails?.role}</p>
                </div>
            </div>
            {userDetails?.bookings.length > 0 && (
                <div className="flex items-center gap-sm">
                    <p>Reservas Realizadas:</p>
                    <h6>{userDetails?.bookings.length}</h6>
                </div>
            )}
            {userDetails?.orders.length > 0 && (
                <div className="flex items-center gap-sm">
                    <p>Pedidos Realizados:</p>
                    <h6>{userDetails?.orders.length}</h6>
                </div>
            )}
            {user?.id !== (userDetails?.id || userDetails?._id) && (
                <div>
                    <AdminButton variant={"danger"} onClick={handleDeleteModal}>
                        Eliminar Usuario
                    </AdminButton>
                </div>
            )}
        </article>
    );
};
