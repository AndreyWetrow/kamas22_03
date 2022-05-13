import React, { useEffect } from "react";
import { Form, Field } from "react-final-form";
import {
  composeValidators,
  maxLength,
  required,
} from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormControls";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { useNavigate } from "react-router-dom";
import { FORM_ERROR } from "final-form";
// @ts-ignore
import classes from "../common/FormsControls/FormControls.module.css";
import { AppStateType } from "../../redux/redux-store";

const LoginForm: React.FC = (props) => {
  return (
    <Form
      // @ts-ignore
      onSubmit={props.onSubmit}
      // initialValues={{ stooge: "larry", employed: false }}

      render={({
        handleSubmit,
        submitError,
        form,
        submitting,
        pristine,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name="email"
              validate={composeValidators(required, maxLength(12))}
            >
              {({ input, meta }) => (
                <Input input={input} meta={meta} placeholder="Email" />
              )}
            </Field>
          </div>
          <div>
            <Field
              name="password"
              validate={composeValidators(required, maxLength(12))}
              type={"password"}
            >
              {({ input, meta }) => (
                <Input input={input} meta={meta} placeholder="Password" />
              )}
            </Field>
          </div>
          <div>
            <Field name="rememberMe" component="input" type="checkbox" />
          </div>
          {submitError && <div className={classes.error}>{submitError}</div>}
          <div>
            <button>Login</button>
          </div>
        </form>
      )}
    />
  );
};

type MapStatePropsType = {
  isAuth: boolean;
};
type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean) => boolean;
};

type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = async (formData: LoginFormValuesType) => {
    const response = props.login(
      formData.email,
      formData.password,
      formData.rememberMe
    );

    if (response) {
      return { [FORM_ERROR]: "Error" };
    }

    // return props.login(formData.email, formData.password, formData.rememberMe);
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (props.isAuth) {
      return navigate("/profile");
    }
  }, [props.isAuth]);

  return (
    <div>
      <h1>Login</h1>
      {/*@ts-ignore*/}
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return { isAuth: state.auth.isAuth };
};

// @ts-ignore
export default connect(mapStateToProps, { login })(Login);
