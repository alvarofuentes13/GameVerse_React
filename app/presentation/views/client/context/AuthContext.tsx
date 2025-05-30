import {createContext, useContext, useState} from "react";


interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    fechaRegistro: string;
    avatar?: string | null;
    biografia?: string | null;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    setAuth: (user?: User, token?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const setAuth = (newUser?: User, newToken?: string) => {
       if(newUser) setUser(newUser);
       if(newToken) setToken(newToken);
    };

    return (
        <AuthContext.Provider value={{ user, token, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};