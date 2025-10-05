import { useEffect, useRef, useState } from "react";
import { ConfirmModal } from "../components/Modal/ConfirmModal";
import { Button } from "../components/UI/Button";

const INITIAL_INPUTS_SHOWS_FIELDS = {
    name: false,
    email: false,
    address: false,
};

export const UserDataSection = ({ userData }) => {
    const [form, setForm] = useState({});
    const [error, setError] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const [inputShows, setInputShows] = useState(INITIAL_INPUTS_SHOWS_FIELDS);
    const inputNameRef = useRef(null);
    const inputEmailRef = useRef(null);
    const inputAddressRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const INITIAL_USER_DATA = {
        name: userData.name,
        email: userData.email,
        address: userData.address,
    };

    useEffect(() => {
        setForm(INITIAL_USER_DATA);
    }, []);

    const onInputChange = (event) => {
        event.stopPropagation();
        if (isLoading) return;
        const { name, value } = event.target;
        setError("");

        setForm((prevValue) => ({ ...prevValue, [name]: value }));
    };

    const handleShowInput = (event, inputName) => {
        event.stopPropagation();
        if (inputShows[inputName]) return;
        setInputShows(INITIAL_INPUTS_SHOWS_FIELDS);
        setForm(INITIAL_USER_DATA);

        setInputShows((prev) => ({ ...prev, [inputName]: true }));
    };

    useEffect(() => {
        if (inputShows.name && inputNameRef.current) {
            console.log("Foco en INPUT NAME");
            return inputNameRef.current.focus();
        }
        if (inputShows.email && inputEmailRef.current) {
            console.log("Foco en INPUT EMAIL");
            return inputEmailRef.current.focus();
        }
        if (inputShows.address && inputAddressRef.current) {
            console.log("Foco en INPUT ADDRESS");
            return inputAddressRef.current.focus();
        }
    }, [inputShows]);

    const handleHideInput = (event, inputName) => {
        event.stopPropagation();
        if (!inputShows[inputName]) return;
        setError("");
        setForm(INITIAL_USER_DATA);
        setInputShows(INITIAL_INPUTS_SHOWS_FIELDS);
    };

    const handleShowModal = (event, fieldToChange) => {
        event.stopPropagation();
        const sameData = Object.entries(form).every(([key, value]) => value === userData[key]);
        if (sameData) {
            setForm(INITIAL_USER_DATA);
            return setInputShows(INITIAL_INPUTS_SHOWS_FIELDS);
        }

        const newModalMessage = `Change ${userData[fieldToChange]} to ${form[fieldToChange]} ?`;
        setModalMessage(newModalMessage);
        setShowModal(true);
    };

    const handleCloseModal = (event) => {
        event.stopPropagation();
        setShowModal(false);
    };

    return (
        <div className="flex flex-1 flex-col">
            <ConfirmModal
                isOpen={showModal}
                title="Confirmar Cambio"
                message={modalMessage}
                onClose={handleCloseModal}
            />
            <div className="flex flex-col gap-3">
                <div
                    className={`flex ${!inputShows.name ? "items-center justify-between" : "flex-col"} gap-4`}
                >
                    <div className="flex items-center gap-3">
                        <h6>Name:</h6>
                        <div>
                            {!inputShows.name && <p>{userData.name}</p>}
                            {inputShows.name && (
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="NOMBRE"
                                    value={form.name}
                                    onChange={onInputChange}
                                    onClick={(event) => event.stopPropagation()}
                                    ref={inputNameRef}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {!inputShows.name && (
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={(event) => handleShowInput(event, "name")}
                            >
                                Editar
                            </Button>
                        )}
                        {inputShows.name && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={(event) => handleHideInput(event, "name")}
                            >
                                Cancelar
                            </Button>
                        )}
                        {inputShows.name && form.name?.length > 0 && (
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={(event) => handleShowModal(event, "name")}
                            >
                                Cambiar
                            </Button>
                        )}
                    </div>
                    {error && inputShows.name && <p>{error}</p>}
                </div>
                <div
                    className={`flex ${
                        !inputShows.email ? "items-center justify-between" : "flex-col"
                    } gap-4`}
                >
                    <div className="flex items-center gap-3">
                        <h6>Email:</h6>
                        <div>
                            {!inputShows.email && <p>{userData.email}</p>}
                            {inputShows.email && (
                                <input
                                    ref={inputEmailRef}
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={form.email}
                                    onChange={onInputChange}
                                    onClick={(event) => event.stopPropagation()}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {!inputShows.email && (
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={(event) => handleShowInput(event, "email")}
                            >
                                Editar
                            </Button>
                        )}
                        {inputShows.email && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={(event) => handleHideInput(event, "email")}
                            >
                                Cancelar
                            </Button>
                        )}
                        {inputShows.email && form.email.length > 0 && (
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={(event) => handleShowModal(event, "email")}
                            >
                                Cambiar
                            </Button>
                        )}
                    </div>
                    {error && inputShows.email && <p>{error}</p>}
                </div>
                <div
                    className={`flex ${
                        !inputShows.address ? "items-center justify-between" : "flex-col"
                    } gap-4`}
                >
                    <div className="flex items-center gap-3">
                        <h6>Address:</h6>
                        <div>
                            {!inputShows.address && <p>{userData.address}</p>}
                            {inputShows.address && (
                                <input
                                    ref={inputAddressRef}
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={form.address}
                                    onChange={onInputChange}
                                    onClick={(event) => event.stopPropagation()}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {!inputShows.address && (
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={(event) => handleShowInput(event, "address")}
                            >
                                Editar
                            </Button>
                        )}
                        {inputShows.address && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={(event) => handleHideInput(event, "address")}
                            >
                                Cancelar
                            </Button>
                        )}
                        {inputShows.address && form.address.length > 0 && (
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={(event) => handleShowModal(event, "address")}
                            >
                                Cambiar
                            </Button>
                        )}
                    </div>
                    {error && inputShows.address && <p>{error}</p>}
                </div>
            </div>
        </div>
    );
};
