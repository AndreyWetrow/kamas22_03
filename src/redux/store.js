import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
  _state: {
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
      newMessageBody: "",
    },
    sidebar: {
      friends: [
        { id: 1, name: "Oleg" },
        { id: 2, name: "Diego" },
        { id: 3, name: "Aragon" },
      ],
    },
  },
  _callSubscriber() {
    console.log(132123);
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  },
};

export default store;
