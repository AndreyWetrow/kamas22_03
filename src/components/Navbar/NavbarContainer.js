import Navbar from "./Navbar";
import { connect } from "react-redux";

// const NavbarContainer = () => {
//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         const state = store.getState();
//         return <Navbar friends={state.sidebar.friends} />;
//       }}
//     </StoreContext.Consumer>
//   );
// };

const mapStateToProps = (state) => {
  return {
    friends: state.sidebar.friends,
  };
};

const NavbarContainer = connect(mapStateToProps, null)(Navbar);

export default NavbarContainer;
