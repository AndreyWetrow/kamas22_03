const SEND_MESSAGE = "SEND_MESSAGE";

type DialogType = {
  id: number;
  name: string;
};
type MessageType = {
  id: number;
  message: string;
};

const initialState = {
  dialogs: [
    { id: 1, name: "Vasja" },
    { id: 2, name: "Olja" },
    { id: 3, name: "Andrey" },
    { id: 4, name: "Sanja" },
    { id: 5, name: "Pasha" },
    { id: 6, name: "Pasha" },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: "Hello" },
    { id: 2, message: "Bay" },
    { id: 3, message: "How are you" },
    { id: 4, message: "Fine" },
    { id: 5, message: "good night" },
  ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (
  state = initialState,
  action: any
): InitialStateType => {
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

type sendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE;
  newMessageBody: string;
};

export const sendMessageCreator = (
  newMessageBody: string
): sendMessageCreatorActionType => {
  return { type: SEND_MESSAGE, newMessageBody };
};

export default dialogsReducer;
