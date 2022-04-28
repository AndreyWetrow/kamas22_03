import React from "react";
import { Form, Field } from "react-final-form";
import classes from "./MessageTextarea.module.css";
import {
  composeValidators,
  maxLength,
  required,
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormControls";

const AddMessageForm = (props) => {
  return (
    <Form
      onSubmit={props.onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className={classes.messageTextarea}>
            <Field
              name="newMessageBody"
              validate={composeValidators(required, maxLength(100))}
            >
              {({ input, meta }) => (
                <Textarea
                  input={input}
                  meta={meta}
                  placeholder="Введите сообщение пользователю"
                />
              )}
            </Field>

            <button>Send</button>
          </div>
        </form>
      )}
    />
  );
};

export default AddMessageForm;
