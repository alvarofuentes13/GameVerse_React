import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define el tipo de los datos del usuario
interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    fechaRegistro: string;
    avatar?: string | null;
    biografia?: string | null;
}

// Define el tipo del contexto
interface UserContextType {
    user: User | null;
    setUserData: (userData: User) => void;
}

// Crear el contexto con un valor predeterminado (por defecto es undefined)
const UserContext = createContext<UserContextType | undefined>(undefined);

// Proveedor del contexto para envolver la aplicación
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const setUserData = (userData: User) => {
        setUser(userData);
    };

    return (
        <UserContext.Provider value={{ user, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para consumir el contexto
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
