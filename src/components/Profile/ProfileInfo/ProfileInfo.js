import React, { useState } from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/images.png";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
  const [editMode, setEditMode] = useState(false);

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

  const onSubmitForm = (formData) => {
    props.saveProfile(formData).then(() => {
      setEditMode(false);
    });
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
      </div>
      {editMode ? (
        <ProfileDataForm profile={props.profile} onSubmitForm={onSubmitForm} />
      ) : (
        <ProfileData
          profile={props.profile}
          isOwner={props.isOwner}
          goToEditMode={() => {
            setEditMode(true);
          }}
        />
      )}
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
const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>edit</button>
        </div>
      )}

      <div>Name: {profile.name}</div>
      <div>Username: {profile.username}</div>
      <div>Email: {profile.email}</div>
      <div>Phone: {profile.phone}</div>
    </>
  );
};

export default ProfileInfo;
