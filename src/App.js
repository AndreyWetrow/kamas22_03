import "./App.css";
import { Routes, Route } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { Component } from "react";
import { getAuthUserData } from "./redux/auth-reducer";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
    // authAPI.me().then((res) => {
    //   if (res.data.registered) {
    //     let { localId, email } = res.data;
    //     this.props.setAuthUserData(localId, email);
    //   }
    // });
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <div className={"app-wrapper"}>
        <HeaderContainer />
        <NavbarContainer />
        {/*<Navbar friends={props.state.sidebar.friends} />*/}
        <div className={"app-wrapper-content"}>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<ProfileContainer />} />
            <Route path="profile/:userId" element={<ProfileContainer />} />
            <Route path="dialogs" element={<DialogsContainer />} />
            <Route path="users" element={<UsersContainer />} />
          </Routes>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { initialized: state.app.initialized };
};

export default connect(mapStateToProps, { initializeApp })(App);
// export default App;
