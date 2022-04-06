import React from "react";
import Navbar from "./Navbar";
import StoreContext from "../../StoreContext";

const NavbarContainer = () => {
  return (
    <StoreContext.Consumer>
      {(store) => {
        const state = store.getState();
        return <Navbar friends={state.sidebar.friends} />;
      }}
    </StoreContext.Consumer>
  );
};

export default NavbarContainer;
