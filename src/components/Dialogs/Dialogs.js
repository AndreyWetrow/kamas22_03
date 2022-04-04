import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import MessageTextarea from "./MessageTextarea/MessageTextarea";

const Dialogs = ({ dialogsPage, dispatch }) => {
  const dialogsElements = dialogsPage.dialogs.map((dialog) => {
    return <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />;
  });

  const messagesElements = dialogsPage.messages.map((message) => {
    return <Message key={message.id} message={message.message} />;
  });
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div>
        <div className={classes.messages}>{messagesElements}</div>
        <MessageTextarea
          dispatch={dispatch}
          newMessageBody={dialogsPage.newMessageBody}
        />
      </div>
    </div>
  );
};

export default Dialogs;
