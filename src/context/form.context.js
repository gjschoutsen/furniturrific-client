import React, {useState} from 'react'

const FormContext = React.createContext();

function FormWrapper (props){
    const [formInputs, setFormInputs]= useState([])

        const getFormInputs = (inputs) => {
            setFormInputs(inputs)
        }

        const removeInputs= () => {
            setFormInputs([])
        }
    
        return(
            <FormContext.Provider value={{
                formInputs,
                getFormInputs,
                removeInputs
                }}>
            {props.children}
        </FormContext.Provider>
        )
       
};

export {FormWrapper, FormContext};