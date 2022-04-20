import React, { Component } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { getAuthUserData } from "../../redux/auth-reducer";

class HeaderContainer extends Component {
  componentDidMount() {
    this.props.getAuthUserData();

    // authAPI.me().then((res) => {
    //   if (res.data.registered) {
    //     let { localId, email } = res.data;
    //     this.props.setAuthUserData(localId, email);
    //   }
    // });
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return { isAuth: state.auth.isAuth, email: state.auth.email };
};

export default connect(mapStateToProps, { getAuthUserData })(HeaderContainer);
