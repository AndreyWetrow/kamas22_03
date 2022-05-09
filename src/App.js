import React, { Suspense } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
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

class App extends Component {
  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    console.log(promiseRejectionEvent);
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
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
            {/*<Route path="/" element={withSuspense(ProfileContainer)} />*/}
            <Route path="/" element={<Navigate to="/profile" replace />} />
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
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
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
