import {useEffect, useState} from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueInputChangeHandler: nameInputChangeHandler,
        valueInputBlurHandler: nameInputBlurHandler,
        reset: resetNameInput,
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueInputChangeHandler: emailInputChangeHandler,
        valueInputBlurHandler: emailInputBlurHandler,
        reset: resetEmailInput,
    } = useInput(value => value.includes('@'));

    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        if(enteredNameIsValid && enteredEmailIsValid) {
            setFormIsValid(true)
        } else {
            setFormIsValid(false);
        }
    }, [enteredNameIsValid, enteredEmailIsValid]);

    const formSubmissionHandler = event => {
        event.preventDefault();

        if (!enteredNameIsValid && !enteredEmailIsValid) {
            return;
        }
        resetNameInput();
        resetEmailInput()
    };

    const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
            type='text'
            id='name'
            onChange={nameInputChangeHandler}
            onBlur={nameInputBlurHandler}
            value={enteredName}
        />
          {nameInputHasError && <p className="error-text">Name must not be empty</p>}
      </div>
        <div className={emailInputClasses}>
            <label htmlFor='email'>Your Email-ID</label>
            <input
                type='text'
                id='email'
                onChange={emailInputChangeHandler}
                onBlur={emailInputBlurHandler}
                value={enteredEmail}
            />
            {emailInputHasError && <p className="error-text">Email must not be empty</p>}
        </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
