import {CHARACTERS} from '../../service/urls';
import {getRequests} from '../../service/verbs';
import {
  CHARACTERS_REJECT,
  FETCH_CHARACTERS,
  PENDING_CHARACTERS,
} from '../types/characterTypes';

export const getCharacterList = params => {
  return async dispatch => {
    dispatch({type: PENDING_CHARACTERS});
    try {
      const response = await getRequests(CHARACTERS, params);
      dispatch({
        type: FETCH_CHARACTERS,
        payload: response.data.results,
      });
    } catch (error) {
      dispatch({
        type: CHARACTERS_REJECT,
        error: error,
      });
    }
  };
};
