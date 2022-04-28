import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import MessageTextarea from "./MessageTextarea/MessageTextarea";
import AddMessageForm from "./MessageTextarea/MessageTextarea";

const Dialogs = (props) => {
  let navigate = useNavigate();
  const state = props.dialogsPage;

  const dialogsElements = state.dialogs.map((dialog) => {
    return <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />;
  });

  const messagesElements = state.messages.map((message) => {
    return <Message key={message.id} message={message.message} />;
  });

  const addNewMessage = (values) => {
    console.log(values);
    props.sendMessage(values.newMessageBody);
  };

  // useEffect(() => {
  //   if (props.isAuth) {
  //     return navigate("/login");
  //   }
  // });

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div>
        <div className={classes.messages}>{messagesElements}</div>
        <AddMessageForm
          updateNewMessageBody={props.updateNewMessageBody}
          sendMessage={props.sendMessage}
          newMessageBody={props.dialogsPage.newMessageBody}
          onSubmit={addNewMessage}
        />
      </div>
    </div>
  );
};

export default Dialogs;
