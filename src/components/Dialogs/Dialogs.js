import React from "react";
import classes from "./Dialogs.module.css";
import { NavLink } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

// const DialogItem = (props) => {
//   return (
//     <div className={classes.dialog + " " + classes.active}>
//       <NavLink to={`${props.id}`}>{props.name}</NavLink>
//     </div>
//   );
// };
// const Message = (props) => {
//   return <div className={classes.message}>{props.message}</div>;
// };

const Dialogs = (props) => {
  const dialogs = [
    { id: 1, name: "Vasja" },
    { id: 2, name: "Olja" },
    { id: 3, name: "Andrey" },
    { id: 4, name: "Sanja" },
    { id: 5, name: "Pasha" },
    { id: 5, name: "Pasha" },
  ];

  const messages = [
    { id: 1, message: "Hello" },
    { id: 2, message: "Bay" },
    { id: 3, message: "How are you" },
    { id: 4, message: "Fine" },
    { id: 5, message: "good night" },
  ];

  const dialogsElements = dialogs.map((dialog) => {
    return <DialogItem name={dialog.name} id={dialog.id} />;
  });

  const messagesElements = messages.map((message) => {
    return <Message message={message.message} />;
  });
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div className={classes.messages}>{messagesElements}</div>
    </div>
  );
};

export default Dialogs;
