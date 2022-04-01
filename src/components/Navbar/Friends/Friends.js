import React from "react";
import classes from "./Friends.module.css";

const Friends = (props) => {
  const friendList = props.friends.map((friend) => {
    return (
      <div key={friend.id} className={classes.friend}>
        {friend.name}
      </div>
    );
  });

  return (
    <div>
      <h3 className={classes.title}>Friends</h3>
      <div className={classes.friends}>{friendList}</div>
    </div>
  );
};

export default Friends;
