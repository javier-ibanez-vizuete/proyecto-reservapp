export const AdminLayout = ({ children }) => {
    return (
        <div>
            <header>HEADER DEL DASHBOARD</header>
            <aside>ASIDE DEL DASHBOARD</aside>
            <main>{children}</main>
            <footer>FOOTER DEL DASHBOARD</footer>
        </div>
    );
};
