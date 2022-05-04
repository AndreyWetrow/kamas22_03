import React, { Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { Component } from "react";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import withSuspense from "./hoc/withSuspense";

// import ProfileContainer from "./components/Profile/ProfileContainer";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);

// function MyComponent() {
//   return (
//     <div>
//       <Suspense fallback={<Preloader/>}>
//         <DialogsContainer />
//       </Suspense>
//     </div>
//   );
// }

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
            <Route
              path="profile"
              // element={
              //   <Suspense fallback={<Preloader />}>
              //     <ProfileContainer />
              //   </Suspense>
              // }
              element={withSuspense(ProfileContainer)}
            />
            <Route
              path="profile/:userId"
              // element={
              //   <Suspense fallback={<Preloader />}>
              //     <ProfileContainer />
              //   </Suspense>
              // }
              element={withSuspense(ProfileContainer)}
            />
            <Route
              path="dialogs"
              // element={
              //   <Suspense fallback={<Preloader />}>
              //     <DialogsContainer />
              //   </Suspense>
              // }
              element={withSuspense(DialogsContainer)}
            />
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
