import React from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/images.png";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    let result = "";

    reader.onloadend = function () {
      result = reader.result;
      if (e.target.files.length) {
        props.savePhoto(result, props.initialId);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/*<div>*/}
      {/*  <img*/}
      {/*    className={classes.img}*/}
      {/*    src="https://klike.net/uploads/posts/2019-06/1560231206_1.jpg"*/}
      {/*    alt=""*/}
      {/*  />*/}
      {/*</div>*/}
      <ProfileStatusWithHooks
        status={props.status}
        updateStatus={props.updateStatus}
        userId={props.userId}
      />

      {props.isOwner && <input type="file" onChange={onMainPhotoSelected} />}

      <div className={classes.descriptionBlock}>
        <img
          src={props.profile.photo.littlePhoto || userPhoto}
          alt=""
          className={classes.mainPhoto}
        />
        {/*<img src={props.profile.photo.bigPhoto} alt="" />*/}
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
