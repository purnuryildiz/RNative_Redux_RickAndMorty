const initialState = {
  characterList: [],
  pending: false,
  error: null,
  params: {
    page: 1,
    status: null,
    gender: null,
    name: null,
  },
};

const CharacterReducer = (state = initialState, action) => {
  return state;
};

export default CharacterReducer;
