import { profileAPI, userAPI } from "../api/api";
import { PostType, ProfileType } from "../types/types";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

// type PostType = {
//   id: number;
//   message: string;
//   likeCounts: number;
// };
//
// export type PhotosType = {
//   littlePhoto: string | null;
//   bigPhoto: string | null;
// };
//
// type ProfileType = {
//   // userId: any;
//   // name: any;
//   // photo: PhotoType | null;
//   photo: PhotosType;
// };

const initialState = {
  posts: [
    { id: 1, message: "Hi, how are you", likeCounts: 20 },
    { id: 2, message: "Hello friend", likeCounts: 5 },
  ] as Array<PostType>,
  // profile: null as ProfileType | null,
  profile: null as ProfileType | null,
  status: "",
  newPostText: "",
  // photo: null as PhotoType | null,
  // photo: { url: "", thumbnailUrl: "" },
};

export type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      const newPost = {
        id: 5,
        message: action.newPostText,
        likeCounts: 0,
      };

      return {
        ...state,
        newPostText: "",
        posts: [...state.posts, newPost],
      };
      // stateCopy.posts = [...state.posts];
      // stateCopy.posts.push(newPost);
      // stateCopy.newPostText = "";
    }

    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case UPDATE_USER_PROFILE: {
      return { ...state, profile: { ...state.profile, ...action.profile } };
    }

    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case SAVE_PHOTO_SUCCESS: {
      // let copyProfile = { ...state.profile };
      //
      // copyProfile.photo.littlePhoto = action.photos;

      if (state.profile != null) {
        return {
          ...state,
          profile: {
            ...state.profile,
            photo: { ...state.profile.photo, littlePhoto: action.photos },
          },
          // profile: copyProfile,
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((item) => {
          return item.id !== action.postId;
        }),
      };
    }

    default:
      return state;
  }
};
////////////////
type AddPostActionCreatorActionType = {
  type: typeof ADD_POST;
  newPostText: string;
};

export const addPostActionCreator = (
  newPostText: string
): AddPostActionCreatorActionType => {
  return { type: ADD_POST, newPostText };
};
/////////////////
type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUserProfile = (
  profile: ProfileType
): SetUserProfileActionType => {
  return { type: SET_USER_PROFILE, profile };
};

/////////////
type UpdateUserProfileActionType = {
  type: typeof UPDATE_USER_PROFILE;
  profile: ProfileType;
};

export const updateUserProfile = (
  profile: ProfileType
): UpdateUserProfileActionType => {
  return { type: UPDATE_USER_PROFILE, profile };
};
//////////////
type SetStatusActionType = {
  type: typeof SET_STATUS;
  status: string;
};

export const setStatus = (status: string): SetStatusActionType => {
  return { type: SET_STATUS, status };
};
//////////////////
type DeletePostActionType = {
  type: typeof DELETE_POST;
  postId: number;
};

export const deletePost = (postId: number): DeletePostActionType => {
  return { type: DELETE_POST, postId };
};
//////////////////
type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: string;
};

export const savePhotoSuccess = (
  photos: string
): SavePhotoSuccessActionType => {
  return { type: SAVE_PHOTO_SUCCESS, photos };
};
////////////

export const getUserProfile = (userId: number) => {
  return (dispatch: any) => {
    let photo = "";

    userAPI.getProfile(userId).then((profile) => {
      let data = profile;

      userAPI.getPhoto(userId).then((res) => {
        const bigPhoto = res.url;
        const littlePhoto = res.thumbnailUrl;

        dispatch(
          setUserProfile({
            ...data,
            // ?????????????????????
            photo: { ...(photo as {}), bigPhoto, littlePhoto },
          })
        );
      });
    });
  };
};

// export const getStatus = (userId) => (dispatch) => {
//   profileAPI.getProfileForStatus(userId).then((status) => {
//     dispatch(setStatus(status));
//   });
// };
export const getStatus = (userId: string) => async (dispatch: any) => {
  let result = await profileAPI.getProfileForStatus(userId);
  dispatch(setStatus(result));
};

export const updateStatus =
  (userId: string, status: string) => async (dispatch: any) => {
    try {
      let response = await profileAPI.updateStatusUser(userId, status);

      if (+response.status === 200) {
        dispatch(setStatus(status));
      }
    } catch (error) {}
  };
export const savePhoto =
  (file: any, userId: string) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file, userId);

    if (+response.status === 200) {
      dispatch(savePhotoSuccess(response.data.photoURL));
    }
  };
export const saveProfile = (profile: ProfileType) => async (dispatch: any) => {
  let response = await profileAPI.saveProfile(profile);

  if (+response.status === 200) {
    dispatch(updateUserProfile(response.data));
  } else {
    return Promise.reject();
  }
};

export default profileReducer;
