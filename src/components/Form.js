import React, { useState, useContext } from "react";
import { FormContext } from "../context/form.context";
import { Button, FormControl, FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import "./css/Form.css"

export default function Form({ template, onSubmit }) {
  const { title, fields } = template;

  const [formInputs, setFormInputs] = useState({});
  const { getFormInputs } = useContext(FormContext);

  const renderFields = (fields) => {
    return fields.map((field) => {
      const {
        title,
        type,
        name,
        value,
        select,
        selectName,
        options,
        placeholder,
      } = field;

      let handleFormInput = (e) => {
        const copyInputs = { ...formInputs };
        copyInputs[e.target.name] = e.target.value;
        getFormInputs(copyInputs);
        setFormInputs(copyInputs);
      };

      return (
        <div >
          {name && (
            <FormGroup className="mb-3" >
            <div key={name}>
              <FormLabel htmlFor={name}>{title}</FormLabel>
              <FormControl
                type={type}
                name={name}
                value={value}
                onChange={handleFormInput}
                placeholder={placeholder}
                required
              />
            </div>
            </FormGroup>
          )}
          {select && (
            <>
            <FormLabel htmlFor={name}>Select item type here:</FormLabel>
            <FormSelect name={selectName} onChange={handleFormInput}>
              {options.map((option) => {
                return (
                  <option key={option.title} value={option.value}>
                    {option.title}
                  </option>
                );
              })}
            </FormSelect>
          </>
          )}
        </div>
      );
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
      <div>
          <h4 className="form-title">{title}</h4>
        </div>
        {renderFields(fields)}
        <div className="form-button">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
