export const LoginVerificationFields = ({ email, password }) => {
    if (!email) return "Email Field is Required";
    if (!email.includes("@")) return "Email not Valid ('@' missing)";
    if (!email.includes(".")) return "Email not Valid ('.' missing)";
    if (email.length < 5) return "Email too Short (min. 5 Characters)";
    if (email.length > 50) return "Email too Long (max. 50 Characters)";

    if (!password) return "Password Field is Required";
    if (password.length < 9) return "Password is too Short (min. 9 Characters)";
};

export const RegisterVerificationFields = ({ name, email, address, password, repassword }, setError) => {
    if (!name) return "Name Field is Required";
    if (name.length < 4) return "Name too Short (min. 4 Characters)";
    if (name.length > 30) return "Name too Long (max. 30 Characters)";

    if (!email) return "Email Field is Required";
    if (!email.includes("@")) return "Email not Valid ('@' missing)";
    if (!email.includes(".")) return "Email not Valid ('.' missing)";
    if (email.length < 5) return "Email too Short (min. 5 Characters)";
    if (email.length > 50) return "Email too Long (max. 50 Characters)";

    if (!address) return "Address Field is Required";
    if (address.length < 6) return "Address too Short (min. 6 Characters)";
    if (address.length > 60) return "Address too Long (max. 60 Characters)";

    if (!password) return "Password Field is Required";
    if (password.length < 9) return "Password too Short (min. 9 Characters)";
    if (password.length > 30) return "Password too Long (max. 30 Characters)";

    if (!repassword) return "Confirm Password Field is Required";
    if (password !== repassword) return "Passwords do not match";

    return null;
};

export const BookingVerificationSubmit = ({ tableId, date, time, partySize }) => {
    if (!date) return "You must to chose a Booking Date";
    if (!time) return "Time Field is Required";
    if (!partySize) return "Customer Field is Required";
    if (!tableId) return "You must chose a Table";
};
