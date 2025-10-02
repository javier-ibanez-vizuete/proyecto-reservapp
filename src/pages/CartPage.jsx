import { useContext, useEffect } from "react";
import { AccordionProductsCart } from "../components/AccordionProductsCart";
import { Container } from "../components/Container";
import { SkeletonCard } from "../components/Skeleton";
import { Button } from "../components/UI/Button";
import { CartsContext } from "../contexts/CartsContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useCart } from "../core/cart/useCart";
import { useLoading } from "../hooks/useLoading";

export const CartPage = () => {
    const { getCartSummary } = useCart();

    const { cart, cartSummary } = useContext(CartsContext);
    const { theme } = useContext(ThemeContext);

    const { isLoading, setIsLoading } = useLoading();

    const handleGetSummaryCart = async () => {
        setIsLoading(true);
        try {
            await getCartSummary();
        } catch (err) {
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (cart) handleGetSummaryCart();
        console.log(cartSummary);
    }, [cart]);

    if (isLoading)
        return (
            <div className="flex flex-col flex-1 py-6">
                <Container className="flex-1 gap-3">
                    <SkeletonCard showAvatar={false} textLines={1} />
                    <div
                        className={`flex flex-col gap-3 w-full mx-auto max-w-[600px] px-6 py-3 rounded-lg border border-gray-400 shadow-md ${
                            theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                        }`}
                    >
                        <SkeletonCard showAvatar={false} textLines={2} />
                        <SkeletonCard showAvatar={false} textLines={2} />
                        <SkeletonCard showAvatar={false} textLines={2} />
                        <SkeletonCard showAvatar={false} showText={false} showImage={true} />
                    </div>
                </Container>
            </div>
        );

    return (
        <div className="flex flex-col flex-1 py-6">
            <Container className="flex-1">
                <div>
                    <h1>CARRITO</h1>
                </div>

                <div
                    className={`flex flex-col justify-between ${
                        cartSummary ? "gap-4" : ""
                    } w-full mx-auto max-w-[600px] px-6 py-3 rounded-lg border border-gray-400 shadow-md ${
                        theme === "light" ? "bg-accent-background" : "bg-accent-background-dark"
                    }`}
                >
                    <AccordionProductsCart products={cart?.items} defaultOpen={null} />

                    {cart?.items?.length && cartSummary && (
                        <div
                            className={`flex flex-col gap-4 ${
                                theme === "light" ? "bg-background" : "bg-background-dark"
                            } p-4 md:p-6 flex-1 rounded-lg`}
                        >
                            <div className="flex flex-1 flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <h6>Total Items</h6>
                                    <small>{cartSummary.totalItems}</small>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h6>Subtotal</h6>
                                    <small>
                                        {cartSummary.subtotal}
                                        <span className="ml-2">{cartSummary.currency}</span>
                                    </small>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h6>taxRate</h6>
                                    <small>{cartSummary.taxRate}</small>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h6>Total</h6>
                                    <small>
                                        {cartSummary.total}{" "}
                                        <span className="ml-2">{cartSummary.currency}</span>
                                    </small>
                                </div>
                            </div>
                            <div className="flex items-end">
                                <Button className="min-w-[150px]">Pedir</Button>
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};
