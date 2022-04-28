import "./App.css";
import { Routes, Route } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";

function App() {
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

export default App;
