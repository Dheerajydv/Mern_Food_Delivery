import { createContext, ReactNode, useContext } from "react";
import { useState } from "react";
import { AuthContextType } from "../../types/types";

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const findIsAuthenticated = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Authcontext not found");
    }
    return context;
};
