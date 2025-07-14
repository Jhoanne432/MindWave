import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const AuthContext = createContext({ user: null });

export const AuthContextProvider =  ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {})

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return context;
}