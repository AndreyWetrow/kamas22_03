import "./App.css";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import { Routes, Route } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";

function App() {
  return (
    <div className={"app-wrapper"}>
      <Header />
      <NavbarContainer />
      {/*<Navbar friends={props.state.sidebar.friends} />*/}
      <div className={"app-wrapper-content"}>
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="dialogs" element={<DialogsContainer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
