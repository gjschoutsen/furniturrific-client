import React, {useState, useEffect} from 'react'
import axios from 'axios'
const API = process.env.REACT_APP_API_URL;

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, isAdmin }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export {AuthProviderWrapper, AuthContext};