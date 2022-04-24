import React from "react";
import Post from "./Post/Post";
import classes from "./MyPosts.module.css";

const MyPosts = (props) => {
  const postsElements = props.posts.map((post) => {
    return (
      <Post key={post.id} message={post.message} likeCounts={post.likeCounts} />
    );
  });

  let newPostElement = React.createRef();

  const onAddPost = () => {
    props.addPost();
  };

  const onPostChange = (e) => {
    const text = e.target.value;
    props.updateNewPostText(text);
  };

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <div>
        <textarea
          ref={newPostElement}
          onChange={onPostChange}
          cols="15"
          value={props.newPostText}
        />
      </div>
      <div>
        <button onClick={onAddPost}>Add post</button>
      </div>
      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
