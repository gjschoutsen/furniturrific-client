// src/pages/SignupPage.js

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormContext } from "../context/form.context";
import Axios from "axios";
import Form from "../components/Form";
const API = process.env.REACT_APP_API_URL;

function SignupPage(props) {
  const { formInputs, removeInputs } = useContext(FormContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  let template = {
    title: "Sign Up",
    buttonName: "Sign Up",
    fields: [
      {
        title: "Email:",
        type: "email",
        name: "email",
        value: formInputs.email,
      },
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

    Axios
      .post(`${API}/auth/signup`, formInputs)
      .then((response) => {
        removeInputs();
        navigate("/login/2");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signup-page">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Form template={template} onSubmit={onSubmit} />
      <div className="side-box">
        <p>Already have account?</p>
        <Link to={"/login/1"}> Login</Link>
      </div>
    </div>
  );
}

export default SignupPage;
