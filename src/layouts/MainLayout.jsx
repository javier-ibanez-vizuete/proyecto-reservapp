import { Footer } from "../components/Footer";
import { NavBar } from "../components/Navbar";

export const MainLayout = ({ children }) => {
	return (
		<div className="flex flex-col h-full bg-background-color text-text-color divide-y divide-text-color/50">
			<NavBar />
			<main className="flex-1 flex flex-col">{children}</main>
			<Footer />
		</div>
	);
};
