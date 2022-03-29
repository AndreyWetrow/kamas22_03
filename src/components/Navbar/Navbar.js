import React from "react";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const activeClass = (isActive) => {
    return isActive ? "red" : "blue";
  };
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
        <NavLink to={"/news"} className={"tets"}>
          News
        </NavLink>
      </div>
      <div className={classes.item}>
        <a href={"#"} className={"tets"}>
          Music
        </a>
      </div>
      <div className={classes.item}>
        <a href={"#"} className={"tets"}>
          Settings
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
