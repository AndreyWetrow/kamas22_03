import React from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLo-E7EMbz-bO5HLmNDctFzwgPAAXvY_P6wA&usqp=CAU"
        alt=""
      />
      <div className={classes.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.email} - <button onClick={props.logout}>Log out</button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
