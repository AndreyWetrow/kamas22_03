import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getStatus,
  getUserProfile,
  savePhoto,
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

  refreshProfile = () => {
    let userId = this.props.URLId.userId;

    if (!userId) {
      userId = this.props.fakeUserId;
    }

    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  };

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.URLId.userId !== prevProps.URLId.userId) {
      this.refreshProfile();
    }
  }

  onSubmit = (values) => {
    console.log(values);
  };

  render() {
    return (
      <div>
        <Profile
          {...this.props}
          isOwner={!this.props.URLId.userId}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          userId={this.props.URLId.userId}
          savePhoto={this.props.savePhoto}
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
    initialId: state.auth.initialId,
  };
};

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
  }),
  getURLParams
  // withAuthRedirect
)(ProfileContainer);
