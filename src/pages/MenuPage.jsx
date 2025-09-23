import { useContext, useEffect, useMemo, useState } from "react";
import { Container } from "../components/Container";
import { Dropdown } from "../components/Dropdown/Dropdown";
import { DropdownItem } from "../components/Dropdown/DropdownItem";
import { DropdownMenu } from "../components/Dropdown/DropdownMenu";
import { DropdownTrigger } from "../components/Dropdown/DropdownTrigger";
import { ProductItem } from "../components/Products/ProductItem";
import { ProductsContainer } from "../components/Products/ProductsContainer";
import { Spinner } from "../components/Spinner/Spinner";
import { BackToTopButton } from "../components/UI/BackToTopButton";
import { Button } from "../components/UI/Button";
import { ThemeContext } from "../contexts/ThemeContext";
import {
    getDataFromSessionStorage,
    getDataFromStorage,
    saveDataInSessionStorage,
    saveDataInStorage,
} from "../helpers/storage";

export const MenuPage = () => {
    const [productsAPI, setProductsAPI] = useState(() => {
        const savedProducts = getDataFromStorage("productsData");
        return savedProducts || [];
    });

    const [categorySelected, setCategorySelected] = useState(() => {
        const savedCategory = getDataFromSessionStorage("categorySelected");
        return savedCategory || "all";
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { theme } = useContext(ThemeContext);

    const categories = useMemo(() => {
        if (!productsAPI.length) return [];

        const uniqueCategories = new Set();
        productsAPI.forEach((product) => {
            if (!product.categories && !Array.isArray(productsAPI.categories)) return;
            product.categories.forEach((category) => uniqueCategories.add(category));
        });
        return ["all", ...Array.from(uniqueCategories)];
    }, [productsAPI]);

    const filteredProducts = useMemo(() => {
        if (!categorySelected || categorySelected === "all") return productsAPI;

        return productsAPI.filter(
            (product) => product.categories && product.categories.includes(categorySelected)
        );
    }, [productsAPI, categorySelected]);

    const fetchProducts = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = api.get("/products");
            const data = response?.data;

            if (!Array.isArray(data)) throw new Error("INVALID DATA FORMAT");

            setProductsAPI(data);
            saveDataInStorage("productsData", data);
        } catch (err) {
            console.error("Error Fetching Products:", err);
            setError("Error al Cargar Los Products. Por favor, intentalo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!productsAPI.length) return fetchProducts();
    }, []);

    useEffect(() => {
        if (categorySelected) return saveDataInSessionStorage("categorySelected", categorySelected);
    }, [categorySelected]);

    const handleCategoryChange = (category) => setCategorySelected(category);

    const handleRefreshProduct = () => fetchProducts();

    const clearFilters = () => {
        setCategorySelected("all");
        saveDataInSessionStorage("categorySelected", "all");
    };

    const displayCategoryName = () => {
        if (!categorySelected || categorySelected === "all") return "Todas las Categorias";
        return categorySelected;
    };

    return (
        <div className="flex flex-col flex-1 py-4">
            <Container className="flex-1 gap-4">
                <BackToTopButton
                    size="sm"
                    rounded="lg"
                    showAt={1000}
                    placement="top-right"
                    variant="secondary"
                />

                <div className="lg:flex lg:justify-center">
                    <h1>CARTA</h1>
                </div>

                {error ||
                    (!productsAPI.length && (
                        <div className="flex flex-col gap-4">
                            <span>{error}</span>
                            <Button>{isLoading ? "Refrescando" : "Actualizar"}</Button>
                        </div>
                    ))}

                {isLoading && (
                    <div className="perfect-center flex-1 self-center">
                        <Spinner className="" size="xxl" color="primary" />
                    </div>
                )}

                {!isLoading && (
                    <>
                        <div className="flex justify-between gap-4 lg:justify-center 2xl:flex-col ">
                            <div className="flex items-center gap-6 2xl:justify-center">
                                <Dropdown>
                                    <DropdownTrigger
                                        btnStyle={false}
                                        className={`px-4 py-2 rounded-xl ${
                                            theme === "light"
                                                ? "bg-accent-background text-text-color"
                                                : "bg-accent-background-dark text-text-color-dark"
                                        }`}
                                    >
                                        {displayCategoryName()}
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        {categories.map((category) => (
                                            <DropdownItem
                                                key={category}
                                                onClick={() => handleCategoryChange(category)}
                                                className={categorySelected === category ? "font-bold" : ""}
                                            >
                                                {category === "all" ? "Todas Las Categorias" : category}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>

                                {productsAPI.length && filteredProducts.length && (
                                    <span>
                                        {filteredProducts.length}/{productsAPI.length}
                                    </span>
                                )}
                            </div>

                            {categorySelected !== "all" && (
                                <Button
                                    onClick={clearFilters}
                                    className="self-center"
                                    variant="danger"
                                    size="sm"
                                >
                                    Clear Filter
                                </Button>
                            )}
                        </div>

                        <ProductsContainer className="flex-col gap-4 lg:grid lg:grid-cols-3">
                            {filteredProducts.map((product) => (
                                <ProductItem
                                    key={product.id}
                                    productData={product}
                                    imgSize="w-40 lg:w-1/2 lg:max-w-"
                                    className={`p-4 rounded-2xl gap-4 lg:flex-col items-center`}
                                />
                            ))}
                        </ProductsContainer>
                    </>
                )}
            </Container>
        </div>
    );
};
