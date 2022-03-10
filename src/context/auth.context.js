import React, {useState, useEffect} from 'react'
import axios from 'axios'
const API = process.env.REACT_APP_API_URL;

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [number, setNumber] = useState(false);

    const storeToken = token => localStorage.setItem('authToken', token); 

    const authenticateUser = () => {
        setIsLoading(true)
        const storedToken = localStorage.getItem('authToken');
        
        if (storedToken) {
          axios.get(
            `${API}/auth/verify`, 
            { headers: { Authorization: `Bearer ${storedToken}`} }
          )
          .then((response) => {
            const user = response.data;
            setIsLoggedIn(true);
            setUser(user);
            if (user.role === "admin"){
                setIsAdmin(true)
            }
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoggedIn(false);
            setUser(null);
            setIsAdmin(false);        
            setIsLoading(false);
          });      
        } else {
            setIsLoggedIn(false);
            setUser(null);
            setIsAdmin(false);      
            setIsLoading(false);
        }   
      }
     
      const removeToken = () => {
          localStorage.removeItem('authToken')
      };

      const resetShoppingCartNr = () => {
        return number ? setNumber(false) : setNumber(true)
      }

      const logOutUser = () => {
          removeToken();
          authenticateUser();
          localStorage.removeItem("cart");
          resetShoppingCartNr();
      }
      
      const getToken = () => {
        return localStorage.getItem('authToken')
      }

      useEffect(() => {
        authenticateUser();
      }, []);

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, 
            isLoading, 
            user, 
            isAdmin, 
            storeToken,
            authenticateUser,
            logOutUser,
            getToken,
            number,
            resetShoppingCartNr
            }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export {AuthProviderWrapper, AuthContext};