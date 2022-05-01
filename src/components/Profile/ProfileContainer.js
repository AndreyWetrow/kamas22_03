import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getStatus,
  getUserProfile,
  updateStatus,
} from "../../redux/profile-reducer";
import { getURLParams } from "../../hoc/GetURLParams/GetURLParams";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/WithAuthRedirect";

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.userId = "";
  }
  componentDidMount() {
    let userId = this.props.URLId.userId;

    if (!userId) {
      userId = this.props.fakeUserId;
      // userId = 2;
    }

    this.props.getUserProfile(userId);
    this.props.getStatus(userId);

    // let data = {};
    // let photo = "";
    //
    // userAPI.getUser(userId).then((res) => {
    //   data = res;
    //   userAPI.getPhoto(userId).then((res) => {
    //     const bigPhoto = res.url;
    //     const littlePhoto = res.thumbnailUrl;
    //     this.props.setUserProfile({
    //       ...data,
    //       photo: { ...photo, bigPhoto, littlePhoto },
    //     });
    //   });
    // });
  }

  onSubmit = (values) => {
    console.log(values);
  };

  render() {
    return (
      <div>
        <Profile
          {...this.props}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          userId={this.props.URLId.userId}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    fakeUserId: state.auth.fakeUserId,
    isAuth: state.auth.isAuth,
  };
};

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
  }),
  getURLParams
  // withAuthRedirect
)(ProfileContainer);
