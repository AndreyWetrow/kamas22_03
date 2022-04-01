import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import MessageTextarea from "./MessageTextarea/MessageTextarea";

const Dialogs = (props) => {
  // const dialogs = [
  //   { id: 1, name: "Vasja" },
  //   { id: 2, name: "Olja" },
  //   { id: 3, name: "Andrey" },
  //   { id: 4, name: "Sanja" },
  //   { id: 5, name: "Pasha" },
  //   { id: 5, name: "Pasha" },
  // ];
  //
  // const messages = [
  //   { id: 1, message: "Hello" },
  //   { id: 2, message: "Bay" },
  //   { id: 3, message: "How are you" },
  //   { id: 4, message: "Fine" },
  //   { id: 5, message: "good night" },
  // ];

  const dialogsElements = props.dialogsPage.dialogs.map((dialog) => {
    return <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />;
  });

  const messagesElements = props.dialogsPage.messages.map((message) => {
    return <Message key={message.id} message={message.message} />;
  });
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div>
        <div className={classes.messages}>{messagesElements}</div>
        <MessageTextarea
          addMessage={props.addMessage}
          updateNewMessageText={props.updateNewMessageText}
        />
      </div>
    </div>
  );
};

export default Dialogs;
