import React from "react";
import Profile from "./Profile";
import axios from "axios";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profile-reducer";
import { getURLParams } from "../../hoc/GetURLParams/GetURLParams";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.URLId.userId;
    if (!userId) {
      userId = 2;
    }

    let data = {};
    let photo = "";
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => {
        data = res.data;
        axios
          .get(`https://jsonplaceholder.typicode.com/photos/${userId}`)
          .then((res) => {
            const bigPhoto = res.data.url;
            const littlePhoto = res.data.thumbnailUrl;
            this.props.setUserProfile({
              ...data,
              photo: { ...photo, bigPhoto, littlePhoto },
            });
          });
      });
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

const withUrlDataContainerComponent = getURLParams(ProfileContainer);

export default connect(mapStateToProps, {
  setUserProfile,
})(withUrlDataContainerComponent);
