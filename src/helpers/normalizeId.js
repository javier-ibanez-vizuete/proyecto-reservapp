export const normalizeId = (data) => {
    if (data._id && !data.id) {
        data.id = data._id;
        delete data._id;
    }
    return data;
};
