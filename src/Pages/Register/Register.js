import React,{useState} from 'react'

import { useHistory } from 'react-router';
import './Register.css'
import logo from '../../logo.svg'
import { Link } from 'react-router-dom';
import {
  SubmitButton,
} from "../../components/accountBox/common";
import { Spin } from 'antd';
import Password from '../../components/Password/Password';
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobilenumber, setMobileNumber] = useState("");
    const [fullname,setFullName]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [loading,setLoading]=useState(false);
    let history = useHistory();

   

    const Register= async(e)=>{
            e.preventDefault();
        if(confirmPassword===password)
        {
        
          setLoading(true)
        const SIGNUP_URL =
          "https://mymanapinode.herokuapp.com/api/api/auth/signup";

           const res = await fetch(SIGNUP_URL, {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
               fullname,
               email,
               mobilenumber,
               password,
               roles: ["admin", "moderator"],
             }),
           });

           const data = await res.json();

           if (res.status !== 200 || !data) {
             setLoading(false);
             window.alert("INVALID REGISTRATION");
             console.log("INVALID REGISTRATION");
           } else {
             setLoading(false);
             console.log("REGISTRATION SUCCESSFUL");
               history.push("/login");
           }
    }
    else
    {
        alert("password not matched with confirm password")
    }

    }
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
    
     const handlePhoneChange = (event) => {
       setMobileNumber(event.target.value);
     };
    
      const handleFullNameChange = (event) => {
        setFullName(event.target.value);
      };
     const handleConfirmPasswordChange = (event) => {
       setConfirmPassword(event.target.value);
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

          <form className="loginForm" onSubmit={Register}>
            <input
              value={fullname}
              type="text"
              onChange={handleFullNameChange}
              placeholder="FullName"
              required
            />
            <input
              value={email}
              type="email"
              onChange={handleEmailChange}
              placeholder="Email"
              required
            />
            <input
              value={mobilenumber}
              type="number"
              onChange={handlePhoneChange}
              placeholder="Phone Number"
              required
            />

            <Password
              placeholder={"Password"}
              onChange={handlePasswordChange}
            />
            <Password
              placeholder={"Confirm Password"}
              onChange={handleConfirmPasswordChange}
            />
           

            <SubmitButton>Register</SubmitButton>
            <p>
              {" "}
              Already have Account ?<Link to="/login">LogIn</Link>
            </p>

            <h2>&nbsp;</h2>
          </form>
          {loading && <Spin />}
        </div>
      </div>
    );
}

export default Register
