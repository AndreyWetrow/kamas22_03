import { userAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";
import { UserType } from "../types/types";
import { AppStateType, InferActionsTypes } from "./redux-store";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

// const FOLLOW = "FOLLOW";
// const UNFOLLOW = "UNFOLLOW";
// const SET_USERS = "SET_USERS";
// const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
// const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
// const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
// const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 1,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<any>,
  status: "",
};

type InitialState = typeof initialState;

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialState => {
  switch (action.type) {
    case "FOLLOW": {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    }

    case "UNFOLLOW": {
      return {
        ...state,
        // @ts-ignore
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
        // users: state.users.map((user) => {
        //   if (user.id === action.userId) {
        //     return { ...user, followed: false };
        //   }
        //   return user;
        // }),
      };
    }
    case "SET_USERS": {
      return {
        ...state,
        users: [...action.users],
      };
    }
    case "SET_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case "SET_TOTAL_USERS_COUNT": {
      return {
        ...state,
        totalUsersCount: action.totalCount,
      };
    }
    case "TOGGLE_IS_FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case "TOGGLE_IS_FOLLOWING_PROGRESS": {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : [state.followingInProgress.filter((id) => id !== action.userId)],
      };
    }

    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  followSuccess: (userId: number) => ({ type: "FOLLOW", userId } as const),
  unfollowSuccess: (userId: number) => ({ type: "UNFOLLOW", userId } as const),

  setUsers: (users: Array<UserType>) => ({ type: "SET_USERS", users } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: "SET_CURRENT_PAGE",
      currentPage,
    } as const),

  setTotalUsersCount: (totalCount: number) =>
    ({
      type: "SET_TOTAL_USERS_COUNT",
      totalCount,
    } as const),

  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: "TOGGLE_IS_FETCHING",
      isFetching,
    } as const),

  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: "TOGGLE_IS_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const),
};

type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>;

export const requestUsers = (): ThunkType => {
  return (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));

    let resArrow: any = [];

    userAPI.getUsers().then((data) => {
      for (const resKey in data) {
        let arrItem = { ...data[resKey], userKey: resKey };

        resArrow.push(arrItem);
      }

      dispatch(actions.setUsers(resArrow));
      userAPI.getTotalCount().then((data) => {
        dispatch(actions.setTotalUsersCount(data));
        dispatch(actions.toggleIsFetching(false));
      });
    });
  };
};
export const setCurrentPageThunkCreator = (pageNumber: number) => {
  return (dispatch: any) => {
    let resArrow: any = [];

    dispatch(actions.setCurrentPage(pageNumber));

    dispatch(actions.toggleIsFetching(true));

    userAPI.getUsers().then((data) => {
      for (const resKey in data) {
        let arrItem = { ...data[resKey], userKey: resKey };

        if (pageNumber === data[resKey].id) {
          resArrow.push(arrItem);
        }
      }

      dispatch(actions.setUsers(resArrow));
      dispatch(actions.toggleIsFetching(false));
    });
  };
};

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  user: any,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleFollowingProgress(true, user.id));
  let response = await apiMethod(user.userKey);

  if (response === 200) {
    dispatch(actionCreator(user.id));
  }
  dispatch(actions.toggleFollowingProgress(false, user.id));
};

// export const follow = (user) => {
//   return (dispatch) => {
//     dispatch(toggleFollowingProgress(true, user.id));
//     userAPI.followUser(user.userKey).then((status) => {
//       if (status === 200) {
//         dispatch(unfollowSuccess(user.id));
//       }
//       dispatch(toggleFollowingProgress(false, user.id));
//     });
//   };
// };
export const follow = (user: any): ThunkType => {
  return (dispatch) => {
    let apiMethod = userAPI.followUser;
    _followUnfollowFlow(dispatch, user, apiMethod, actions.unfollowSuccess);
  };
};
export const unfollow = (user: any): ThunkType => {
  return (dispatch) => {
    let apiMethod = userAPI.unfollowUser;
    _followUnfollowFlow(dispatch, user, apiMethod, actions.followSuccess);
  };
};
// export const unfollow = (user) => {
//   return (dispatch) => {
//     dispatch(toggleFollowingProgress(true, user.id));
//     userAPI.unfollowUser(user.userKey).then((status) => {
//       if (status === 200) {
//         dispatch(followSuccess(user.id));
//       }
//       dispatch(toggleFollowingProgress(false, user.id));
//     });
//   };
// };

export default usersReducer;
