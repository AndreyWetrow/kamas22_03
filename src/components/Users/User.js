import React from "react";
import classes from "./users.module.css";
import userPhoto from "../../assets/images/images.png";
import { NavLink } from "react-router-dom";

const User = ({ user, followingInProgress, follow, unfollow }) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <img
              className={classes.userPhoto}
              src={user.photoURL !== null ? user.photoURL : userPhoto}
              alt=""
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.fullName}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{user.location.country}</div>
          <div>{user.location.city}</div>
        </span>
      </span>
    </div>
  );
};

export default User;
