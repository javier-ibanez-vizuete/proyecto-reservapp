export const AdminLayout = ({ children }) => {
    return (
        <div className="admin-layout">
            <aside>ASIDE DEL DASHBOARD</aside>
            <main>{children}</main>
            <footer>FOOTER DEL DASHBOARD</footer>
        </div>
    );
};
