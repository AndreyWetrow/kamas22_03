import React from "react";
import classes from "./Paginator.module.css";

const Paginator = (props) => {
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
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
  );
};

export default Paginator;
