import React from "react";
import { connect } from "react-redux";
import {
  follow,
  requestUsers,
  setCurrentPage,
  setCurrentPageThunkCreator,
  toggleFollowingProgress,
  unfollow,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "../../redux/users-selectors";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";
import { compose } from "redux";

type OwnPropsType = {
  pageTitle: string;
};
type MapStatePropsType = {
  isFetching: boolean;
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
};
type MapDispatchPropsType = {
  getUsers: () => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  setCurrentPageThunkCreator: (pageNumber: number) => void;
};

type PropsType = OwnPropsType & MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<PropsType> {
  // [
  //   {
  //     id: 1,
  //     photoURL:
  //       "data:image/jpeg;base64,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",
  //     followed: false,
  //     fullName: "Max",
  //     status: "boss",
  //     location: { city: "Minsk", country: "Belarus" },
  //   },
  //   {
  //     id: 2,
  //     photoURL:
  //       "data:image/jpeg;base64,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",
  //
  //     followed: true,
  //     fullName: "Jan",
  //     status: "adviser",
  //     location: { city: "Moscow", country: "Russia" },
  //   },
  //   {
  //     id: 3,
  //     photoURL:
  //       "data:image/jpeg;base64,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",
  //     followed: false,
  //     fullName: "Olga",
  //     status: "manager",
  //     location: { city: "Tokio", country: "Japan" },
  //   },
  // ]
  // componentDidMount() {
  //   this.props.toggleIsFetching(true);
  //
  //   let resArrow = [];
  //   axios
  //     .get("https://itcamas2022-default-rtdb.firebaseio.com/users.json")
  //     .then((res) => {
  //       for (const resKey in res.data) {
  //         resArrow.push(res.data[resKey]);
  //       }
  //       this.props.setUsers(resArrow);
  //     });
  //   this.props.toggleIsFetching(false);
  //   axios
  //     .get("https://itcamas2022-default-rtdb.firebaseio.com/totalCount.json")
  //     .then((res) => {
  //       this.props.setTotalUsersCount(res.data);
  //     });
  // }
  componentDidMount() {
    this.props.getUsers();

    // this.props.toggleIsFetching(true);
    //
    // let resArrow = [];
    //
    // userAPI.getUsers().then((data) => {
    //   for (const resKey in data) {
    //     let arrItem = { ...data[resKey], userKey: resKey };
    //
    //     resArrow.push(arrItem);
    //   }
    //
    //   this.props.setUsers(resArrow);
    //   userAPI.getTotalCount().then((data) => {
    //     this.props.setTotalUsersCount(data);
    //     this.props.toggleIsFetching(false);
    //   });
    // });
  }

  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPageThunkCreator(pageNumber);

    // let resArrow = [];
    // this.props.setCurrentPage(pageNumber);
    // this.props.toggleIsFetching(true);
    //
    // userAPI.getUsers().then((data) => {
    //   for (const resKey in data) {
    //     let arrItem = { ...data[resKey], userKey: resKey };
    //
    //     if (pageNumber === data[resKey].id) {
    //       resArrow.push(arrItem);
    //     }
    //   }
    //
    //   this.props.setUsers(resArrow);
    //   this.props.toggleIsFetching(false);
    // });
  };

  render() {
    return (
      <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          // toggleFollowingProgress={this.props.toggleFollowingProgress}
          followingInProgress={this.props.followingInProgress}
          onPageChanged={this.onPageChanged}
        />
      </>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     follow: followAC,
//     unfollow: unFollowAC,
//     setUsers: setUsersAC,
//     setCurrentPage: setCurrentPageAC,
//     setTotalUsersCount: setTotalUsersCountAC,
//     toggleIsFetching: toggleIsFetchingAC,
//     // setTotalUsersCount: (totalCount) => {
//     //   dispatch(setTotalUsersCountAC(totalCount));
//     // },
//     // toggleIsFetching: (isFetching) => {
//     //   dispatch(toggleIsFetchingAC(isFetching));
//     // },
//   };
// };

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};
export default compose(
  // TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {
      follow,
      unfollow,
      getUsers: requestUsers,
      setCurrentPageThunkCreator,
    }
  )
)(UsersContainer);
// export default connect(mapStateToProps, {
//   follow,
//   unfollow,
//   setCurrentPage,
//   toggleFollowingProgress,
//   getUsers: requestUsers,
//   setCurrentPageThunkCreator,
//   // @ts-ignore
// })(UsersContainer);
