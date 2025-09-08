import { Container } from "../components/Container";
import { OrdersSection } from "../sections/OrdersSection";

export const OrdersPage = () => {
    return (
        <div className="flex flex-1">
            <Container className={"flex flex-col flex-1"}>
                <h2>PEDIR PRODUCTOS</h2>
                <OrdersSection />
            </Container>
        </div>
    );
};
