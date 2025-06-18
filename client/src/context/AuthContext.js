import { createContext, useContext, useEffect, useState } from 'react';
const API_URL = 'http://localhost:8000/api';
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token') || '');
    const [email, setEmail] = useState(() => localStorage.getItem('email') || '');

    useEffect(() => {
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({ _id: payload.id, email: payload.email }); 
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = async (email, password) => {
        const res = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok && data.token) {
            setToken(data.token);
            localStorage.setItem('email', email);
            setEmail(email);
            return { user: { _id: JSON.parse(atob(data.token.split('.')[1])).id } };
        } else {
            return { message: data.error || 'Error al iniciar sesión' };
        }
    };

    const register = async (name, email, password) => {
        const res = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        
        
        const data = await res.json();
        if (res.ok) {
            return { message: "Usuario creado exitosamente, inicie sesion" }
        } else {
            return { messageError: data.error || 'Error al registrar usuario' };
        }
    };

    const logout = () => {
        setToken('');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, email }}>
            {children}
        </AuthContext.Provider>
    );
};

