import {
  EPISODES_REJECT,
  FETCH_EPISODES,
  PENDING_EPISODES,
} from '../types/episodeTypes';

const initialState = {
  episodes: [],
  loading: false,
  error: null,
};

const episodesReducer = (state = initialState, action) => {
  switch (action.type) {
    case PENDING_EPISODES:
      return {...state, loading: true, error: null};
    case FETCH_EPISODES:
      return {...state, loading: false, episodes: action.payload};
    case EPISODES_REJECT:
      return {...state, loading: false, error: action.error};
    default:
      return state;
  }
};

export default episodesReducer;
