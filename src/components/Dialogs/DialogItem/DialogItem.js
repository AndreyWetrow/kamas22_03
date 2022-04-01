import React from "react";
import classes from "./../Dialogs.module.css";
import { NavLink } from "react-router-dom";

const DialogItem = (props) => {
  return (
    <div className={classes.dialog + " " + classes.active}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF1WOi1k9YWZk9192uuXZt2A7X4igjgpfavw&usqp=CAU"
        alt=""
      />
      <NavLink to={`${props.id}`}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
