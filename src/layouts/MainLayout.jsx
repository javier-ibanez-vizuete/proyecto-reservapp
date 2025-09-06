import { Footer } from "../components/Footer";
import { NavBar } from "../components/Navbar";

export const MainLayout = ({ children }) => {
	return (
		<div className="flex flex-col h-full">
			<NavBar />
			<main className="flex-1 flex flex-col">{children}</main>
			<Footer />
		</div>
	);
};
