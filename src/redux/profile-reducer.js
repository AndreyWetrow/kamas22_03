import { profileAPI, userAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

const initialState = {
  posts: [
    { id: 1, message: "Hi, how are you", likeCounts: 20 },
    { id: 2, message: "Hello friend", likeCounts: 5 },
  ],
  newPostText: "",
  profile: null,
  status: "",
  // photo: { url: "", thumbnailUrl: "" },
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      const newPost = {
        id: 5,
        message: state.newPostText,
        likeCounts: 0,
      };

      // let stateCopy = { ...state };
      // stateCopy.posts = [...state.posts];
      // stateCopy.posts.push(newPost);
      // stateCopy.newPostText = "";

      return {
        ...state,
        newPostText: "",
        posts: [...state.posts, newPost],
      };
      // stateCopy.posts = [...state.posts];
      // stateCopy.posts.push(newPost);
      // stateCopy.newPostText = "";
    }

    case UPDATE_NEW_POST_TEXT: {
      return { ...state, newPostText: action.newText };
      // stateCopy.newPostText = action.newText;
      // return stateCopy;
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

    default:
      return state;
  }
};

export const addPostActionCreator = () => {
  return { type: ADD_POST };
};
export const updateNewPostTextActionCreator = (text) => {
  return { type: UPDATE_NEW_POST_TEXT, newText: text };
};
export const setUserProfile = (profile) => {
  return { type: SET_USER_PROFILE, profile };
};

export const setStatus = (status) => {
  return { type: SET_STATUS, status };
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

export const getStatus = (userId) => (dispatch) => {
  profileAPI.getProfileForStatus(userId).then((status) => {
    dispatch(setStatus(status));
  });
};

export const updateStatus = (userId, status) => (dispatch) => {
  profileAPI.updateStatusUser(userId, status).then((response) => {
    if (+response.status === 200) {
      dispatch(setStatus(status));
    }
  });
};

export default profileReducer;
