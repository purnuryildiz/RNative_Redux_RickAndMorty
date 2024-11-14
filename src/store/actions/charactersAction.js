import {CHARACTERS_URL} from '../../service/urls';
import {getRequests} from '../../service/verbs';
import {PENDING_CHARACTERS} from '../types/characterTypes';

export const getCharacterList = () => {
  return async dispatch => {
    dispatch({type: PENDING_CHARACTERS});
    try {
      const response = await getRequests(CHARACTERS_URL, params);
      console.log(params);
    } catch (error) {}
  };
};
