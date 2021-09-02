import React ,{useEffect,useState}from 'react'
import {Tooltip,Tag,Badge} from "antd"
import moment from "moment";
import { useHistory } from 'react-router';
import "../../Pages/Dashboard/Dashboard.css"
const Task = ({backgroundColor,bar,item,overdue}) => {
  const history=useHistory();
  
  const priority = [
    { value: "Urgent", color: "red" },
    { value: "High", color: "#f26666" },
    { value: "Medium", color: "#87f266" },
    { value: "Low", color: "green" },
  ];
  const [fileData,setFileData]=useState("");
  const id = localStorage.getItem("userId");
  let time = new Date(item.date).getTime();
  let now = new Date().getTime();

  var distance = time - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  
  useEffect(() => {
    const getFileData = () => {
      fetch(`${item.attachment}`, {
        method: "GET",
      })
        .then((response) => response.text())
        .then((attachmentData) => {
          setFileData(attachmentData.split("'")[1]);
        });
    };
    if (item.attachment) getFileData();
  }, [item.attachment]);
    return (
      <div class="project-box-wrapper">
        <Badge.Ribbon
          text={priority[item.priority - 1].value}
          style={{ zIndex: 2 }}
          color={priority[item.priority - 1].color}
        ></Badge.Ribbon>
        <div class="project-box" style={{ backgroundColor: backgroundColor }}>
          <div class="project-box-header">
            <span>{moment(new Date(item.date)).format("MMMM DD YYYY")}</span>
            <div class="more-wrapper"></div>
          </div>
          <div class="project-box-content-header">
            <p class="box-content-header">{item.taskDetails}</p>
            <p class="box-content-subheader">{item.actionType}</p>
          </div>
          <div class="box-progress-wrapper">
            {item.status === "active" ? (
              <Tag color="#108ee9">In Progress</Tag>
            ) : (
              <Tag color="#87d068">Completed</Tag>
            )}

            {item.attachment && (
              <a src="FILENAME.EXT" href={`${fileData}`} download>
                <i
                  class="fa fa-paperclip"
                  style={{ float: "right" }}
                  aria-hidden="true"
                ></i>
              </a>
            )}
          </div>
          <div class="project-box-footer">
            <div class="participants">
              <Tooltip title={"more details"} color={bar}>
                <button
                  class="add-participant"
                  onClick={() => {
                    history.push(`/dashboard/task?id=${id}&taskid=${item.id}`);
                  }}
                  style={{ color: bar }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-plus"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </Tooltip>
            </div>
            <div class="days-left" style={{ color: bar }}>
              {overdue
                ? "Deadine Ended"
                : days > 0
                ? `${days} Days Left`
                : "Last Day"}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Task
