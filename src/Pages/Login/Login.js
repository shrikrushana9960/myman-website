
import './Login.css'
import { useHistory } from "react-router-dom";
import {Alert} from 'antd'
import logo from "../../logo.svg";
import {
  SubmitButton,
} from "../../components/accountBox/common";
import { Link } from 'react-router-dom';
import React, { useState,useEffect } from "react";
import { Spin} from "antd";
import Password from '../../components/Password/Password';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [error,setError]=useState(false);
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const isRedirectUrl=localStorage.getItem("isRedirectUrl");

 
    const [message,setMessage]=useState("");
    let history = useHistory();
  
 useEffect(() => {
  
   if (isLoggedIn === "true") {
   history.push("/home")
     
   }
   else
   {
     setLoading(false)
   }
 }, [isLoggedIn, history]);
    
     const setUserDetailsInChromeStorage = (data) => {
      if (data.calendar_linked_flag==="1")
      {
        localStorage.setItem("isCalender", true);
      }
      else
      {
        localStorage.removeItem("isCalender");
      }
        localStorage.setItem("accessToken", data.accessToken);
         localStorage.setItem("userId", data.id);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("isLoggedIn",true);
     };

    

const LogIn = async (e) => {
    e.preventDefault()
  const LOGIN_URL = "https://mymanapinode.herokuapp.com/api/api/auth/signin";

    setLoading(true);
 const res= await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
     const data = await res.json();

     if (res.status !== 200 || !data) {
       setError(true)
       setLoading(false)
       setMessage("Authentication Fail")
     } else {
       
         
         setError(false);
         setLoading(false);
         setUserDetailsInChromeStorage(data);
         if (isRedirectUrl){
           localStorage.removeItem("isRedirectUrl");
          history.push(isRedirectUrl)
         } else{
           history.push("/home");
          }
     }
};


  
   
     const handleEmailChange = (event) => {
       setEmail(event.target.value);
     };

     const handlePasswordChange = (event) => {
       setPassword(event.target.value);
     };
    return (
      <div class="container" onclick="onclick">
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="center">
          <img src={logo} height={300} width={300} alt="" />
               {!loading ? <form className="loginForm" onSubmit={LogIn}>
            <input
              type="email"
              onChange={handleEmailChange}
              placeholder="Email"
              required
            />
           <Password placeholder={"Password"} onChange={handlePasswordChange}/>
            <SubmitButton>Log In</SubmitButton>
            {error ? (
              <Alert
                message="Error"
                description={message}
                type="error"
                showIcon
                closable
              />
            ) : (
              <></>
            )}
            <p>
              {" "}
              Don't have Account ?<Link to="/register">Register</Link>
            </p>
            <h2>&nbsp;</h2>
          </form>
    : <Spin />}
        </div>
      </div>
    );
}

export default Login
