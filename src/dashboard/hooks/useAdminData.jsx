import { useCallback, useContext, useEffect, useRef } from "react";
import { BookingsContext } from "../../contexts/BookingsContext";
import { OrdersContext } from "../../contexts/OrdersContext";
import { ProductsContext } from "../../contexts/ProductsContext";
import { UsersContext } from "../../contexts/UsersContext";
import { useBookings } from "../../core/bookings/useBookings";
import { useOrders } from "../../core/orders/useOrders";
import { useProducts } from "../../core/products/useProducts";
import { useUsers } from "../../core/users/useUsers";
import { useLoading } from "../../hooks/useLoading";
import { useToast } from "../../hooks/useToast";

/**
 * Custom hook that manages admin data fetching with automatic polling
 * Handles users, bookings, orders, and products data with periodic updates
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.enablePolling - Enable automatic data refresh (default: true)
 * @param {number} options.pollingInterval - Interval in milliseconds (default: 30000 - 30 seconds)
 * @param {boolean} options.fetchUsers - Fetch users data (default: true)
 * @param {boolean} options.fetchBookings - Fetch bookings data (default: true)
 * @param {boolean} options.fetchOrders - Fetch orders data (default: true)
 * @param {boolean} options.fetchProducts - Fetch products data (default: true)
 *
 * @returns {Object} Admin data and loading states
 */
export const useAdminData = (options = {}) => {
    const {
        enablePolling = true,
        pollingInterval = 30000, // 30 seconds by default
        fetchUsers = true,
        fetchBookings = true,
        fetchOrders = true,
        fetchProducts = true,
    } = options;

    const { users } = useContext(UsersContext);
    const { bookings } = useContext(BookingsContext);
    const { orders } = useContext(OrdersContext);
    const { products } = useContext(ProductsContext);

    const { getUsers } = useUsers();
    const { getBookings } = useBookings();
    const { getOrders } = useOrders();
    const { getProducts } = useProducts();

    const loaderUsers = useLoading();
    const loaderBookings = useLoading();
    const loaderOrders = useLoading();
    const loaderProducts = useLoading();

    const { showToast } = useToast();

    const intervalRef = useRef(null);

    const handleGetUsers = useCallback(async () => {
        if (!fetchUsers) return;

        try {
            loaderUsers.setIsLoading(true);
            await getUsers();
        } catch (err) {
            showToast("Error obteniendo usuarios", "error", 3000);
            console.error("Error fetching users:", err);
        } finally {
            loaderUsers.setIsLoading(false);
        }
    }, [fetchUsers, getUsers, showToast]);

    const handleGetBookings = useCallback(async () => {
        if (!fetchBookings) return;

        try {
            loaderBookings.setIsLoading(true);
            await getBookings();
        } catch (err) {
            showToast("Error obteniendo reservas", "error", 3000);
            console.error("Error fetching bookings:", err);
        } finally {
            loaderBookings.setIsLoading(false);
        }
    }, [fetchBookings, getBookings, showToast]);

    const handleGetOrders = useCallback(async () => {
        if (!fetchOrders) return;

        try {
            loaderOrders.setIsLoading(true);
            await getOrders();
        } catch (err) {
            showToast("Error obteniendo pedidos", "error", 3000);
            console.error("Error fetching orders:", err);
        } finally {
            loaderOrders.setIsLoading(false);
        }
    }, [fetchOrders, getOrders, showToast]);

    const handleGetProducts = useCallback(async () => {
        if (!fetchProducts) return;

        try {
            loaderProducts.setIsLoading(true);
            await getProducts();
        } catch (err) {
            showToast("Error obteniendo productos", "error", 3000);
            console.error("Error fetching products:", err);
        } finally {
            loaderProducts.setIsLoading(false);
        }
    }, [fetchProducts, getProducts, showToast]);

    const refreshAllData = useCallback(async () => {
        await Promise.all([handleGetUsers(), handleGetBookings(), handleGetOrders(), handleGetProducts()]);
    }, [handleGetUsers, handleGetBookings, handleGetOrders, handleGetProducts]);

    useEffect(() => {
        const shouldFetchUsers = fetchUsers && (!users || !users.length);
        const shouldFetchBookings = fetchBookings && (!bookings || !bookings.length);
        const shouldFetchOrders = fetchOrders && (!orders || !orders.length);
        const shouldFetchProducts = fetchProducts && (!products || !products.length);

        if (shouldFetchUsers) handleGetUsers();
        if (shouldFetchBookings) handleGetBookings();
        if (shouldFetchOrders) handleGetOrders();
        if (shouldFetchProducts) handleGetProducts();
    }, []);

    useEffect(() => {
        if (!enablePolling) return;

        intervalRef.current = setInterval(() => {
            refreshAllData();
        }, pollingInterval);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [enablePolling, pollingInterval, refreshAllData]);

    return {
        users,
        bookings,
        orders,
        products,

        isLoadingUsers: loaderUsers.isLoading,
        isLoadingBookings: loaderBookings.isLoading,
        isLoadingOrders: loaderOrders.isLoading,
        isLoadingProducts: loaderProducts.isLoading,
        isLoadingAny:
            loaderUsers.isLoading ||
            loaderBookings.isLoading ||
            loaderOrders.isLoading ||
            loaderProducts.isLoading,

        refreshUsers: handleGetUsers,
        refreshBookings: handleGetBookings,
        refreshOrders: handleGetOrders,
        refreshProducts: handleGetProducts,
        refreshAllData,
    };
};
