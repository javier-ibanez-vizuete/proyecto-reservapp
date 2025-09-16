import { Container } from "../components/Container";
import { OrdersSection } from "../sections/OrdersSection";

export const OrdersPage = () => {
    return (
        <div className="flex flex-1">
            <Container className={"flex flex-col flex-1"}>
                <h1>PEDIR PRODUCTOS</h1>
                <OrdersSection />
            </Container>
        </div>
    );
};
