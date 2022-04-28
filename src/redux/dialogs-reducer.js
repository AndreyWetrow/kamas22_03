const SEND_MESSAGE = "SEND_MESSAGE";

const initialState = {
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
};
const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      const body = action.newMessageBody;
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: 7,
            message: body,
          },
        ],
      };

    default:
      return state;
  }
};

export const sendMessageCreator = (newMessageBody) => {
  return { type: SEND_MESSAGE, newMessageBody };
};

export default dialogsReducer;
