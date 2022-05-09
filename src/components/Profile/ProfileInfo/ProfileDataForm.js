import React from "react";
import { Form, Field } from "react-final-form";
import classes from "./ProfileInfo.module.css";
import {
  composeValidators,
  required,
} from "../../../utils/validators/validators";
import { Input } from "../../common/FormsControls/FormControls";

const ProfileDataForm = ({ profile, onSubmitForm }) => {
  const onSubmit = (formData) => {
    onSubmitForm(formData);
  };

  return (
    <Form
      initialValues={profile}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitError }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <button>save</button>
          </div>
          <div>
            <Field name="name" validate={composeValidators()}>
              {({ input, meta }) => (
                <Input input={input} meta={meta} placeholder="Full name" />
              )}
            </Field>
          </div>
          <div>
            <Field name="username" validate={composeValidators(required)}>
              {({ input, meta }) => (
                <Input input={input} meta={meta} placeholder="Username" />
              )}
            </Field>
          </div>
          <div>
            <Field name="email" validate={composeValidators(required)}>
              {({ input, meta }) => (
                <Input input={input} meta={meta} placeholder="Email" />
              )}
            </Field>
          </div>
          <div>
            <Field name="phone" validate={composeValidators(required)}>
              {({ input, meta }) => (
                <Input input={input} meta={meta} placeholder="Phone" />
              )}
            </Field>
          </div>

          {submitError && <div className={classes.error}>{submitError}</div>}
        </form>
      )}
    />

    // <div>
    //   <form>
    //     <div>
    //       <button>save</button>
    //     </div>
    //     <div>Name: {profile.name}</div>
    //     <div>Username: {profile.username}</div>
    //     <div>Email: {profile.email}</div>
    //     <div>Phone: {profile.phone}</div>
    //   </form>
    // </div>
  );
};

// const ProfileDataFormReduxForm = () => {};

export default ProfileDataForm;
