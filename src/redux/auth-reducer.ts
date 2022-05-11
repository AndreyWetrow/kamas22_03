import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

// export type InitialStateType2 = {
//   userId: string | null;
//   email: string | null;
//   login: string | null;
//   isAuth: boolean;
//   fakeUserId: number;
//   initialId: string | null;
// };

const initialState = {
  userId: null as string | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  fakeUserId: 1,
  initialId: "-N-GQgPciKcXz__l6ERi",
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
type SetAuthUserDataActionPayloadType = {
  userId: string | null;
  email: string | null;
  isAuth: boolean;
};

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataActionPayloadType;
};

export const setAuthUserData = (
  userId: string | null,
  email: string | null,
  isAuth: boolean
): SetAuthUserDataActionType => {
  return { type: SET_USER_DATA, payload: { userId, email, isAuth } };
};

export const getAuthUserData = (
  email = "",
  password = "",
  rememberMe = false
) => {
  return (dispatch: any) => {
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
export const login = (email: string, password: string, rememberMe: boolean) => {
  return async (dispatch: any) => {
    return await authAPI.login(email, password, rememberMe).then((res: any) => {
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
  return (dispatch: any) => {
    dispatch(setAuthUserData(null, null, false));

    // authAPI.logout().then((res) => {
    //   if (res.data.registered) {
    //     dispatch(setAuthUserData(null, null, false));
    //   }
    // });
  };
};

export default authReducer;
