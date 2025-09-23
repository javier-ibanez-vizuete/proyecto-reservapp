import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../../contexts/productsContext";
import { getCategoriesApi, getProductsApi } from "./products.api";
import { saveCategoriesInLocalStorage, saveProductsInLocalStorage } from "./Products.service";

export const useProducts = () => {
    const { setProducts, setCategories } = useContext(ProductsContext);
    const navigate = useNavigate();

    const getProducts = async () => {
        try {
            const products = await getProductsApi();
            if (products && products.length) {
                setProducts(products);
                saveProductsInLocalStorage(products);
            }
            if (!products.length) console.log("NO HAY PRODUCTOS");
        } catch (err) {
            console.log("Algo ha salido mal en getProducts(useProducts)", err);
        }
    };

    const getCategories = async () => {
        try {
            const categories = await getCategoriesApi();
            if (categories && categories?.length) {
                setCategories(categories);
                saveCategoriesInLocalStorage(categories);
            }
            if (!categories.length) console.log("NO HAY CATEGORIAS");
        } catch (err) {
            console.error("Algo ha salido mal en getCategories(useProducts)", err);
        }
    };

    return { getProducts, getCategories };
};
