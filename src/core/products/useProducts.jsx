import { useCallback, useContext, useState } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { getCategoriesApi, getProductsApi, getProductsByIdApi } from "./products.api";
import { saveCategoriesInLocalStorage, saveProductsInLocalStorage } from "./Products.service";

export const useProducts = () => {
    const { setProducts, setCategories } = useContext(ProductsContext);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);

    const getProducts = useCallback(async () => {
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
    }, [getProductsApi]);

    const getProductsById = useCallback(
        async (id) => {
            try {
                const product = await getProductsByIdApi(id);
                if (product) return product;
            } catch (err) {
                console.error("No se ha encontrado el producto", err);
                throw err;
            }
        },
        [getProductsByIdApi]
    );

    const getCategories = useCallback(async () => {
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
    }, [getCategoriesApi]);

    return { getProducts, getProductsById, getCategories, loadingProducts, loadingCategories };
};
