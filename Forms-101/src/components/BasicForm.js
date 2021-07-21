import useInput from "../hooks/use-input";
import {useEffect, useState} from "react";

const BasicForm = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);

    const {
        value: enteredFName,
        isValid: FNameIsValid,
        hasError: FNameHasError,
        valueInputChangeHandler: FNameChangeHandler,
        valueInputBlurHandler: FNameBlurHandler,
        reset: resetFNameHandler
    } = useInput(value => value.trim() !== "");

    const {
        value: enteredLName,
        isValid: LNameIsValid,
        hasError: LNameHasError,
        valueInputChangeHandler: LNameChangeHandler,
        valueInputBlurHandler: LNameBlurHandler,
        reset: resetLNameHandler,
    } = useInput(value => value.trim() !== "");

    const {
        value: enteredEmail,
        isValid: EmailIsValid,
        hasError: emailInputHasError,
        valueInputChangeHandler: emailChangeHandler,
        valueInputBlurHandler: emailBlurHandler,
        reset: resetEmailHandler,
    } = useInput(value => value.includes('@'));

    const formSubmitHandler = (event) => {
        event.preventDefault();

        if(!FNameIsValid || !LNameIsValid || !EmailIsValid) {
            return;
        }
        resetFNameHandler();
        resetLNameHandler();
        resetEmailHandler();
    }

    const FNameInputClasses = FNameHasError ? 'form-control invalid' : 'form-control';
    const LNameInputClasses = LNameHasError ? 'form-control invalid' : 'form-control';
    const EmailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

    useEffect(() => {
        if (EmailIsValid && LNameIsValid && FNameIsValid) {
            setFormIsValid(true);
        } else {
            setFormIsValid(false)
        }
    }, [EmailIsValid, LNameIsValid, FNameIsValid]);

    return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={FNameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input
              type='text'
              id='name'
              value={enteredFName}
              onChange={FNameChangeHandler}
              onBlur={FNameBlurHandler}
          />
            {FNameHasError && <p>First Name not valid!</p>}
        </div>
        <div className={LNameInputClasses}>
          <label htmlFor='name'>Last Name</label>
          <input
              type='text'
              id='name'
              value={enteredLName}
              onChange={LNameChangeHandler}
              onBlur={LNameBlurHandler}
          />
            {LNameHasError && <p>Last Name not valid!</p>}
        </div>
      </div>
      <div className={EmailInputClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
            type='text'
            id='name'
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
        />
          {emailInputHasError && <p>Email isn't valid!</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
