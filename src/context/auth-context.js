import React from 'react';
import { useHistory } from "react-router";

import { tokenService } from '../services/token-service';

export const AuthContext = React.createContext({
    isLoggedIn: false,
    login: (userData) => { },
    logout: () => { }
});


export function AuthProvider({ children }) {

    const initToken = tokenService.getTokenFromStorage();
    const [storedToken] = React.useState(initToken);
    const [isLoggedIn, setIsLoggedIn] = React.useState(!!storedToken);
    const history = useHistory();

    const handleLogin = (userData) => {
        tokenService.addTokenToStorage(userData);
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        tokenService.removeTokenFromStorage();
        setIsLoggedIn(false);
        history.replace('/login');
    }

    const values = {
        isLoggedIn,
        login: handleLogin,
        logout: handleLogout
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}