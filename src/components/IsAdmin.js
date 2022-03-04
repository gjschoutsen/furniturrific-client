import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAdmin( { children } ) {
  
  const { isAdmin, isLoading, isLoggedIn } = useContext(AuthContext);
  console.log("inside IsAdmin component", isAdmin)

  if (isLoading) {return <p>Loading ...</p>}

  if (!isAdmin && !isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}



export default IsAdmin;