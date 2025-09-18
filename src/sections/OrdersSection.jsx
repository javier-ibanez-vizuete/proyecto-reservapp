import { useEffect, useState } from "react";
import { ProductCard } from "../components/UI/ProductCard";
import { useFetch } from "../hooks/useFetch";

export const OrdersSection = () => {
    const { data, loading, error } = useFetch(`http://localhost:3000/products`);
    const [products, setProducts] = useState(data || []);
    const [filter, setFilter] = useState("");

    useEffect(() => {}, []);

    const handleIncreaseProduct = (id) => {
        const productSelected = products.find((product) => product?.productId === id);
        if (!productSelected) return console.log("PRODUCTO NO ENCONTRADO");

        const restOfProducts = products.filter((product) => product?.productId !== id);

        if (!productSelected?.qty) {
            const newProduct = { ...productSelected, qty: 1 };
            return setProducts([...restOfProducts, newProduct]);
        }
        const newQty = productSelected?.qty + 1;
        const newProduct = { ...productSelected, qty: newQty };
        console.log(newProduct);
        return;
    };

    const handleDecreaseProduct = (id) => {
        const productSelected = products.find((product) => product?.productId === id);
        if (!productSelected) return console.log("PRODUCTO NO ENCONTRADO");

        const restOfProducts = products.filter((product) => product?.productId !== id);

        if (productSelected.qty === 1) {
            const { qty, ...restProperties } = productSelected;
            const newProduct = { ...restProperties };
            setProducts([...restOfProducts, newProduct]);
        }
    };

    return (
        <section className="flex flex-col">
            <div className="grid grid-cols-1 place-self-center lg:grid-cols-2">
                {products
                    .sort((productA, productB) => productA?.productId - productB?.productId)
                    .map((product) => {
                        return (
                            <ProductCard
                                key={product.productId}
                                productData={product}
                                handleDecreaseProduct={handleDecreaseProduct}
                                handleIncreaseProduct={handleIncreaseProduct}
                            />
                        );
                    })}
            </div>
        </section>
    );
};
