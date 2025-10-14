import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import iconCloseWhite from "../assets/icons/icon-equis-white.webp";
import iconClose from "../assets/icons/icon-equis.webp";
import iconSearchWhite from "../assets/icons/icon-search-white.webp";
import iconSearch from "../assets/icons/icon-search.webp";
import { Card } from "../components/Card/Card";
import { Container } from "../components/Container";
import { Dropdown } from "../components/Dropdown/Dropdown";
import { DropdownItem } from "../components/Dropdown/DropdownItem";
import { DropdownMenu } from "../components/Dropdown/DropdownMenu";
import { DropdownTrigger } from "../components/Dropdown/DropdownTrigger";
import { DeliveryProductItem } from "../components/Products/DeliveryProductItem";
import { ProductsContainer } from "../components/Products/ProductsContainer";
import { SkeletonCard, SkeletonText } from "../components/Skeleton";
import { BackToTopButton } from "../components/UI/BackToTopButton";
import { Image } from "../components/UI/Image";
import { ImageContainer } from "../components/UI/ImageContainer";
import { CartsContext } from "../contexts/CartsContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { ProductsContext } from "../contexts/ProductsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useProducts } from "../core/products/useProducts";
import { saveDataInSessionStorage } from "../helpers/storage";
import { useDevice } from "../hooks/useDevice";

export const OrderPage = () => {
    const { products, categories } = useContext(ProductsContext);
    const { loadingProducts } = useProducts();

    const [isLoading, setIsLoading] = useState(false);

    const { cart } = useContext(CartsContext);
    const { theme } = useContext(ThemeContext);
    const { getText } = useContext(LanguageContext);
    const location = useLocation();

    const [categorySelected, setCategorySelected] = useState(null);
    const [productSearch, setProductSearch] = useState("");

    const [showInput, setShowInput] = useState(false);
    const inputRef = useRef(null);

    const { isMobile } = useDevice();

    useEffect(() => {
        saveDataInSessionStorage("currentRoute", location?.pathname);
    }, []);

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (showInput && event.key === "Escape" && inputRef?.current) {
                setShowInput(false);
                setProductSearch("");

                return inputRef.current.blur();
            }
        };

        document.addEventListener("keydown", handleEscapeKey);

        if (showInput && inputRef?.current) {
            return inputRef.current.focus();
        }
        if (!showInput && inputRef?.current) {
            return inputRef.current.blur();
        }
        return () => document.removeEventListener("keydown", handleEscapeKey);
    }, [showInput]);

    const handleShowInput = () => {
        if (showInput) {
            setShowInput(false);
            return setProductSearch("");
        }
        if (!showInput) {
            return setShowInput(true);
        }
    };

    const onInputChange = (event) => {
        const { value } = event.target;
        setProductSearch(value);
    };

    const handleCategorySelected = (category) => {
        setCategorySelected(category);
    };

    const filteredProducts = useMemo(() => {
        if (!categorySelected && !productSearch) return products;
        if (categorySelected && !productSearch)
            return products.filter(
                (product) => product.categories && product.categories.includes(categorySelected)
            );
        if (productSearch && !categorySelected)
            return products.filter((product) =>
                product.name.toLowerCase().includes(productSearch.toLowerCase().trim())
            );
        return products.filter((product) => {
            const sameCategory = product.categories && product.categories.includes(categorySelected);
            const sameName = product.name.toLowerCase().includes(productSearch.toLowerCase().trim());
            return sameCategory && sameName;
        });
    }, [productSearch, categorySelected]);

    if (loadingProducts)
        return (
            <Container className="flex flex-col gap-6 py-6">
                <h1>{getText("h1OrdersPage")}</h1>
                <div>
                    <SkeletonText lines={3} className="bg-white p-4" />
                </div>
                <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
                    <SkeletonCard textLines={2} showAvatar={false} showImage={true} />
                    <SkeletonCard textLines={2} showAvatar={false} showImage={true} />
                    <SkeletonCard textLines={2} showAvatar={false} showImage={true} />
                    <SkeletonCard textLines={2} showAvatar={false} showImage={true} />
                    <SkeletonCard textLines={2} showAvatar={false} showImage={true} />
                    <SkeletonCard textLines={2} showAvatar={false} showImage={true} />
                </div>
            </Container>
        );

    return (
        <div className="flex flex-1 flex-col py-6">
            <Container className="gap-4">
                <BackToTopButton iconSize="w-5" showAt={1000} placement="top-right" variant="secondary" />

                <div className="flex flex-col">
                    <h1>{getText("h1OrdersPage")}</h1>
                    <small className="lg:self-center">{getText("smallOrdersPageSubtitle")}</small>
                </div>

                {products?.length > 0 && filteredProducts?.length > 0 && (
                    <div className="flex items-center">
                        <Card variant="accent">
                            {filteredProducts?.length}/{products?.length}
                        </Card>
                    </div>
                )}

                {products?.length && filteredProducts?.length <= 0 && (
                    <span className="">0/{products?.length}</span>
                )}

                <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-stretch">
                    <div className="flex">
                        <Dropdown placement={isMobile ? "bottom-start" : "right-start"}>
                            <DropdownTrigger
                                btnStyle={false}
                                className={`px-6 py-3 rounded-lg shadow-lg ${
                                    theme === "light"
                                        ? "bg-accent-background text-text-color"
                                        : "bg-accent-background-dark text-text-color-dark"
                                }`}
                            >
                                <span>
                                    {categorySelected ? categorySelected : getText("allCategoriesFilter")}
                                </span>
                            </DropdownTrigger>
                            <DropdownMenu classNameMenuContainer="flex-col">
                                <DropdownItem
                                    className={categorySelected === "All Categories" ? "font-bold" : ""}
                                    onClick={() => handleCategorySelected("")}
                                >
                                    All Categories
                                </DropdownItem>
                                {categories.map((category) => (
                                    <DropdownItem
                                        key={category}
                                        onClick={() => handleCategorySelected(category)}
                                        className={categorySelected === category ? "font-bold" : ""}
                                    >
                                        {category}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div
                        className={`flex items-center py-3 px-6 transition-all duration-200 ease-in-out rounded-lg shadow-xl ${
                            showInput ? "self-stretch md:max-w-4/5 lg:flex-1 space-x-2" : ""
                        } ${theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"}`}
                    >
                        <div
                            className={`perfect-center flex-1 overflow-hidden transition-all duration-200 ease-in-out ${
                                showInput ? "max-w-full" : "max-w-0"
                            }`}
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                name="name"
                                placeholder={getText("ordersPageInputPlaceholder")}
                                className={`bg-white flex-1 text-text-color placeholder:text-text-color/50 rounded-lg ${
                                    showInput ? "py-1 px-2" : ""
                                }`}
                                maxLength={30}
                                value={productSearch}
                                onChange={onInputChange}
                            />
                        </div>
                        <div
                            className={`perfect-center overflow-hidden transition-all duration-200 ease-in-out`}
                            onClick={handleShowInput}
                        >
                            {showInput && theme === "light" && (
                                <ImageContainer className="w-4">
                                    <Image src={iconClose} />
                                </ImageContainer>
                            )}
                            {showInput && theme !== "light" && (
                                <ImageContainer className="w-4">
                                    <Image src={iconCloseWhite} />
                                </ImageContainer>
                            )}
                            {!showInput && theme === "light" && (
                                <ImageContainer className="w-4">
                                    <Image src={iconSearch} />
                                </ImageContainer>
                            )}
                            {!showInput && theme !== "light" && (
                                <ImageContainer className="w-4">
                                    <Image src={iconSearchWhite} />
                                </ImageContainer>
                            )}
                        </div>
                    </div>
                </div>

                <ProductsContainer className="grid gap-sm sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-md">
                    {filteredProducts.map((product) => {
                        const isCartItem = cart?.items?.find((item) => item.productId === product.id);
                        const productQty = isCartItem ? isCartItem.qty : null;

                        return (
                            <DeliveryProductItem
                                key={product?.id}
                                productData={product}
                                className="gap-4"
                                imgSize="w-full"
                                qty={productQty}
                                isLoading={isLoading}
                            />
                        );
                    })}
                    {!filteredProducts.length && (
                        <h3 className="text-gray-400">No existen Productos con ese nombre</h3>
                    )}
                </ProductsContainer>
            </Container>
        </div>
    );
};
