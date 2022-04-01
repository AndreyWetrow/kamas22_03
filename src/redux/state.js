let rerenderEntireTree = () => {
  console.log(132123);
};

const state = {
  profilePage: {
    posts: [
      { id: 1, message: "Hi, how are you", likeCounts: 20 },
      { id: 2, message: "Hello friend", likeCounts: 5 },
    ],
    newPostText: "",
  },
  dialogsPage: {
    dialogs: [
      { id: 1, name: "Vasja" },
      { id: 2, name: "Olja" },
      { id: 3, name: "Andrey" },
      { id: 4, name: "Sanja" },
      { id: 5, name: "Pasha" },
      { id: 6, name: "Pasha" },
    ],
    messages: [
      { id: 1, message: "Hello" },
      { id: 2, message: "Bay" },
      { id: 3, message: "How are you" },
      { id: 4, message: "Fine" },
      { id: 5, message: "good night" },
    ],
    newMessageText: "",
  },
  sidebar: {
    friends: [
      { id: 1, name: "Oleg" },
      { id: 2, name: "Diego" },
      { id: 3, name: "Aragon" },
    ],
  },
};

export const addPost = () => {
  const newPost = {
    id: 5,
    message: state.profilePage.newPostText,
    likeCounts: 0,
  };
  state.profilePage.posts.push(newPost);
  state.profilePage.newPostText = "";
  rerenderEntireTree(state);
};
export const addMessage = () => {
  const newMessage = {
    id: 7,
    message: state.dialogsPage.newMessageText,
  };
  state.dialogsPage.messages.push(newMessage);
  state.profilePage.newMessageText = "";
  rerenderEntireTree(state);
};

export const updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText;
  rerenderEntireTree(state);
};
export const updateNewMessageText = (newText) => {
  state.dialogsPage.newMessageText = newText;
  rerenderEntireTree(state);
};

export const subscribe = (observer) => {
  rerenderEntireTree = observer;
};

export default state;
