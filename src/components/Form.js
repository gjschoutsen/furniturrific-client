import React, { useState, useContext } from "react";
import { FormContext } from "../context/form.context";

export default function Form({ template, onSubmit }) {
  const { title, fields } = template;

  const [formInputs, setFormInputs] = useState({});
  const { getFormInputs } = useContext(FormContext);

  const renderFields = (fields) => {
    return fields.map((field) => {
      const { title, type, name, value, select, selectName, options, placeholder } = field;

      let handleFormInput = (e) => {
        const copyInputs = { ...formInputs };
        copyInputs[e.target.name] = e.target.value;
        getFormInputs(copyInputs);
        setFormInputs(copyInputs);
      };

      return (
        <>
          {name && (
            <div key={name}>
              <label htmlFor={name}>{title}</label>
              <input
                type={type}
                name={name}
                value={value}
                onChange={handleFormInput}
                placeholder={placeholder}
                // required
              />
            </div>
          )}
          {select && (
            <select name={selectName} onChange={handleFormInput}>
              {options.map((option) => {
                return <option value={option.value}>{option.title}</option>;
              })}
            </select>
          )}
        </>
      );
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h4>{title}</h4>
        {renderFields(fields)}
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
