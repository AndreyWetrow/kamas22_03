import React from "react";
import classes from "./MessageTextarea.module.css";

const MessageTextarea = (props) => {
  const onNewMessageChange = (e) => {
    const body = e.target.value;
    props.updateNewMessageBody(body);
  };
  const onSendMessageClick = () => {
    props.sendMessage();
  };

  return (
    <div className={classes.messageTextarea}>
      <textarea
        onChange={onNewMessageChange}
        className={classes.textarea}
        cols="15"
        rows="2"
        placeholder={"Enter message"}
        value={props.newMessageBody}
      />
      <button onClick={onSendMessageClick}>Send</button>
    </div>
  );
};

export default MessageTextarea;
