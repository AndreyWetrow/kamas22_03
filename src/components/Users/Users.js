import React from "react";
import classes from "./users.module.css";
import userPhoto from "../../assets/images/images.png";
import { NavLink } from "react-router-dom";
import { userAPI } from "../../api/api";

const Users = (props) => {
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <div>
      <div>
        {pages.map((item) => {
          return (
            <span
              onClick={() => {
                props.onPageChanged(item);
              }}
              key={item}
              className={props.currentPage === item ? classes.selectedPage : ""}
            >
              {item}
            </span>
          );
        })}
      </div>
      {props.users.map((user) => {
        return (
          <div key={user.id}>
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
                    disabled={props.followingInProgress.some(
                      (id) => id === user.id
                    )}
                    onClick={() => {
                      props.follow(user);
                      // props.toggleFollowingProgress(true, user.id);
                      // userAPI.followUser(user.userKey).then((status) => {
                      //   if (status === 200) {
                      //     props.unfollow(user.id);
                      //   }
                      //   props.toggleFollowingProgress(false, user.id);
                      // });
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    disabled={props.followingInProgress.some(
                      (id) => id === user.id
                    )}
                    onClick={() => {
                      props.unfollow(user);
                      // props.toggleFollowingProgress(true, user.id);
                      // userAPI.unfollowUser(user.userKey).then((status) => {
                      //   if (status === 200) {
                      //     props.follow(user.id);
                      //   }
                      //
                      //   props.toggleFollowingProgress(false, user.id);
                      // });
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
      })}
    </div>
  );
};

export default Users;
