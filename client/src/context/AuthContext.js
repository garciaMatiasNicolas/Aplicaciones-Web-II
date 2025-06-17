import { createContext, useContext, useEffect, useState } from 'react';
const API_URL = 'http://localhost:8000/api';
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token') || '');

    useEffect(() => {
        if (token) {
            // Opcional: podés validar el token en el backend
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({ _id: payload.id }); // Podés hacer fetch del usuario completo si querés
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = async (email, password) => {
        const res = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok && data.token) {
            setToken(data.token);
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
            // Podés hacer login automático o pedir que inicie sesión
            return login(email, password);
        } else {
            return { message: data.error || 'Error al registrar usuario' };
        }
    };

    const logout = () => {
        setToken('');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

