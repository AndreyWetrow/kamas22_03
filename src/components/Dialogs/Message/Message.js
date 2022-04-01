import React from "react";
import classes from "./../Dialogs.module.css";

const Message = (props) => {
  return (
    <div className={classes.message}>
      <span>{props.message}</span>
    </div>
  );
};

export default Message;
