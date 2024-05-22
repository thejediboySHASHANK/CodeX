"use client"

import {createContext, useContext, useState, useCallback, useEffect} from 'react';
import axios from "axios";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');

    const login = useCallback((token: any, userData: any) => {
        localStorage.setItem('accessToken', token);
        setUser(userData);
        setToken(token);
    }, []);

    useEffect(() => {
        if (!user) {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}profile`, {withCredentials: true}).then(({ data }) => {
                setUser(data);
            })
        }
    }, [])


    const value = {
        user,
        token,
        setToken,
        login,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
