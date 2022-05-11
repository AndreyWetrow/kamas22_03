import { userAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";
import { PhotosType, UserType } from "../types/types";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 1,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
  status: "",
};

type InitialState = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialState => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
        // users: state.users.map((user) => {
        //   if (user.id === action.userId) {
        //     return { ...user, followed: true };
        //   }
        //   return user;
        // }),
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
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
    case SET_USERS: {
      return {
        ...state,
        users: [...action.users],
      };
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.totalCount,
      };
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
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

type FollowSuccessActionType = {
  type: typeof FOLLOW;
  userId: number;
};
export const followSuccess = (userId: number): FollowSuccessActionType => {
  return { type: FOLLOW, userId };
};
type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW;
  userId: number;
};
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => {
  return { type: UNFOLLOW, userId };
};
type SetUsersActionType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};
export const setUsers = (users: Array<UserType>): SetUsersActionType => {
  return { type: SET_USERS, users };
};
type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};
export const setCurrentPage = (
  currentPage: number
): SetCurrentPageActionType => {
  return { type: SET_CURRENT_PAGE, currentPage };
};
type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalCount: number;
};
export const setTotalUsersCount = (
  totalCount: number
): SetTotalUsersCountActionType => {
  return { type: SET_TOTAL_USERS_COUNT, totalCount };
};
type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export const toggleIsFetching = (
  isFetching: boolean
): ToggleIsFetchingActionType => {
  return { type: TOGGLE_IS_FETCHING, isFetching };
};
type ToggleFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};
export const toggleFollowingProgress = (
  isFetching: boolean,
  userId: number
): ToggleFollowingProgressActionType => {
  return { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId };
};

export const requestUsers = () => {
  return (dispatch: any) => {
    dispatch(toggleIsFetching(true));

    let resArrow: any = [];

    userAPI.getUsers().then((data) => {
      for (const resKey in data) {
        let arrItem = { ...data[resKey], userKey: resKey };

        resArrow.push(arrItem);
      }

      dispatch(setUsers(resArrow));
      userAPI.getTotalCount().then((data) => {
        dispatch(setTotalUsersCount(data));
        dispatch(toggleIsFetching(false));
      });
    });
  };
};
export const setCurrentPageThunkCreator = (pageNumber: number) => {
  return (dispatch: any) => {
    let resArrow: any = [];

    dispatch(setCurrentPage(pageNumber));

    dispatch(toggleIsFetching(true));

    userAPI.getUsers().then((data) => {
      for (const resKey in data) {
        let arrItem = { ...data[resKey], userKey: resKey };

        if (pageNumber === data[resKey].id) {
          resArrow.push(arrItem);
        }
      }

      dispatch(setUsers(resArrow));
      dispatch(toggleIsFetching(false));
    });
  };
};

const followUnfollowFlow = async (
  dispatch: any,
  user: any,
  apiMethod: any,
  actionCreator: any
) => {
  dispatch(toggleFollowingProgress(true, user.id));
  let response = await apiMethod(user.userKey);

  if (response === 200) {
    dispatch(actionCreator(user.id));
  }
  dispatch(toggleFollowingProgress(false, user.id));
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
export const follow = (user: any) => {
  return (dispatch: any) => {
    let apiMethod = userAPI.followUser;
    followUnfollowFlow(dispatch, user, apiMethod, unfollowSuccess);
  };
};
export const unfollow = (user: any) => {
  return (dispatch: any) => {
    let apiMethod = userAPI.unfollowUser;
    followUnfollowFlow(dispatch, user, apiMethod, followSuccess);
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
