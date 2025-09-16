import { DashboardNavbar } from "../components/DashboardNavbar";

export const AdminLayout = ({ children }) => {
    return (
        <div className="flex flex-col bg-amber-300">
            <DashboardNavbar />
            <aside>ASIDE DEL DASHBOARD</aside>
            <main>{children}</main>
            <footer>FOOTER DEL DASHBOARD</footer>
        </div>
    );
};
