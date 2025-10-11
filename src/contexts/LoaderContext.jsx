import { createContext, useState } from "react";

export const LoaderContext = createContext(null);

export const LoaderProvider = ({ children }) => {
    const [loaders, setLoaders] = useState([]);

    return <LoaderContext value={{ loaders, setLoaders }}>{children}</LoaderContext>;
};
