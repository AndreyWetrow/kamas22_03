import React from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <>
      {/*<div>*/}
      {/*  <img*/}
      {/*    className={classes.img}*/}
      {/*    src="https://klike.net/uploads/posts/2019-06/1560231206_1.jpg"*/}
      {/*    alt=""*/}
      {/*  />*/}
      {/*</div>*/}
      <ProfileStatus
        status={props.status}
        updateStatus={props.updateStatus}
        userId={props.userId}
      />
      <div className={classes.descriptionBlock}>
        <img src={props.profile.photo.littlePhoto} alt="" />
        <div>Name: {props.profile.name}</div>
        <div>Username: {props.profile.username}</div>
        <div>Email: {props.profile.email}</div>
        <div>Phone: {props.profile.phone}</div>
      </div>
    </>
  );

  // return (
  //   <>
  //     <div>
  //       <img
  //         className={classes.img}
  //         src="https://klike.net/uploads/posts/2019-06/1560231206_1.jpg"
  //         alt=""
  //       />
  //     </div>
  //     <div className={classes.descriptionBlock}>
  //       <img src={props.profile.photo.littlePhoto} alt="" />
  //       <div>Name: {props.profile.name}</div>
  //       <div>Username: {props.profile.username}</div>
  //       <div>Email: {props.profile.email}</div>
  //       <div>Phone: {props.profile.phone}</div>
  //     </div>
  //     <Outlet />
  //   </>
  // );
};

export default ProfileInfo;
