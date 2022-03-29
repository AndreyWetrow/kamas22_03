import React from "react";
import Post from "./Post/Post";
import classes from "./MyPosts.module.css";

const MyPosts = () => {
  const posts = [
    { id: 1, message: "Hi, how are you", likeCounts: 20 },
    { id: 2, message: "Hello friend", likeCounts: 5 },
  ];

  const postsElements = posts.map((post) => {
    return <Post message={post.message} likeCounts={post.likeCounts} />;
  });

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <div>
        <textarea name="" id="" cols="15" />
      </div>
      <div>
        <button>Add post</button>
      </div>
      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
