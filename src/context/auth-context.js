import React, { useState } from 'react';

export const AuthContext = React.createContext({
    isLoggedIn: () => { },
    login: (userData) => { },
});


export function AuthProvider({ children }) {

    const isLoggedIn = () => {
        const authData = JSON.parse(window.localStorage.getItem('AUTH')) || '';
        return !!authData;
    }

    const handleLogin = (userData) => {
        window.localStorage.setItem(
            'AUTH',
            JSON.stringify(userData)
        );
        isLoggedIn();
    }

    const values = {
        isLoggedIn,
        login: handleLogin,
        // logout: handleLogout
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}