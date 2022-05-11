const initialState = {
  friends: [
    { id: 1, name: "Oleg" },
    { id: 2, name: "Diego" },
    { id: 3, name: "Aragon" },
  ],
};

type InitialStateType = typeof initialState;

const sidebarReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  return state;
};

export default sidebarReducer;
