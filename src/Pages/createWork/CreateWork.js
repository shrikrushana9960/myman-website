import { message } from 'antd';
import React,{useState} from 'react'
import { useHistory } from 'react-router';
import logo from "../../logo.svg"
import { useLocation } from "react-router";
const CreateWork = () => {
    const [workName,setWorkName]=useState("");
    const [team,setTeam]=useState("");
    const history=useHistory();
    const location = useLocation();
    if (localStorage.getItem("isLoggedIn") != "true") {
           localStorage.setItem(
             "isRedirectUrl",
             location.pathname + location.search
           );
      localStorage.removeItem("isLoggedIn");
      localStorage.setItem("redirecturl")
      history.push("/login");
    }
    const submitData=async(e)=>{

        e.preventDefault()
        const res = await fetch(
          "https://mymanapinode.herokuapp.com/api/api/workspace/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: workName,
              admin: parseInt(localStorage.getItem("userId")),
              team: team,
            }),
          }
        );
        
        
    if(res.status===200)
{
    message.success("sucessfully make workspace you can check it on your extension")
    history.push("/home")
}   else
{
    message.error("error ocurred")
} }
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={submitData}
        >
          <img src={logo} height="200px" width="200px" alt="" />
          <input
            type="text"
            style={{ margin: "10px" }}
            placeholder="WorkSpace Name"
            onChange={(event) => setWorkName(event.target.value)}
            required
          />
          <input
            type="text"
            style={{ margin: "10px" }}
            placeholder="Team Members eg. email1, email2, email3 etc"
            onChange={(event) => setTeam(event.target.value)}
            required
          />
          <button style={{ margin: "10px" }}  type="submit">
            submit
          </button>
        </form>
      </div>
    );
}

export default CreateWork
