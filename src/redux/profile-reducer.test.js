import profileReducer, {
  addPostActionCreator,
  deletePost,
} from "./profile-reducer";

const initialState = {
  posts: [
    { id: 1, message: "Hi, how are you", likeCounts: 20 },
    { id: 2, message: "Hello friend", likeCounts: 5 },
  ],
};

it("length of post", () => {
  let action = addPostActionCreator("hi, programmer");

  let newState = profileReducer(initialState, action);

  expect(newState.posts.length).toBe(3);
});

it("message of new post should be", () => {
  let action = addPostActionCreator("hi, programmer");

  let newState = profileReducer(initialState, action);

  expect(newState.posts[2].message).toBe("hi, programmer");
});

it("length of after deleting should be decrement", () => {
  let action = deletePost(1);

  let newState = profileReducer(initialState, action);

  expect(newState.posts.length).toBe(1);
});
it("after deleting length shouldn`t be decrement, id incorrect", () => {
  let action = deletePost(100);

  let newState = profileReducer(initialState, action);

  expect(newState.posts.length).toBe(2);
});
