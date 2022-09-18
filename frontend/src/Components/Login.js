import './Login.css';
import { useState } from 'react';

export default function Login(props){
    let [action, setAction] = useState("Login")
    let [loggingInAsDoctor,setLoggingInAsDoctor] = useState(false);
    let {setScreenNum, setUserName} = props

    function showSignUpForm(){
        setAction("Sign Up")
    }

    function showLoginForm(){
        setAction("Login")
    }

    function handleFormSubmission(e){
        e.preventDefault();
        if (loggingInAsDoctor)
        setScreenNum(2);
        else
        setScreenNum(1);
    }

    function handleChange(e){
        setUserName(e.target.value)
    }

    function changeAccount(){
        setLoggingInAsDoctor(!loggingInAsDoctor);
    }

    return(
        <div className="login-container">
            <div>
                <span class="top-text">Welcome to <span class="righteous-font" style={{color:"#6B98E4"}}>Nav</span><span class="righteous-font" style={{color:"#FB8D7E"}}>care</span>!</span>
                <span class="bottom-text">Please log in or sign up to continue.</span>
            </div>
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
                {action === "Sign Up" ? ( <div id="login-account-prompt">
                    <span className="account-status-question">Already have an account?</span>
                    <button className="small-login-button" onClick={showLoginForm}>Login</button>
                </div>)
                :
                (<div id="sign-up-account-prompt">
                    <span className="account-status-question">Don't have an account?</span>
                    <button className="small-sign-up-button" onClick={showSignUpForm}>Sign Up</button>
                </div>)}
                <button class="change-account-login" onClick={changeAccount}>
                    {loggingInAsDoctor?"Login as PSW":"Login as doctor"}
            </button>
            </div>
            
        </div>
    )
}