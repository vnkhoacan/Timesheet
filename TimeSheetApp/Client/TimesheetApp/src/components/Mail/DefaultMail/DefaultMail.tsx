import React from "react";
import "./DefaultMail.css";

const DefaultMail: React.FC = () => {
  return (
    <div className="noSelectMail">
      <div className="sub-noSelectMail">
        {/* <svg
          className="icon"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
        </svg> */}
        <i style={{fontSize:"100px",color:"#9facc0"}} className="material-icons-outlined">mail</i>
        <p className="title">Select a mail to read</p>
      </div>
    </div>
  );
};

export default DefaultMail;
