import React, { useEffect, useState } from "react";

const ProfileStatusWithHooks = (props) => {
  console.log(props);
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateMode = () => {
    setEditMode(true);
  };
  const deActivateEditMode = () => {
    let userId = props.userId;
    setEditMode(false);

    if (!userId) {
      userId = 2;
    }
    props.updateStatus(userId, status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <>
      <div>
        {!editMode && (
          <span onDoubleClick={activateMode}>{props.status || "---"}</span>
        )}
      </div>
      <div>
        {editMode && (
          <input
            autoFocus
            onBlur={deActivateEditMode}
            type="text"
            onChange={onStatusChange}
            value={status}
          />
        )}
      </div>
    </>
  );
};

export default ProfileStatusWithHooks;
