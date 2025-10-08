import { useContext, useEffect, useMemo, useState } from "react";
import { Container } from "../components/Container";
import { Dropdown } from "../components/Dropdown/Dropdown";
import { DropdownItem } from "../components/Dropdown/DropdownItem";
import { DropdownMenu } from "../components/Dropdown/DropdownMenu";
import { DropdownTrigger } from "../components/Dropdown/DropdownTrigger";
import { ProductItem } from "../components/Products/ProductItem";
import { ProductsContainer } from "../components/Products/ProductsContainer";
import { LoadingButton } from "../components/Spinner/LoadingButton";
import { BackToTopButton } from "../components/UI/BackToTopButton";
import { Button } from "../components/UI/Button";
import { LanguageContext } from "../contexts/LanguageContext";
import { LoaderContext } from "../contexts/LoaderContext";
import { ProductsContext } from "../contexts/ProductsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useProducts } from "../core/products/useProducts";
import { getDataFromSessionStorage, saveDataInSessionStorage } from "../helpers/storage";

export const MenuPage = () => {
    const { products, categories } = useContext(ProductsContext);
    const { loaders } = useContext(LoaderContext);
    const isLoadingProducts = loaders.includes("get-products-loader");

    const { theme } = useContext(ThemeContext);
    const { getText } = useContext(LanguageContext);
    const { getProducts, loadingProducts } = useProducts();

    const [categorySelected, setCategorySelected] = useState(() => {
        const savedCategory = getDataFromSessionStorage("categorySelected");
        return savedCategory ?? "All Categories";
    });

    const filteredProducts = useMemo(() => {
        if (!categorySelected || categorySelected === "All Categories") return products;

        return products.filter(
            (product) => product.categories && product.categories.includes(categorySelected)
        );
    }, [products, categorySelected]);

    useEffect(() => {
        if (categorySelected) saveDataInSessionStorage("categorySelected", categorySelected);
    }, [categorySelected]);

    const handleCategoryChange = (category) => setCategorySelected(category);

    const handleRefreshProduct = () => getProducts();

    const clearFilters = () => {
        setCategorySelected("All Categories");
        saveDataInSessionStorage("categorySelected", "All Categories");
    };

    const displayCategoryName = () => {
        if (!categorySelected || categorySelected === "All Categories") return "All Categories";
        return categorySelected;
    };

    if (loadingProducts)
        return (
            <h1>MENU ESKELETON</h1>
            // UTILIZAR SKELETON PARA RELLENAR LA WEB MIENTRAS CARGAN LOS PRODUCTOS
        );

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
                    <h1>{getText("h1MenuPage")}</h1>
                </div>
                {!loadingProducts && !products.length && (
                    <div className="flex flex-col justify-center items-center gap-4">
                        <LoadingButton
                            variant="danger"
                            size="lg"
                            loading={loadingProducts}
                            loadingText={getText("loadingTextRefreshProductsButton")}
                            onClick={handleRefreshProduct}
                        >
                            {getText("textRefreshProductsButton")}
                        </LoadingButton>
                        <h2 className="text-error-500">Error Al Cargar Products</h2>
                    </div>
                )}

                {!loadingProducts && (
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
                                        <DropdownItem
                                            onClick={() => {
                                                handleCategoryChange("All Categories");
                                            }}
                                            className={
                                                categorySelected === "All Categories" ? "font-bold" : ""
                                            }
                                        >
                                            All Categories
                                        </DropdownItem>
                                        {categories.map((category) => (
                                            <DropdownItem
                                                key={category}
                                                onClick={() => handleCategoryChange(category)}
                                                className={categorySelected === category ? "font-bold" : ""}
                                            >
                                                {category === "all" ? "All Categories" : category}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>

                                {products.length && filteredProducts.length && (
                                    <span>
                                        {filteredProducts.length}/{products.length}
                                    </span>
                                )}
                            </div>

                            {categorySelected !== "All Categories" && (
                                <Button
                                    onClick={clearFilters}
                                    className="self-center"
                                    variant="danger"
                                    size="sm"
                                >
                                    {getText("clearFilterButton")}
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
