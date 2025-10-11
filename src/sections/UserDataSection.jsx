import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfirmModal } from "../components/Modal/ConfirmModal";
import { ToastContainer } from "../components/ToastContainer";
import { Button } from "../components/UI/Button";
import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../core/auth/useAuth";
import { ProfileDataChangingVerification } from "../helpers/FieldsVerificator";
import { getDataFromSessionStorage, removeFromSessionStorage } from "../helpers/storage";
import { useLoading } from "../hooks/useLoading";
import { useToast } from "../hooks/useToast";

const INITIAL_INPUTS_SHOWS_FIELDS = {
    name: false,
    email: false,
    address: false,
};

const EditableField = ({
    fieldName,
    fieldConfig,
    userData,
    form,
    inputShows,
    error,
    isLoading,
    inputRef,
    onInputChange,
    handleKeyDown,
    handleShowInput,
    handleHideInput,
    handleShowModal,
}) => {
    const { getText } = useContext(LanguageContext);

    const isEditing = inputShows[fieldName];
    const hasValue = form[fieldName]?.length > 0;

    return (
        <div className={`flex ${!isEditing ? "items-center justify-between" : "flex-col"} gap-4`}>
            <div className="flex items-center gap-3">
                <h6>{fieldConfig.label}:</h6>
                <div>
                    {!isEditing && <p>{userData[fieldName]}</p>}
                    {isEditing && (
                        <input
                            ref={inputRef}
                            type={fieldConfig.type}
                            name={fieldName}
                            id={fieldName}
                            placeholder={userData[fieldName]}
                            value={form[fieldName]}
                            onChange={onInputChange}
                            onClick={(event) => event.stopPropagation()}
                            onKeyDown={(event) => handleKeyDown(event, fieldName)}
                            className="outline-none"
                            disabled={isLoading}
                        />
                    )}
                </div>
            </div>
            <div className="flex gap-2 p-1">
                {!isEditing && (
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={(event) => handleShowInput(event, fieldName)}
                    >
                        {getText("userDataEditButtonText")}
                    </Button>
                )}
                {isEditing && (
                    <>
                        <Button
                            size="sm"
                            variant="danger"
                            onClick={(event) => handleHideInput(event, fieldName)}
                        >
                            {getText("userDataModalCancelText")}
                        </Button>
                        {hasValue && (
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={(event) => handleShowModal(event, fieldName)}
                            >
                                {getText("userDataChangeButtonText")}
                            </Button>
                        )}
                    </>
                )}
            </div>
            {error && isEditing && <p className="italic text-error-500/70">{getText(error)}</p>}
        </div>
    );
};

export const UserDataSection = ({ userData }) => {
    const INITIAL_USER_DATA = useMemo(
        () => ({
            name: userData.name,
            email: userData.email,
            address: userData.address,
        }),
        [userData.name, userData.email, userData.address]
    );

    const [form, setForm] = useState(INITIAL_USER_DATA);
    const [error, setError] = useState("");
    const [inputShows, setInputShows] = useState(INITIAL_INPUTS_SHOWS_FIELDS);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const { isLoading, setIsLoading } = useLoading();
    const { patchUser } = useAuth();
    const { theme } = useContext(ThemeContext);
    const { toasts, showToast, dismissToast } = useToast();
    const { getText } = useContext(LanguageContext);

    const location = useLocation();
    const navigate = useNavigate();

    const inputNameRef = useRef(null);
    const inputEmailRef = useRef(null);
    const inputAddressRef = useRef(null);

    const inputRefs = useMemo(
        () => ({
            name: inputNameRef,
            email: inputEmailRef,
            address: inputAddressRef,
        }),
        []
    );

    const FIELD_CONFIG = {
        name: { label: getText("nameFieldText"), type: "text" },
        email: { label: getText("emailFieldText"), type: "email" },
        address: { label: getText("addressFieldText"), type: "text" },
    };

    useEffect(() => {
        setForm(INITIAL_USER_DATA);

        const fromPatchUSer =
            location.state?.fromPatchUSer === true || getDataFromSessionStorage("fromPatchUser") === true;

        if (fromPatchUSer) {
            showToast(getText("toastUserDataChangeSuccess"), "success", 1000);
            navigate(location.pathname, { replace: true, state: {} });
            removeFromSessionStorage("fromPatchUser");
        }
    }, [INITIAL_USER_DATA, location.pathname, location.state?.fromPatchUSer, navigate, showToast]);

    useEffect(() => {
        const activeField = Object.keys(inputShows).find((field) => inputShows[field]);

        if (activeField && inputRefs[activeField]?.current) {
            inputRefs[activeField].current.focus();
        }
    }, [inputShows, inputRefs]);

    const resetFormState = useCallback(() => {
        setForm(INITIAL_USER_DATA);
        setInputShows(INITIAL_INPUTS_SHOWS_FIELDS);
        setError("");
    }, [INITIAL_USER_DATA]);

    const onInputChange = useCallback(
        (event) => {
            event.stopPropagation();
            if (isLoading) return;

            const { name, value } = event.target;
            setError("");
            setForm((prevValue) => ({ ...prevValue, [name]: value }));
        },
        [isLoading]
    );

    const handleShowModal = useCallback(
        (event, fieldToChange) => {
            event.stopPropagation();

            const sameData = Object.entries(form).every(([key, value]) => {
                return value === userData[key];
            });

            if (sameData) {
                resetFormState();
                return;
            }

            const hasError = ProfileDataChangingVerification(form);
            if (hasError) {
                inputRefs[fieldToChange]?.current?.focus();
                setError(hasError);
                return;
            }

            const newModalMessage = `${getText("userDataModalMessage")} ${userData[fieldToChange]} ${getText(
                "userDataModalMessageNexo"
            )} ${form[fieldToChange]} ?`;
            setModalMessage(newModalMessage);
            setShowModal(true);
        },
        [form, userData, resetFormState, inputRefs]
    );

    const handleShowInput = useCallback(
        (event, inputName) => {
            event.stopPropagation();
            if (inputShows[inputName]) return;

            resetFormState();
            setInputShows((prev) => ({ ...prev, [inputName]: true }));
        },
        [inputShows, resetFormState]
    );

    const handleHideInput = useCallback(
        (event, inputName) => {
            event.stopPropagation();
            if (!inputShows[inputName]) return;

            resetFormState();
        },
        [inputShows, resetFormState]
    );

    const handleKeyDown = useCallback(
        (event, fieldName) => {
            event.stopPropagation();
            if (event?.key === "Escape") return resetFormState();
            if (event?.key === "Enter") return handleShowModal(event, fieldName);
        },
        [resetFormState, handleShowModal]
    );

    const handleCloseModal = useCallback((event) => {
        event.stopPropagation();
        setShowModal(false);
    }, []);

    const handleConfirmChangeData = useCallback(
        async (event) => {
            event.stopPropagation();
            setIsLoading(true);

            try {
                await patchUser(form);
            } catch (err) {
                console.error("User Data is not Updated");
                showToast(getText("toastUserDataChangeError"), "error", 1000);
                resetFormState();
                setShowModal(false);
            } finally {
                setIsLoading(false);
            }
        },
        [form, patchUser, showToast, resetFormState, setIsLoading]
    );

    return (
        <div className="flex flex-1 flex-col">
            <ConfirmModal
                isOpen={showModal}
                title={getText("userDataModalTitle")}
                message={modalMessage}
                onConfirm={handleConfirmChangeData}
                onClose={handleCloseModal}
                loading={isLoading}
                confirmText={getText("userDataModalConfirmText")}
                loadingText={getText("loadingUserDataModalConfirmText")}
                cancelText={getText("userDataModalCancelText")}
                showCloseButton={false}
            />
            <div className="flex flex-col gap-3">
                {Object.keys(FIELD_CONFIG).map((fieldName) => (
                    <EditableField
                        key={fieldName}
                        fieldName={fieldName}
                        fieldConfig={FIELD_CONFIG[fieldName]}
                        userData={userData}
                        form={form}
                        inputShows={inputShows}
                        error={error}
                        isLoading={isLoading}
                        inputRef={inputRefs[fieldName]}
                        onInputChange={onInputChange}
                        handleShowInput={handleShowInput}
                        handleHideInput={handleHideInput}
                        handleShowModal={handleShowModal}
                        handleKeyDown={handleKeyDown}
                    />
                ))}
            </div>
            <ToastContainer toasts={toasts} onClose={dismissToast} />
        </div>
    );
};
