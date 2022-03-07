import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { AuthContext } from "../context/auth.context";
import { FormContext } from "../context/form.context";
import Form from "../components/Form";
const API = process.env.REACT_APP_API_URL;

export default function CreateProduct({ fetch, products }) {
  const { productId } = useParams();
  const project = products.find((product) => productId === product._id);
  const { formInputs, removeInputs } = useContext(FormContext);
  const { getToken } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(formInputs);

  let template = {
    title: "Add new products",
    fields: [
      {
        title: "Name:",
        type: "text",
        name: "name",
        value: formInputs.name,
        placeholder: project.name,
      },
      {
        title: "Price:",
        type: "number",
        name: "price",
        value: formInputs.price,
        placeholder: project.price,
      },
      {
        title: "Brand:",
        type: "text",
        name: "brand",
        value: formInputs.brand,
        placeholder: project.brand,
      },
      {
        title: "Image:",
        type: "text",
        name: "image",
        value: formInputs.image,
        placeholder: project.image,
      },
      {
        title: "Description:",
        type: "text",
        name: "description",
        value: formInputs.description,
        placeholder: project.description,
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

    Axios.put(`${API}/products/${project._id}`, formInputs, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then(() => {
        fetch();
        navigate(`/products/${project._id}`);
      })
      .catch((err) => console.log("Error posting product to DB", err));
  };

  return (
    <div>
      <Form template={template} onSubmit={onSubmit} />
    </div>
  );
}
