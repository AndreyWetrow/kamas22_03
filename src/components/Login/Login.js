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

const LoginForm = (props) => {
  return (
    <Form
      onSubmit={props.onSubmit}
      // initialValues={{ stooge: "larry", employed: false }}

      render={({ handleSubmit, form, submitting, pristine, values }) => (
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
          <div>
            <button>Login</button>
          </div>
        </form>
      )}
    />
  );
};

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
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
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isAuth: state.auth.isAuth };
};

export default connect(mapStateToProps, { login })(Login);

// export default compose(connect(null, { login }), withAuthRedirect)(Login);
