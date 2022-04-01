import React from "react";
import classes from "./MessageTextarea.module.css";

const MessageTextarea = ({ addMessage, updateNewMessageText }) => {
  const onChangeMessage = (text) => {
    updateNewMessageText(text);
  };
  const addNewMessage = () => {
    addMessage();
  };

  return (
    <div className={classes.messageTextarea}>
      <textarea
        onChange={(e) => {
          onChangeMessage(e.target.value);
        }}
        className={classes.textarea}
        cols="15"
        rows="2"
      />
      <button onClick={addNewMessage}>Add message</button>
    </div>
  );
};

export default MessageTextarea;
