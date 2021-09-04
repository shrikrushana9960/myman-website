import React from 'react'
import { SubmitButton } from '../../components/accountBox/common';
import { useHistory } from 'react-router';
const Home = () => {
  const history=useHistory();
  if (localStorage.getItem("isLoggedIn")!="true"){
    localStorage.removeItem("isLoggedIn");
  history.push("/login")}
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Welcome to MyMan</h1>
        <SubmitButton onClick={()=>{history.push("/work")}} style={{ margin: "10px" }}>create workspace</SubmitButton>
        <SubmitButton onClick={()=>{ localStorage.removeItem("isLoggedIn");
      history.push("/login")}} style={{ margin: "10px" }}>Logout</SubmitButton>
      </div>
    );
}

export default Home;