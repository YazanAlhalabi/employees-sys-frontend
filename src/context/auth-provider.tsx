import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router"; // or "react-router-dom"

type AuthContextType = {
    token: string | null;
    updateToken: (token: string | null) => void;
    logout: () => void; // Added logout helper
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("authToken");
    });

    const updateToken = (newToken: string | null) => {
        if (newToken) {
            localStorage.setItem("authToken", newToken);
        } else {
            localStorage.removeItem("authToken");
        }
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, updateToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}