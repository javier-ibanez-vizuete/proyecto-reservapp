import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "../../helpers/storage";

export const saveBookingsInLocalStorage = (bookings) => {
    saveDataInStorage("bookings", bookings);
};

export const getBookingsFromLocalStorage = () => {
    return getDataFromStorage("bookings");
};

export const removeBookingsFromLocalStorage = () => {
    removeFromStorage("bookings");
};

export const saveBookingFormInLocalStorage = (booking) => {
    saveDataInStorage("booking", booking);
};

export const getBookingFormFromLocalStorage = () => {
    return getDataFromStorage("booking");
};

export const removeBookingFormFromLocalStorage = () => {
    removeFromStorage("booking");
};
