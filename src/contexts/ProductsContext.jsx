import { createContext, useEffect, useMemo, useState } from "react";
import {
    getCategoriesFromLocalStorage,
    getProductsFromLocalStorage,
} from "../core/products/Products.service";

export const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const productsFromStorage = getProductsFromLocalStorage();
        if (productsFromStorage) setProducts(productsFromStorage);

        const categoriesFromStorage = getCategoriesFromLocalStorage();
        if (categoriesFromStorage) setCategories(categoriesFromStorage);
    }, []);

    const valueContext = useMemo(
        () => ({ products, setProducts, categories, setCategories }),
        [products, categories]
    );

    return <ProductsContext value={valueContext}>{children}</ProductsContext>;
};
