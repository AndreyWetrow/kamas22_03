import React from "react";
import classes from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  return (
    <>
      <div>
        <img
          className={classes.img}
          src="https://klike.net/uploads/posts/2019-06/1560231206_1.jpg"
          alt=""
        />
      </div>
      <div className={classes.descriptionBlock}>ava</div>
    </>
  );
};

export default ProfileInfo;
