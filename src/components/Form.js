import React, { useState, useContext } from "react";
import { FormContext } from "../context/form.context";
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
} from "react-bootstrap";
import "./css/Form.css";

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
        selectValue,
        select,
        selectName,
        options,
        placeholder,
        as,
        rows,
      } = field;

      let handleFormInput = (e) => {
        const copyInputs = { ...formInputs };
        copyInputs[e.target.name] = e.target.value;
        getFormInputs(copyInputs);
        setFormInputs(copyInputs);
      };

      return (
        <div key={name}>
          {name && (
            <FormGroup  className="mb-3">
              <div>
                <FormLabel htmlFor={name}>{title}</FormLabel>
                <FormControl
                  as={as}
                  rows={rows}
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
              <FormSelect
                name={selectName}
                value={selectValue}
                onChange={handleFormInput}
              >
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
          <div className="form-tile">
            <h4 className="form-title">{title}</h4>
            {renderFields(fields)}
          </div>
        </div>
        <div className="form-button">
          <Button type="submit" variant="outline-warning">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
