// --- USERS FUNCTIONS ---
export const getTotalUsers = (users) => {
    if (!users || !users?.length) return 0;

    return users.length;
};

export const getConnectedUsers = (users) => {
    if (!users || !users?.length) return 0;

    return users.reduce((acc, user) => {
        if (!user?.isActive) return acc;
        return ++acc;
    }, 0);
};

// --- ORDERS FUNCTIONS ---
export const getTotalOrders = (orders) => {
    if (!orders || !orders?.length) return 0;

    return orders.length;
};

export const getCompletedOrders = (orders) => {
    if (!orders || !orders?.length) return 0;

    return orders.reduce((acc, order) => {
        if (!order?.status || (order?.status && order?.status !== "delivered")) return acc;
        return ++acc;
    }, 0);
};

export const getPendingOrders = (orders) => {
    if (!orders || !orders.length) return 0;

    return orders.reduce((acc, order) => {
        if (!order?.status || (order?.status && order.status !== "pending")) return acc;
        return ++acc;
    }, 0);
};

export const getCancelledOrders = (orders) => {
    if (!orders || !orders.length) return 0;

    return orders.reduce((acc, order) => {
        if (!order?.status || (order?.status && order.status !== "cancelled")) return acc;
        return ++acc;
    }, 0);
};

export const calculateCompletedOrdersPercentage = (orders) => {
    const completedOrders = getCompletedOrders(orders);
    const totalOrders = getTotalOrders(orders);
    return (completedOrders / totalOrders) * 100;
};

// --- BOOKINGS FUNCTIONS ---
export const getTotalBookings = (bookings) => {
    if (!bookings || !bookings.length) return 0;

    return bookings.length;
};

export const getTodaysBookings = (bookings) => {
    if (!bookings || !bookings.length) return 0;

    const currentDate = new Date().toISOString().split("T")[0];
    const currentTime = new Date().getTime();

    return bookings.filter((booking) => {
        const bookingDate = booking.scheduledFor.split("T")[0];
        const bookingTime = new Date(booking.scheduledFor).getTime();
        const isPending = booking.status === "pending";

        const sameDate = currentDate === bookingDate;
        const isLater = currentTime < bookingTime;

        return sameDate && isLater && isPending;
    }).length;
};

export const getDelayedBookings = (bookings) => {
    if (!bookings || !bookings.length) return 0;

    const currentDate = new Date().toISOString().split("T")[0];
    const currentTime = new Date().getTime();

    return bookings.filter((booking) => {
        const bookingDate = booking.scheduledFor.split("T")[0];
        const bookingTime = new Date(booking.scheduledFor).getTime();
        const isPending = booking.status === "pending";

        const sameDate = currentDate === bookingDate;
        const isDelayed = currentTime >= bookingTime;

        return sameDate && isDelayed && isPending;
    }).legnth;
};
