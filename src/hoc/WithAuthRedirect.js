import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";

const mapStateToPropsForRedirect = (state) => {
  return { isAuth: state.auth.isAuth };
};

export const withAuthRedirect = (Component) => {
  const RedirectComponent = (props) => {
    let navigate = useNavigate();
    useEffect(() => {
      if (props.isAuth) {
        return navigate("/login");
      }
    });

    return <Component {...props} />;
  };

  return connect(mapStateToPropsForRedirect)(RedirectComponent);
};
