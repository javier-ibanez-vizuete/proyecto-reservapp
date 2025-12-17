export const LoginVerificationFields = ({ email, password }) => {
    if (!email) return "field_validations.email_is_required_field";
    if (!email.includes("@")) return "field_validations.email_not_valid_field1";
    if (!email.includes(".")) return "field_validations.email_not_valid_field2";
    if (email.length < 5) return "field_validations.email_too_short_field";
    if (email.length > 50) return "field_validations.email_too_long_field";

    if (!password) return "field_validations.password_is_required_field";
    if (password.length < 9) return "field_validations.password_too_short_field";
};

export const RegisterVerificationFields = ({ name, email, address, password, repassword }) => {
    if (!name) return "field_validations.name_is_required_field";
    if (name.length < 4) return "field_validations.name_is_too_short_field";
    if (name.length > 30) return "field_validations.name_is_too_long_field";

    if (!email) return "field_validations.email_is_required_field";
    if (!email.includes("@")) return "field_validations.email_not_valid_field1";
    if (!email.includes(".")) return "field_validations.email_not_valid_field2";
    if (email.length < 5) return "field_validations.email_too_short_field";
    if (email.length > 50) return "field_validations.email_too_long_field";

    if (!address) return "field_validations.address_is_required_field";
    if (address.length < 6) return "field_validations.address_too_short_field";
    if (address.length > 60) return "field_validations.address_too_long_field";

    if (!password) return "field_validations.password_is_required_field";
    if (password.length < 9) return "field_validations.password_too_short_field";
    if (password.length > 30) return "field_validations.password_too_long_field";

    if (!repassword) return "field_validations.confirm_password_is_required_field";
    if (password !== repassword) return "field_validations.do_not_match_passwords_fields";

    return null;
};

export const BookingVerificationSubmit = ({ tableId, date, time, partySize }) => {
    if (!date) return "field_validations.booking_date_is_required_field";
    if (!time) return "field_validations.booking_time_is_required_field";
    if (!partySize) return "field_validations.booking_customers_is_required_field";
    if (!tableId) return "field_validations.booking_table_is_required_field";
};

export const ProfileDataChangingVerification = ({ name, email, address }) => {
    if (!name) return "field_validations.profile_name_not_empty_field";
    if (name.length < 4) return "field_validations.name_is_too_short_field";
    if (name.length > 30) return "field_validations.name_is_too_long_field";

    if (!email) return "field_validations.profile_email_not_empty_field";
    if (!email.includes("@")) return "field_validations.email_not_valid_field1";
    if (!email.includes(".")) return "field_validations.email_not_valid_field2";
    if (email.length < 5) return "field_validations.email_too_short_field";
    if (email.length > 50) return "field_validations.email_too_long_field";

    if (!address) return "field_validations.profile_address_not_empty_field";
    if (address.length < 6) return "field_validations.address_too_short_field";
    if (address.length > 60) return "field_validations.address_too_long_field";
};
