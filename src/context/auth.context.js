import React, {useState, useEffect} from 'react'
import axios from 'axios'
const API = process.env.REACT_APP_API_URL;

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = token => localStorage.setItem('authToken', token); 

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, 
            isLoading, 
            user, 
            isAdmin, 
            storeToken, 
            }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export {AuthProviderWrapper, AuthContext};