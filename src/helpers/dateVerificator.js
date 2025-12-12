export const dateVerificator = (date) => {
    if (!date) return false;
    const isValidDay = Number(date.split("-")[2]) <= 31;
    const isValidMonth = Number(date.split("-")[1]) <= 12;
    return isValidDay && isValidMonth;
};
