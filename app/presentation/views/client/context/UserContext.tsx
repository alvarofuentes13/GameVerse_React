import React, { createContext, useState, useContext, ReactNode } from 'react'; // Importa funciones y tipos necesarios de React

// Define el tipo de los datos del usuario
interface User {
    id: number; // Identificador único del usuario
    email: string; // Correo electrónico del usuario
    name: string; // Nombre del usuario
    password: string; // Contraseña del usuario
    fechaRegistro: string; // Fecha de registro del usuario
    avatar?: string | null; // URL del avatar (opcional)
    biografia?: string | null; // Biografía del usuario (opcional)
}

// Define el tipo del contexto
interface UserContextType {
    user: User | null; // Usuario actual o null si no hay
    setUserData: (userData: User) => void; // Función para establecer los datos del usuario
}

// Crear el contexto con un valor predeterminado (por defecto es undefined)
const UserContext = createContext<UserContextType | undefined>(undefined);

// Proveedor del contexto para envolver la aplicación
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null); // Estado para almacenar el usuario

    // Función para actualizar los datos del usuario
    const setUserData = (userData: User) => {
        setUser(userData); // Actualiza el estado con los nuevos datos del usuario
    };

    // Provee el contexto a los componentes hijos
    return (
        <UserContext.Provider value={{ user, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para consumir el contexto
export const useUser = (): UserContextType => {
    const context = useContext(UserContext); // Obtiene el contexto
    if (!context) {
        throw new Error('useUser must be used within a UserProvider'); // Asegura que se use dentro del proveedor
    }
    return context; // Devuelve el contexto
};
