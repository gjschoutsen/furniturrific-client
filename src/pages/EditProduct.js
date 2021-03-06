import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { AuthContext } from "../context/auth.context";
import { FormContext } from "../context/form.context";
import Form from "../components/Form";
const API = process.env.REACT_APP_API_URL;

export default function CreateProduct({ fetch, products }) {
  const { productId } = useParams();
  const product = products.find((product) => productId === product._id);
  const { formInputs, removeInputs } = useContext(FormContext);
  const { getToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ defaultValues, setDefaultValues ] = useState({})
    

  
  useEffect(() => { 
    setDefaultValues(formInputs);
   },[formInputs])

   useEffect(()=>{
    const defaultObject = {
      name: product.name,
      price: product.price,
      productType: product.productType,
      brand: product.brand,
      image: product.image,
      description: product.description
    }
    setDefaultValues(defaultObject)
   },[product])

  let template = {
    title: "Edit your products",
    buttonName: "Edit",
    fields: [
      {
        title: "Name:",
        type: "text",
        name: "name",
        value: defaultValues.name,
      },
      {
        title: "Price:",
        type: "number",
        name: "price",
        value: defaultValues.price,
      },
      {
        title: "Brand:",
        type: "text",
        name: "brand",
        value: defaultValues.brand,
      },
      {
        title: "Image:",
        type: "text",
        name: "image",
        value: defaultValues.image,
      },
      {
        title: "Description:",
        type: "text",
        name: "description",
        value: defaultValues.description,
        as: "textarea",
        rows: 4
      },
      {
        select: true,
        selectName: "productType",
        selectValue: defaultValues.productType,
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

    Axios.put(`${API}/products/${product._id}`, formInputs, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then(() => {
        fetch();
        navigate(`/products/${product._id}`);
      })
      .catch((err) => console.log("Error posting product to DB", err));
  };

  return (
    <div>
      <Form template={template} onSubmit={onSubmit} />
    </div>
  );
}
