export const normalizeIdCart = (cart) => {
    if (cart._id && !cart.id) {
        cart.id = cart._id;
        delete cart._id;
    }
    return cart;
};
