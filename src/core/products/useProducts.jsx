import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../../contexts/ProductsContext";
import { getCategoriesApi, getProductsApi, getProductsByIdApi } from "./products.api";
import { saveCategoriesInLocalStorage, saveProductsInLocalStorage } from "./Products.service";

export const useProducts = () => {
    const { setProducts, setCategories } = useContext(ProductsContext);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const navigate = useNavigate();

    const getProducts = async () => {
        setLoadingProducts(true);
        try {
            const products = await getProductsApi();
            if (products && products.length) {
                setProducts(products);
                saveProductsInLocalStorage(products);
            }
            if (!products.length) return;
        } catch (err) {
            console.error("Algo ha salido mal en getProducts(useProducts)", err);
        } finally {
            setLoadingProducts(false);
        }
    };

    const getProductsById = async (id) => {
        try {
            const product = await getProductsByIdApi(id);
            if (product) return product;
        } catch (err) {
            console.error("No se ha encontrado el producto", err);
            throw err;
        }
    };

    const getCategories = async () => {
        setLoadingCategories(true);
        try {
            const categories = await getCategoriesApi();
            if (categories && categories?.length) {
                setCategories(categories);
                saveCategoriesInLocalStorage(categories);
            }
            if (!categories.length) return;
        } catch (err) {
            console.error("Algo ha salido mal en getCategories(useProducts)", err);
        } finally {
            setLoadingCategories(false);
        }
    };

    return { getProducts, getProductsById, getCategories, loadingProducts, loadingCategories };
};
