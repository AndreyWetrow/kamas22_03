import React from "react";
import { Field, Form } from "react-final-form";
import Post from "./Post/Post";
import classes from "./MyPosts.module.css";
import {
  composeValidators,
  maxLength,
  minLength,
  required,
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormControls";

const MyPosts = React.memo((props) => {
  console.log("RENDER");
  const postsElements = props.posts.map((post) => {
    return (
      <Post key={post.id} message={post.message} likeCounts={post.likeCounts} />
    );
  });

  const onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>

      <Form
        onSubmit={onAddPost}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="newPostText"
                validate={composeValidators(
                  required,
                  maxLength(10),
                  minLength(5)
                )}
              >
                {({ input, meta }) => (
                  <Textarea
                    input={input}
                    meta={meta}
                    placeholder="Введите сообщение "
                  />
                )}
              </Field>
            </div>
            <div>
              <button>Add post</button>
            </div>
          </form>
        )}
      />

      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
});

export default MyPosts;
