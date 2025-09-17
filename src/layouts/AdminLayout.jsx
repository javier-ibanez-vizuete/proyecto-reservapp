import { Navbar } from "../components/Navbar";

export const AdminLayout = ({ children }) => {
    return (
        <div className="admin-layout">
            <Navbar />
            <aside>ASIDE DEL DASHBOARD</aside>
            <main>{children}</main>
            <footer>FOOTER DEL DASHBOARD</footer>
        </div>
    );
};
