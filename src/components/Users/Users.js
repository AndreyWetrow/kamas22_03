import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({
  totalUsersCount,
  pageSize,
  onPageChanged,
  currentPage,

  ...props
}) => {
  // const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  // const pages = [];
  //
  // for (let i = 1; i <= pagesCount; i++) {
  //   pages.push(i);
  // }
  return (
    <div>
      <Paginator
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
        currentPage={currentPage}
      />

      {props.users.map((user) => {
        return (
          <User
            user={user}
            followingInProgress={props.followingInProgress}
            follow={props.follow}
            unfollow={props.unfollow}
            key={user.id}
          />
        );
      })}
    </div>
  );
};

export default Users;
