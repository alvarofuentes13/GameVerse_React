import { createContext, useContext, useState } from "react"; // Importa funciones necesarias de React

// Interfaz que define la estructura del objeto User
interface User {
    id: number; // Identificador único del usuario
    email: string; // Correo electrónico del usuario
    name: string; // Nombre del usuario
    password: string; // Contraseña del usuario
    fechaRegistro: string; // Fecha de registro del usuario
    avatar?: string | null; // URL del avatar (opcional)
    biografia?: string | null; // Biografía del usuario (opcional)
}

// Interfaz que define el tipo del contexto de autenticación
interface AuthContextType {
    user: User | null; // Usuario autenticado o null si no hay
    token: string | null; // Token de autenticación o null si no hay
    setAuth: (user?: User, token?: string) => void; // Función para establecer el usuario y el token
}

// Crea un contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente proveedor de contexto de autenticación
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null); // Estado para almacenar el usuario
    const [token, setToken] = useState<string | null>(null); // Estado para almacenar el token

    // Función para establecer el usuario y el token
    const setAuth = (newUser?: User, newToken?: string) => {
        if (newUser) setUser(newUser); // Actualiza el usuario si se proporciona
        if (newToken) setToken(newToken); // Actualiza el token si se proporciona
    };

    // Provee el contexto a los componentes hijos
    return (
        <AuthContext.Provider value={{ user, token, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext); // Obtiene el contexto
    if (!context) throw new Error("useAuth must be used within AuthProvider"); // Asegura que se use dentro del proveedor
    return context; // Devuelve el contexto
};
