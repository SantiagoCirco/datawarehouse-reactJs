import React from 'react';

export const AuthContext = React.createContext({
    isLoggedIn: () => { },
    login: (userData) => { },
});


export function AuthProvider({ children }) {


    const isLoggedIn = () => {
        return !!(JSON.parse(window.localStorage.getItem('AUTH')) || '');
    }

    const handleLogin = (userData) => {
        window.localStorage.setItem(
            'AUTH',
            JSON.stringify(userData)
        );
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