
import React, { useState,useEffect } from "react";
import logo from "../../logo.png"
import {Avatar} from "antd";
import Sucess from "../../components/sucess/Sucess";
import Failed from "../../components/failed/Failed";
import { message,Modal } from 'antd';
import "./SingleTask.css"
import { Spin} from "antd";
import {useHistory,useLocation} from "react-router-dom";
import { decode } from "js-base64";
import { SubmitButton } from "../../components/accountBox/common";
const SinglTask = () => {
   const history=useHistory();

  //current page
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const location = useLocation();
  //id

  const fromId = location.search.split("=")[1].split("&")[0];
  const taskId = location.search.split("&")[1].split("=")[1];
  
 

 //Id
  
 const userId = localStorage.getItem("userId");
 const email=localStorage.getItem("userEmail");
 const accessToken = localStorage.getItem("accessToken");
   //Card data
   const [senderName,setSenderName]=useState("");
  const [date,setDate]=useState('');
  const [time,setTime]=useState("")
  const [taskDetails,setTaskDetails]=useState("");
  const [description,setDescription]=useState("No More Details");
  const[fileUrl,setFileUrl]=useState("");
  const [fileData,setFileData]=useState("");
  const [taskType,setTaskType]=useState();
  const [sucessfulMessage,setSucessfulMessage]=useState();
  
  // triggers

  const [isFile,setIsFile]=useState(false);
  const [loading,setLoading]=useState(true);
  const [dataError,setDataError]=useState(false);
 const [isModalVisible, setIsModalVisible] = useState(false);
 
  //accept Task

  const Accept=async()=>{
   
     const res = await fetch("https://mymanapinode.herokuapp.com/api/api/task/delegateTask", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "x-access-token": accessToken,
       },
       body: JSON.stringify({
         taskid: taskId,
         assignedToUserId: userId,
         delegatestatus: true,
       }),
     });
   
       
       if (res.status !== 200 ) {
        
          setSucessfulMessage(
            "Task Accepting Error"
          );

        
       } else {

   
     setSucessfulMessage(
       "Task sucessfully acepted by you, Detect on Your whush extension"
     );
        
       }

    
  }

  // decline task
  const showModal = () => {
    setIsModalVisible(true);
  };

 
  
  const confirm=async()=> {
    
 const res = await fetch("https://mymanapinode.herokuapp.com/api/api/task/delegateTask", {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": accessToken,
   },
   body: JSON.stringify({
     taskid: taskId,
     assignedToUserId: userId,
     delegatestatus: false,
   }),
 });
      
       
       if (res.status !== 200 ) { 
        
          setSucessfulMessage(
            "Task Accepting Error"
          );

        
       } else {
message.success("Succesfully decline task");
setSucessfulMessage("Succesfully decline task Your Responce Recorded");
setIsModalVisible(false);
       }
    
  }

  function cancel(e) {
  
    setIsModalVisible(false);
    


  }

  //logout
   const setLogOut = () => {
     localStorage.removeItem("accessToken", "");
     localStorage.removeItem("userId", "");
     localStorage.removeItem("userEmail", "");
     localStorage.removeItem("isLoggedIn", false);
     localStorage.removeItem("isCalender", false);
     history.push("/login");
   };
    
   
    
    
        
   // Auto logout and save current page for route
   useEffect(() => {
     if (isLoggedIn === "true") {
      
     }else{
      localStorage.setItem("isRedirectUrl", location.pathname+location.search);
       history.push("/login");

     }
     //Request URL
    const TASK_URL = `https://mymanapinode.herokuapp.com/api/api/task/getSingleTask/${taskId}`;
    const USER_URL = `https://mymanapinode.herokuapp.com/api/api/auth/getuserdetail/${fromId}`;
    //get tasks
     const getTask=async()=>{
       const res = await fetch(TASK_URL, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           "x-access-token":accessToken  }});
       const data=await res.json();
          console.log(data)
       if (res.status !== 200 ) {
          setDataError(true);
          setSucessfulMessage(
            "you are not authorized to see it"
          );
         setLoading(false);
        
       } else {
         
        if (data.message.taskDetails) {
          setTaskDetails(data.message.taskDetails);
        }
        setTime(data.message.time);
        setDate(data.message.date);
        
       
      const auth=data.message.assignedTo.split(",").filter(item=>email===item)
      console.log(data.message.assignedTo.split(","))
      console.log(auth)
         if (auth.length===0) {
            if(email===data.message.assignedBy)
            {
              console.log("cool")
              setTaskType(true);

            }else
            {
           setDataError(true);
           setSucessfulMessage("You are Not Authorized to view this task");}
         }
       
  if (data.message.delegatestatus) {
    setSucessfulMessage("Already Accepted that task");
  }
      if (data.message.attachment){
        setIsFile(true);
        setFileUrl(data.message.attachment);
       }else
       {
         setIsFile(false)
        }
         setTaskDetails(data.message.taskDetails);
         
         if (data.message.description !=null){ 
          
           getData(data.message.description);}
        
        
         setLoading(false);
        
       }
     }
      const getSenderDetails=async()=>{
       const res = await fetch(USER_URL, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
          "x-access-token":accessToken },
       });
       const data=await res.json();
       
       if (res.status !== 200 ) {
        
         setLoading(false);

        
       } else {

        setSenderName(data.message.fullname);
         setLoading(false);
        
       }}

      const getData=async(url)=>{
     
    await fetch(url).then((response) =>{
            const data = response.text();
           
          return data})
          .then((description1) => {
         
            setDescription(decode(description1));
            
          });
      }

    const getFileData=url=>{

        fetch(`${url}`, {
        method: "GET",
      })
        .then((response) => response.text())
        .then((attachmentData) => {
          setFileData(attachmentData.split("'")[1]);
        });
    }
      
       //function call
      
     getTask()
     getSenderDetails();
     isFile && getFileData(fileUrl);
   }, [accessToken,email,fileUrl,fromId,history,isFile,isLoggedIn,location.pathname,location.search,taskId]);
  return (
    <div class="container" onclick="onclick">
      <div class="header">
        {" "}
        <button class="logout-btn" onClick={setLogOut}>
          Logout <i class="fa fa-sign-out"></i>
        </button>
      </div>
      <div class="top"></div>
      <div class="bottom"></div>
      <div class="center">
        {loading ? (
          <Spin />
        ) : (
          <div class="card">
            {sucessfulMessage ? (
              <div className="containerData" >
                {dataError ? <Failed></Failed> : <Sucess />}
                <p>{sucessfulMessage}</p>
                <SubmitButton
                  onClick={() => {
                    history.push("/home");
                  }}
                >
                  home
                </SubmitButton>
              </div>
            ) : (
              <div className="containerData">
                <div
                  className="img"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <p className="img">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    {"  "}
                    {date}{" "}
                  </p>
                  <p className="img">
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                    {"   "}
                    {time}
                  </p>
                </div>
                <Avatar style={{ marginBottom: "5px" }}>{senderName[0]}</Avatar>

                <p>{senderName}</p>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h2>{taskDetails}</h2>
                </div>

                {isFile && (
                  <a src="FILENAME.EXT" href={`${fileData}`} download>
                    {" "}
                    <button className="accept-btn">
                      <i class="fa fa-paperclip" aria-hidden="true"></i>
                      File
                    </button>
                  </a>
                )}

                <div
                  style={{
                    height: 300,
                    width: "100%",
                    overflow: "scroll",
                    overflowX: "hidden",
                  }}
                  dangerouslySetInnerHTML={{ __html: description }}
                ></div>
                {!taskType  && (
                  <>
                    <button className="accept-btn" onClick={Accept}>
                      Accept
                    </button>
                    <Modal
                      title="Decline Task"
                      visible={isModalVisible}
                      onOk={confirm}
                      onCancel={cancel}
                    >
                      <p>Are You Sure you want to Decline task ?</p>
                    </Modal>

                    <button class="decline-btn" onClick={showModal}>
                      Decline
                    </button>
                  </>
                )}
                {loading && <Spin style={{ marginLeft: "10%" }} />}
                <img
                  src={logo}
                  alt=""
                  height="20px"
                  width="20px"
                  className="img"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglTask;
