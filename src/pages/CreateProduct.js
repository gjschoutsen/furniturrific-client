import { useState, useContext } from "react";
import Axios from "axios";
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import { FormContext } from "../context/form.context";
import Form from "../components/Form";
const API = process.env.REACT_APP_API_URL;

export default function CreateProduct({ fetch }) {
  const { formInputs, removeInputs } = useContext(FormContext);
  const { getToken } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(formInputs);

  let template = {
    title: "Create new products",
    fields: [
      {
        title: "Name:",
        type: "text",
        name: "name",
        value: formInputs.name,
      },
      {
        title: "Price:",
        type: "number",
        name: "price",
        value: formInputs.price,
      },
      {
        title: "Brand:",
        type: "text",
        name: "brand",
        value: formInputs.brand,
      },
      {
        title: "Image:",
        type: "text",
        name: "image",
        value: formInputs.image,
      },
      {
        title: "Description:",
        type: "text",
        name: "description",
        value: formInputs.description,
        as: "textarea",
        rows: 4
      },
      {
        select: true,
        selectName: "productType",
        options: [
          { value: "couch", title: "Couch" },
          { value: "chair", title: "Chair" },
          { value: "table", title: "Table" },
          { value: "light", title: "Light" },
          { value: "accessories", title: "Accessories" },
        ],
      },
    ],
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const storedToken = getToken();
    console.log(formInputs);

    Axios.post(`${API}/products`, formInputs, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then(() => {
        fetch();
        navigate(`/shop`);
        removeInputs();
      })
      .catch((err) => console.log("Error posting product to DB", err));
  };

  return (
    <div>
      <Form template={template} onSubmit={onSubmit} />
    </div>
  );
};
