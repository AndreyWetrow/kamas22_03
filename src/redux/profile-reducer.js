import { profileAPI, userAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";

const initialState = {
  posts: [
    { id: 1, message: "Hi, how are you", likeCounts: 20 },
    { id: 2, message: "Hello friend", likeCounts: 5 },
  ],
  profile: null,
  status: "",
  // photo: { url: "", thumbnailUrl: "" },
};

const profileReducer = (state = initialState, action) => {
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

    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
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

export const addPostActionCreator = (newPostText) => {
  return { type: ADD_POST, newPostText };
};

export const setUserProfile = (profile) => {
  return { type: SET_USER_PROFILE, profile };
};

export const setStatus = (status) => {
  return { type: SET_STATUS, status };
};
export const deletePost = (postId) => {
  return { type: DELETE_POST, postId };
};

export const getUserProfile = (userId) => {
  return (dispatch) => {
    let photo = "";

    userAPI.getProfile(userId).then((profile) => {
      let data = profile;

      userAPI.getPhoto(userId).then((res) => {
        const bigPhoto = res.url;
        const littlePhoto = res.thumbnailUrl;

        dispatch(
          setUserProfile({
            ...data,
            photo: { ...photo, bigPhoto, littlePhoto },
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
export const getStatus = (userId) => async (dispatch) => {
  let result = await profileAPI.getProfileForStatus(userId);
  dispatch(setStatus(result));
};

export const updateStatus = (userId, status) => async (dispatch) => {
  let response = await profileAPI.updateStatusUser(userId, status);

  if (+response.status === 200) {
    dispatch(setStatus(status));
  }
};

export default profileReducer;