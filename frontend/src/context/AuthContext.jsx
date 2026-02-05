//src/context/AuthContext.jsx 

import React, { creaeContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

// Create the context 
const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    // State to hold current user info 
    const [user, setUser] = useState(() => {
        // Check local storage for user info on initial load
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to handle login
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login(email, password);
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
            navigate('/dashboard'); // Redirect to dashboard after login
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    // Function to handle logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login'); // Redirect to login page after logout
    };

    // Register function (optional)
    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.register(userData);
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
            navigate('/dashboard'); // Redirect to dashboard after registration
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    // Check for existing token on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !user) {
            // Simulate fetching user info using token
            authService.getUserInfo(token)
                .then(userInfo => {
                    setUser(userInfo);
                })
                .catch(err => {
                    localStorage.removeItem('token');
                    navigate('/login');
                });
        }
    }, [user, navigate]);

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthContext;
