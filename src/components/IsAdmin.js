import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAdmin( { children } ) {
  
  const { isAdmin, isLoading, isLoggedIn } = useContext(AuthContext);

  if (isLoading) {
    return <p>Loading ...</p>
  } else if (isAdmin) {
    return children;
  } else {
    return <Navigate to="/" />;
  }

}



export default IsAdmin;