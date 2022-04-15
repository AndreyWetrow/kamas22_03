import React, { Component } from "react";
import Header from "./Header";
import axios from "axios";
import { connect } from "react-redux";
import { setAuthUserData } from "../../redux/auth-reducer";

class HeaderContainer extends Component {
  componentDidMount() {
    const authData = {
      email: "test@mail.ru",
      password: "123456",
      returnSecureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMZjFPjbex9PUgjluKGE--Uj4mSwZ3eqM",
        authData
      )
      .then((res) => {
        if (res.data.registered) {
          let { localId, email } = res.data;
          this.props.setAuthUserData(localId, email);
        }
        console.log(res);
      });
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return { isAuth: state.auth.isAuth, email: state.auth.email };
};

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);
