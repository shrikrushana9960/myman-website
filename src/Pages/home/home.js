import React from 'react'
import logo from "../../logo.svg"
const home = () => {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection:"column",
          justifyContent: "center",
        }}
      >
        <h1>Welcome to </h1>
        <h2>MYMAN</h2>
        <img src={logo} height="200px" width="200px"/>
      </div>
    );
}

export default home
