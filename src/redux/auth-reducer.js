import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  fakeUserId: 1,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, isAuth) => {
  return { type: SET_USER_DATA, payload: { userId, email, isAuth } };
};

export const getAuthUserData = (
  email = "",
  password = "",
  rememberMe = false
) => {
  return (dispatch) => {
    return authAPI
      .me(email, password, rememberMe)
      .then((res) => {
        if (res.data.registered) {
          let { localId, email } = res.data;

          dispatch(setAuthUserData(localId, email, true));
        }
      })
      .catch((e) => {
        setAuthUserData("-N-GQgPciKcXz__l6ERi", "test@mail.ru", true);
      });
  };
  // return (dispatch) => {
  //   authAPI.me().then((res) => {
  //     if (res.data.registered) {
  //       let { localId, email } = res.data;
  //       dispatch(setAuthUserData(localId, email, true));
  //     }
  //   });
  // };
};
export const login = (email, password, rememberMe) => {
  return async (dispatch) => {
    return await authAPI.login(email, password, rememberMe).then((res) => {
      if (res.data && res.data.registered) {
        dispatch(getAuthUserData(email, password, rememberMe));
      } else {
        return res;
        // console.log(res);
      }
    });
  };
};
export const logout = () => {
  return (dispatch) => {
    dispatch(setAuthUserData(null, null, false));

    // authAPI.logout().then((res) => {
    //   if (res.data.registered) {
    //     dispatch(setAuthUserData(null, null, false));
    //   }
    // });
  };
};

export default authReducer;
