export const LoginVerificationFields = ({ email, password }) => {
    if (!email) return "emailIsRequiredField";
    if (!email.includes("@")) return "emailNotValidField1";
    if (!email.includes(".")) return "emailNotValidField2";
    if (email.length < 5) return "emailTooShortField";
    if (email.length > 50) return "emailTooLongField";

    if (!password) return "passwordIsRequiredField";
    if (password.length < 9) return "passwordTooShortField";
};

export const RegisterVerificationFields = ({ name, email, address, password, repassword }) => {
    if (!name) return "nameIsRequiredField";
    if (name.length < 4) return "nameIsTooShortField";
    if (name.length > 30) return "nameIsTooLongField";

    if (!email) return "emailIsRequiredField";
    if (!email.includes("@")) return "emailNotValidField1";
    if (!email.includes(".")) return "emailNotValidField2";
    if (email.length < 5) return "emailTooShortField";
    if (email.length > 50) return "emailTooLongField";

    if (!address) return "addressIsRequiredField";
    if (address.length < 6) return "addressTooShortField";
    if (address.length > 60) return "addressTooLongField";

    if (!password) return "passwordIsRequiredField";
    if (password.length < 9) return "passwordTooShortField";
    if (password.length > 30) return "passwordTooLongField";

    if (!repassword) return "confirmPasswordIsRequiredField";
    if (password !== repassword) return "doNotMatchPasswordsFields";

    return null;
};

export const BookingVerificationSubmit = ({ tableId, date, time, partySize }) => {
    if (!date) return "bookingDateIsRequiredField";
    if (!time) return "bookingTimeIsRequiredField";
    if (!partySize) return "bookingCustomersIsRequiredField";
    if (!tableId) return "bookingTableIsRequiredField";
};

export const ProfileDataChangingVerification = ({ name, email, address }) => {
    if (!name) return "profileNameNotEmptyField";
    if (name.length < 4) return "nameIsTooShortField";
    if (name.length > 30) return "nameIsTooLongField";

    if (!email) return "profileEmailNotEmptyField";
    if (!email.includes("@")) return "emailNotValidField1";
    if (!email.includes(".")) return "emailNotValidField2";
    if (email.length < 5) return "emailTooShortField";
    if (email.length > 50) return "emailTooLongField";

    if (!address) return "profileAddressNotEmptyField";
    if (address.length < 6) return "addressTooShortField";
    if (address.length > 60) return "addressTooLongField";
};
