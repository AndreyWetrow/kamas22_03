import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.data, isAuth: true };

    default:
      return state;
  }
};

export const setAuthUserData = (userId, email) => {
  return { type: SET_USER_DATA, data: { userId, email } };
};

export const getAuthUserData = () => {
  return (dispatch) => {
    authAPI.me().then((res) => {
      if (res.data.registered) {
        let { localId, email } = res.data;
        dispatch(setAuthUserData(localId, email));
      }
    });
  };
};

export default authReducer;
