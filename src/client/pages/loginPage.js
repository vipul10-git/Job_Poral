import React, { useState, useEffect} from "react";
import Button from "../components/button";
import Input from "../components/inputBox";
import "../../assets/style/login.css";
import { useHistory } from "react-router-dom";
import LOGO_LARGE from "../../assets/img/logo_large.png"

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [errorType, setError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    let history = useHistory();
    useEffect(() => {
        localStorage.clear();
    }, [])
    function validateForm() {
        let emailRex = /\S+@\S+\.\S+/;
        if(email.length === 0 ||  !emailRex.test(email)){
            setError("email")
            return;
        }
        if(password.length <=7){
            setError("password")
            return;
        }
        if(password !== confirmPassword){
            setError("confirmPassword")
            return;
        }
        localStorage.setItem("email",email)
        history.replace("/job-listing");
    }

    return (
        <div className="login-wrapper content-space-around">
            <div className='displayFlex flex-column align-center'>
                <img src={LOGO_LARGE} className='login-logo-img mB1' alt="logo"/>
                <div className='hiringFont'>Hiring is Simpler, Smarter & Faster with I</div>
            </div>
            <div className="Login">
                <div className="mB1 displayFlex">
                    <label className="flex1">Email Address</label>
                    <Input 
                      errorType= {errorType === "email" ? true : false}
                      type="email"
                      value={email}
                      placeholder="you@example.com" 
                      onChange={(e) => setEmail(e.target.value)}
                      onClick={()=>setError("")}
                      autoFocus = {true}
                  />
                      
                </div>
                <div className="mB1 displayFlex">
                    <label className="flex1">Password</label>
                    <Input 
                      errorType={errorType === "password" ? true : false}
                      type="password"
                      value={password}
                      placeholder="Enter min 8 characters"
                      onChange={(e) => setPassword(e.target.value)}
                      onClick={()=>setError("")}
                  />
                </div>
                <div className="mB1 displayFlex">
                    <label className="flex1">Confirm Password</label>
                    <Input 
                      errorType={errorType === "confirmPassword" ? true : false}
                      type="password"
                      value={confirmPassword}
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onClick={()=>setError("")}
                  />
                </div>
                <div className="content-space-around displayFlex">
                <Button
                    border="none"
                    bColor="hsl(178, 60%, 55%)"
                    onClick={() => validateForm()}
                    radius="1rem"
                    padding="0.5rem 2rem"
                    color="hsl(0, 0%, 100%)"
                    children="Login">
                </Button>
                </div>
            </div>
        </div>
    );
}
