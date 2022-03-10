import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import "./css/Login.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FormContext } from "../context/form.context";
import Form from "../components/Form";
const API = process.env.REACT_APP_API_URL;

function LoginPage(props) {
  const { formInputs, removeInputs } = useContext(FormContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const LoginNum = useParams();

  let template = {
    title: "Login",
    buttonName: "Login",
    fields: [
      {
        title: "Username:",
        type: "text",
        name: "username",
        value: formInputs.name,
      },
      {
        title: "Password:",
        type: "password",
        name: "password",
        value: formInputs.password,
      },
    ],
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API}/auth/login`, formInputs)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        removeInputs();
        if (LoginNum.num === "2") {
          navigate("/");
        } else {
          navigate("/cart/1");
        }
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        console.log(error.response);
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="login-body">
      <div className="login-page">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Form template={template} onSubmit={onSubmit} />
      </div>
        <div className="side-box">
          <div className="side-box2">
            <div className="signup-link">
              <p>Don't have an account yet?</p>
      <Link to={"/signup"}>
              Sign Up
      </Link>
            </div>
          </div>
        </div>
    </div>
  );
}

export default LoginPage;
