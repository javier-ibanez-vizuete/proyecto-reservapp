import { useEffect, useState } from "react";

export const useFetch = (url = "", options = null) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(null);
	const [errorFetch, setErrorFecth] = useState(null);

	const handleFetch = async () => {
		try {
			const response = await fetch(options ? (url, options) : url);
			if (!response.ok) {
				setErrorFecth(response);
				throw new Error(response);
			}
			const dataFetch = await response.json();
			setData(dataFetch);
		} catch (error) {
			setErrorFecth(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(true);
		setErrorFecth(null);
		handleFetch();
	}, [url]);

	return { data, loading, errorFetch };
};
