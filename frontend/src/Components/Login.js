import './Login.css';
import { useState } from 'react';

export default function Login(props){
    let [action, setAction] = useState("Login")
    let {setScreenNum, setPatientData} = props

    function showSignUpForm(){
        setAction("Sign Up")
    }

    function showLoginForm(){
        setAction("Login")
    }

    function handleFormSubmission(e){
        e.preventDefault();
        setScreenNum(1);
    }

    return(
        <div className="login-container">
            <div className="user-action">
                <button onClick={showLoginForm}>Login</button>
                <button onClick={showSignUpForm}>Sign Up</button>
            </div>
            <form action="" id="form-field-container" class="form-field-container" onSubmit={handleFormSubmission}>
                <input type="text" name="username"/>
                <input type="password" name="username"/>
                <button type="submit" for="form-field-container">{action}</button>
            </form>
        </div>
    )
}