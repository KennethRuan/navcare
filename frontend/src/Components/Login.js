import './Login.css';
import { useState } from 'react';

export default function Login(props){
    let [action, setAction] = useState("Login")
    let [loggingInAsDoctor,setLoggingInAsDoctor] = useState(false);
    let {setScreenNum, setUserName} = props

    function showSignUpForm(){
        setAction("Sign Up")
        document.getElementById("sign-up-account-prompt").style.display = "none";
        document.getElementById("login-account-prompt").style.display = "block";
    }

    function showLoginForm(){
        setAction("Login")
        document.getElementById("login-account-prompt").style.display = "none";
        document.getElementById("sign-up-account-prompt").style.display = "block";
    }

    function handleFormSubmission(e){
        e.preventDefault();
        setScreenNum(1);
    }

    function handleChange(e){
        setUserName(e.target.value)
    }

    return(
        <div className="login-container">
            <div>
                <img class="main-page-logo" src="https://i.postimg.cc/dtHpH92t/HTN2022-Logo.png" alt="" />
            </div>
            <form action="" id="form-field-container" class="form-field-container" onSubmit={handleFormSubmission}>
                <label for="username" class="login-page-label">Username:</label>
                <input className="input-box" type="text" name="username" onChange={handleChange}/>
                <label for="password" class="login-page-label">Password:</label>
                <input className="input-box" type="password" name="username"/>
                <button className="submit-button" type="submit" for="form-field-container">{action}</button>
            </form>
            <div className="user-action">
                <div id="login-account-prompt" style={{display:"none"}}>
                    <span className="account-status-question">Already have an account?</span>
                    <button className="small-login-button" onClick={showLoginForm}>Login</button>
                </div>
                <div id="sign-up-account-prompt">
                    <span className="account-status-question">Don't have an account?</span>
                    <button className="small-sign-up-button" onClick={showSignUpForm}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}