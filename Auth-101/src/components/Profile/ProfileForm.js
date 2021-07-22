import classes from './ProfileForm.module.css';
import {useContext, useRef} from "react";
import AuthContext from "../../store/auth-context";
import {useHistory} from "react-router-dom";


const ProfileForm = () => {
    const newPwInputRef = useRef();

    const history = useHistory();

    const authContext = useContext(AuthContext);

    const submitHandler = (e) => {
        e.preventDefault();

        const enteredNewPassword = newPwInputRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBDh2F38dFWGnl7X0z8kCLBXTDOyQgCVpo', {
            method: "POST",
            body: JSON.stringify({
                idToken: authContext.token,
                password: enteredNewPassword,
                returnSecureToken: false,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log("PW Changed!");
            history.replace('/');
        })
    };

    return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPwInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
