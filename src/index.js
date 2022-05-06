// import store from "./redux/store";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import store from "./redux/redux-store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
// ReactDOM.render(
//   <React.StrictMode>
//     <HashRouter>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </HashRouter>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
