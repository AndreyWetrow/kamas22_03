import React from "react";
import classes from "./MessageTextarea.module.css";
import {
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from "../../../redux/state";

const MessageTextarea = ({ dispatch, newMessageBody }) => {
  const onNewMessageChange = (e) => {
    const body = e.target.value;
    dispatch(updateNewMessageBodyCreator(body));
  };
  const onSendMessageClick = () => {
    dispatch(sendMessageCreator());
  };

  return (
    <div className={classes.messageTextarea}>
      <textarea
        onChange={onNewMessageChange}
        className={classes.textarea}
        cols="15"
        rows="2"
        placeholder={"Enter message"}
        value={newMessageBody}
      />
      <button onClick={onSendMessageClick}>Send</button>
    </div>
  );
};

export default MessageTextarea;
