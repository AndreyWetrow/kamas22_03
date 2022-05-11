import React, { useState } from "react";
import cn from "classnames";
// @ts-ignore
import classes from "./Paginator.module.css";

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  onPageChanged: (pageNumber: number) => void;
  currentPage: number;
  portionSize?: number;
};

const Paginator: React.FC<PropsType> = ({
  totalUsersCount,
  pageSize,
  onPageChanged,
  currentPage,
  portionSize = 1,
}) => {
  const pagesCount = Math.ceil(totalUsersCount / pageSize);

  const pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={classes.paginator}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}

      {pages
        .filter((p) => {
          return p >= leftPortionPageNumber && p <= rightPortionPageNumber;
        })
        .map((item) => {
          return (
            <span
              onClick={() => {
                onPageChanged(item);
              }}
              key={item}
              className={cn(
                { [classes.selectedPage]: currentPage === item },
                classes.pageNumber
              )}
            >
              {item}
            </span>
          );
        })}

      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
  // return (
  //   <div className={classes.paginator}>
  //     {pages.map((item) => {
  //       return (
  //         <span
  //           onClick={() => {
  //             onPageChanged(item);
  //           }}
  //           key={item}
  //           className={currentPage === item ? classes.selectedPage : ""}
  //         >
  //           {item}
  //         </span>
  //       );
  //     })}
  //   </div>
  // );
};

export default Paginator;
