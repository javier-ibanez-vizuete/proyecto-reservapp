import { createContext, useEffect, useMemo, useState } from "react";
import { getUserFromLocalStorage } from "../core/auth/auth.service";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = getUserFromLocalStorage();
        if (!user) return setUser(false);
        setUser(user);
    }, []);

    const valueContext = useMemo(() => ({ user, setUser }), [user]);

    return <AuthContext value={valueContext}>{children}</AuthContext>;
};
