import { useImageFallback } from "./hooks/useImageFallback";
import { MainLayout } from "./layouts/MainLayout";
import { AppRouter } from "./routes/AppRouter";

export const App = () => {
	useImageFallback();
	
	return (
		<MainLayout>
			<AppRouter />
		</MainLayout>
	);
};
