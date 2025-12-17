import { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { useProducts } from "../../core/products/useProducts";

export const AdminProductsPage = () => {
    const { products } = useContext(ProductsContext);
    const { deleteProductById } = useProducts();

    // PAGINA HECHA PARA ELIMINAR DE LA API TODOS LOS PRODUCTS RAPIDAMENTE (AUN NO ESTA TERMINADA)

    return (
        <div>
            <h1>Products Admin</h1>

            {products.map((product) => (
                <div key={product.id}>
                    <p>{product.name}</p>
                    <button onClick={() => deleteProductById(product.id)}>Eliminar</button>
                </div>
            ))}
        </div>
    );
};
