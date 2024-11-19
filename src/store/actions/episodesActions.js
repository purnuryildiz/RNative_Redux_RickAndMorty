import {EPISODES} from '../../service/urls';
import {getRequests} from '../../service/verbs';
import {
  EPISODES_REJECT,
  FETCH_EPISODES,
  PENDING_EPISODES,
} from '../types/episodeTypes';

export const getEpisodesList = params => {
  return async dispatch => {
    dispatch({type: PENDING_EPISODES});
    try {
      const response = await getRequests(EPISODES, params);
      dispatch({
        type: FETCH_EPISODES,
        payload: response.data.results,
      });
    } catch (error) {
      dispatch({
        type: EPISODES_REJECT,
        error: error,
      });
    }
  };
};
