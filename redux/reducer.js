const initialState = {
  dictionary: {
    id: "",
    username: "",
    password: "",
    english: [{}],
    vietnamese: [{}],
  },
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add-english":
      return {
        ...state,
        dictionary: {
          ...state.dictionary,
          english: [...state.dictionary.english, action.payload],
        },
      };
    case "add-vietnamese":
      return {
        ...state,
        dictionary: {
          ...state.dictionary,
          vietnamese: [...state.dictionary.vietnamese, action.payload],
        },
      };
    case "setData":
      return {
        ...state,
        dictionary: { ...action.payload },
      };
    default:
      return state;
  }
};

export default appReducer;
