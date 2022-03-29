import React from "react";
import classes from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={classes.item}>
      <img
        className={classes.img}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZqwyyu2I2HJzVw3TZLkYWisRZC1owerwig&usqp=CAU"
        alt=""
      />
      {props.message}
      <div>
        <span>{props.likeCounts}</span>
      </div>
    </div>
  );
};

export default Post;
