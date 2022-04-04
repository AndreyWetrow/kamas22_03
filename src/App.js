import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import { Routes, Route } from "react-router-dom";

function App(props) {
  return (
    <div className={"app-wrapper"}>
      <Header />
      <Navbar friends={props.state.sidebar.friends} />
      <div className={"app-wrapper-content"}>
        <Routes>
          <Route
            path="profile"
            element={
              <Profile
                profilePage={props.state.profilePage}
                dispatch={props.dispatch}
              />
            }
          />
          <Route
            path="dialogs"
            element={
              <Dialogs
                dialogsPage={props.state.dialogsPage}
                dispatch={props.dispatch}
                // addMessage={props.addMessage}
                // updateNewMessageText={props.updateNewMessageText}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
