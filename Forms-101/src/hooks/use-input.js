import {useState} from "react";

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueInputChangeHandler = event => {
        setEnteredValue(event.target.value);
    };

    const valueInputBlurHandler = () => {
        setIsTouched(true);
    };

    const reset = () => {
      setEnteredValue('');
      setIsTouched(false);
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueInputBlurHandler,
        valueInputChangeHandler,
        reset
    };
};

export default useInput;