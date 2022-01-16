import { useState } from "react";

const useForm = (initialState, validate, onValidate) => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});

  const changeHandler = (event) => {
    event.persist();
    setState((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const errors = validate(state);
    setErrors(errors);

    if (!Object.keys(errors).length) {
      onValidate();
    } 
  };
  return { state, setState, errors, setErrors, changeHandler, submitHandler };
};

export default useForm;