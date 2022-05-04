import { userAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

const initialState = {
  users: [],
  pageSize: 1,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
  status: "",
};

const usersReducer = (state = initialState, action) => {
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

export const followSuccess = (userId) => {
  return { type: FOLLOW, userId };
};
export const unfollowSuccess = (userId) => {
  return { type: UNFOLLOW, userId };
};
export const setUsers = (users) => {
  return { type: SET_USERS, users };
};
export const setCurrentPage = (currentPage) => {
  return { type: SET_CURRENT_PAGE, currentPage };
};
export const setTotalUsersCount = (totalCount) => {
  return { type: SET_TOTAL_USERS_COUNT, totalCount };
};
export const toggleIsFetching = (isFetching) => {
  return { type: TOGGLE_IS_FETCHING, isFetching };
};
export const toggleFollowingProgress = (isFetching, userId) => {
  return { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId };
};

export const requestUsers = () => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));

    let resArrow = [];

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
export const setCurrentPageThunkCreator = (pageNumber) => {
  return (dispatch) => {
    let resArrow = [];

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

const followUnfollowFlow = async (dispatch, user, apiMethod, actionCreator) => {
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
export const follow = (user) => {
  return (dispatch) => {
    let apiMethod = userAPI.followUser;
    followUnfollowFlow(dispatch, user, apiMethod, unfollowSuccess);
  };
};
export const unfollow = (user) => {
  return (dispatch) => {
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