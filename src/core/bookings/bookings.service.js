import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "../../helpers/storage";

export const saveBookingsInLocalStorage = (bookings) => {
    saveDataInStorage("bookings", bookings);
};

export const getBookingsFromLocalStorage = () => getDataFromStorage("bookings");

export const removeBookingsFromLocalStorage = () => {
    removeFromStorage("bookings");
};

export const saveBookingFormInLocalStorage = (booking) => {
    saveDataInStorage("booking", booking);
};

export const getBookingFormFromLocalStorage = () => getDataFromStorage("booking");

export const removeBookingFormFromLocalStorage = () => {
    removeFromStorage("booking");
};

export const saveUserBookingsInLocalStorage = (bookings) => {
    saveDataInStorage("userBookings", bookings);
};

export const getUserBookingsFromStorage = () => getDataFromStorage("userBookings");

export const removeUserBookingsFromLocalStorage = () => removeFromStorage("userBookings");
