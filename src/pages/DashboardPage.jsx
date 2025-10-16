import { AdminBentoGrid } from "../dashboard/components/AdminBentoGrid";
import { AdminBentoGridItem } from "../dashboard/components/AdminBentoGridItem";

export const DashboardPage = () => {
    const dashboardItems = [
        {
            title: 5,
            description: "Usuarios Conectados",
            icon: "",
            to: "/dashboard/users",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: 6,
            description: "Reservas (Hoy)",
            icon: "",
            to: "/dashboard/bookings",
            colSpan: 2,
            rowSpan: 2,
            gradient: null,
        },
        {
            title: 4,
            description: "Pedidos Pendientes",
            icon: "",
            to: "/dashboard/orders",
            colSpan: 1,
            rowSpan: 1,
            gradient: null,
        },
        {
            title: 40,
            description: "Productos",
            icon: "",
            to: "/dashboard/products",
            colSpan: 2,
            rowSpan: 1,
            gradient: null,
        },
    ];

    return (
        <div>
            <AdminBentoGrid>
                {dashboardItems.map((item) => (
                    <AdminBentoGridItem
                        key={item.description}
                        to={item.to}
                        colSpan={item.colSpan}
                        rowSpan={item.rowSpan}
                        title={item.title}
                        description={item.description}
                    />
                ))}
                {/* ESTO ES UN EJEMPLO HAY QUE COMPONETIZARLO */}
                <AdminBentoGridItem to="/dashboard/users" colSpan={3} rowSpan={2}>
                    <article className="flex flex-1">
                        <div>
                            <div>Avatar 1</div>
                            <h6>username 1</h6>
                            <div>
                                <p>Pedidos:</p>
                                <p>2</p>
                            </div>
                        </div>
                        <div>
                            <div>Avatar 2</div>
                            <h6>username 2</h6>
                            <div>
                                <p>Pedidos:</p>
                                <p>4</p>
                            </div>
                        </div>
                        <div>
                            <div>Avatar 3</div>
                            <h6>username 3</h6>
                            <div>
                                <p>Pedidos:</p>
                                <p>6</p>
                            </div>
                        </div>
                    </article>
                </AdminBentoGridItem>
            </AdminBentoGrid>
        </div>
    );
};
