import React from "react";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import Friends from "./Friends/Friends";

const Navbar = (props) => {
  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink
          to={"/profile"}
          className={({ isActive }) => (isActive ? classes.activeLink : "")}
        >
          Profile
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink
          to={"/dialogs"}
          className={({ isActive }) => (isActive ? classes.activeLink : "")}
        >
          Messages
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to={"/users"} className="red">
          Users
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to={"/news"} className={"test"}>
          News
        </NavLink>
      </div>
      <div className={classes.item}>
        <a href={"#"} className={"test"}>
          Music
        </a>
      </div>
      <div className={classes.item}>
        <a href={"#"} className={"test"}>
          Settings
        </a>
      </div>
      <Friends friends={props.friends} />
    </nav>
  );
};

export default Navbar;
