import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile } from "../../redux/profile-reducer";
import { getURLParams } from "../../hoc/GetURLParams/GetURLParams";
import { withAuthRedirect } from "../../hoc/WithAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.URLId.userId;
    if (!userId) {
      userId = 2;
    }

    this.props.getUserProfile(userId);

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

  render() {
    return (
      <div>
        <Profile {...this.props} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { profile: state.profilePage.profile };
};

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
  }),
  getURLParams,
  withAuthRedirect
)(ProfileContainer);

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
//
// const withUrlDataContainerComponent = getURLParams(AuthRedirectComponent);
//
// export default connect(mapStateToProps, {
//   getUserProfile,
// })(withUrlDataContainerComponent);
