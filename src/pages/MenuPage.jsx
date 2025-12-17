import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Card } from "../components/Card/Card";
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
import { ProductsContext } from "../contexts/ProductsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useProducts } from "../core/products/useProducts";
import { getDataFromSessionStorage, saveDataInSessionStorage } from "../helpers/storage";

function MenuPage() {
    const { products, categories } = useContext(ProductsContext);

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

    const handleCategoryChange = useCallback((category) => setCategorySelected(category));

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

    if (!loadingProducts && !products.length)
        return (
            <>
                {/* Añadir Estilos Para cuando no hay productos y no esta cargando */}
                <h2>NO HAY PRODUCTS</h2>
                <Button onClick={handleRefreshProduct}>Refrescar productos</Button>
            </>
        );

    return (
        <div className="flex flex-col flex-1 py-4">
            <Container className="flex-1 gap-4">
                <BackToTopButton iconSize={"w-5"} showAt={1000} placement="top-right" variant="secondary" />
                <div className="lg:flex lg:justify-center">
                    <h1>{getText("menu_page.h1_menu_page")}</h1>
                </div>
                {!loadingProducts && !products.length && (
                    <div className="flex flex-col justify-center items-center gap-4">
                        <LoadingButton
                            variant="danger"
                            size="lg"
                            loading={loadingProducts}
                            loadingText={getText("menu_page.loading_text_refresh_products_button")}
                            onClick={handleRefreshProduct}
                        >
                            {getText("menu_page.text_refresh_products_button")}
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
                                        className={`px-4 py-2 rounded-xl shadow-md ${
                                            theme === "light"
                                                ? "bg-accent-background text-text-color"
                                                : "bg-accent-background-dark text-text-color-dark"
                                        }`}
                                    >
                                        {displayCategoryName()}
                                    </DropdownTrigger>
                                    <DropdownMenu classNameMenuContainer="flex-col">
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
                                    <Card variant="accent" rounded={"lg"}>
                                        {filteredProducts.length}/{products.length}
                                    </Card>
                                )}
                            </div>

                            {categorySelected !== "All Categories" && (
                                <Button
                                    onClick={clearFilters}
                                    className="self-center"
                                    variant="danger"
                                    size="sm"
                                >
                                    {getText("menu_page.clear_filter_button")}
                                </Button>
                            )}
                        </div>

                        <ProductsContainer className="grid grid-cols-1 gap-sm sm:grid-cols-2 xs:gap-md md:grid-cols-3 md:gap-lg xl:grid-cols-4 xl:gap-xl">
                            {filteredProducts.map((product) => (
                                <ProductItem key={product.id} productData={product} />
                            ))}
                        </ProductsContainer>
                    </>
                )}
            </Container>
        </div>
    );
}

export default MenuPage;
