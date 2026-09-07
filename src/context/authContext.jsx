// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_AUTH || 'http://localhost:5000/api';
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [pid, setPid] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUser(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async (token) => {
        try {
            const res = await fetch(`${API_BASE}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                // Set pid directly from user data
                setPid(data.user?.properties || []);
            } else {
                localStorage.removeItem('token');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                setUser(data.user);
                setPid(data.user?.properties || []);
            }
            return data;
        } catch (err) {
            console.error(err);
            return { success: false, error: 'Network error' };
        }
    };

    const register = async (userData) => {
        try {
            const res = await fetch(`${API_BASE}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                setUser(data.user);
                setPid(data.user?.properties || []);
            }
            return data;
        } catch (err) {
            console.error(err);
            return { success: false, error: 'Network error' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setPid([]);
    };

    return (
        <AuthContext.Provider value={{ user, pid, login, register, logout, loading }}>
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
