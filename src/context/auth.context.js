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

    const authenticateUser = () => {
        const storedToken = localStorage.getItem('authToken');
        
        if (storedToken) {
          axios.get(
            `${API}/auth/verify`, 
            { headers: { Authorization: `Bearer ${storedToken}`} }
          )
          .then((response) => {
            const user = response.data;
            console.log("inside .then ",response.data)
            console.log("inside then is admin", isAdmin)
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(user);
            if (user.role === "admin"){
              console.log("--------->>>>>>>>>>>")
                setIsAdmin(true)
            }      
          })
          .catch((error) => {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
            setIsAdmin(false);        
          });      
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
            setIsAdmin(false);      
        }   
      }
     
      const removeToken = () => {
          localStorage.removeItem('authToken')
      };

      const logOutUser = () => {
          removeToken();
          authenticateUser();
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
            }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export {AuthProviderWrapper, AuthContext};