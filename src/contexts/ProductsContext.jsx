import { createContext, useEffect, useState } from "react";
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

    return (
        <ProductsContext value={{ products, setProducts, categories, setCategories }}>
            {children}
        </ProductsContext>
    );
};
