import React,{useState} from 'react'
import '../../Pages/Login/Login.css'
const Password = ({onChange,placeholder,value}) => {
     const [type, setType] = useState("password");
      const changeVisiblity = () => {
        setType((ty) => (ty === "password" ? "text" : "password"));
      };
    return (
      <>
        <input
          value={value}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          required
        />
        <span onClick={changeVisiblity} class=" field-icon toggle-password">
          {type === "password" ? (
            <i class="fa fa-eye-slash" aria-hidden="true"></i>
          ) : (
            <i class="fa fa-eye" aria-hidden="true"></i>
          )}
        </span>
      </>
    );
}

export default Password
