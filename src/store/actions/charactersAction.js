import {CHARACTERS} from '../../service/urls';
import {getRequests} from '../../service/verbs';
import {
  CHARACTERS_REJECT,
  FETCH_CHARACTERS,
  FETCH_SINGLECHARACTER,
  PENDING_CHARACTERS,
  PENDING_SINGLECHARACTER,
  SINGLECHARACTER_REJECT,
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

//Action creator -belirli bir action type ı tetikleyen bir fonksiyondur.Bu fonksiyon, bir action oluşturur ve dispatch eder.Bu fonksiyon API'den veri çekmeye çalışır ve başarılı olursa FETCH_CHARACTERS action'ını dispatch eder, başarısız olursa CHARACTERS_REJECT action'ını dispatch eder.

//! Action Type: Uygulamanızın durumunu tanımlayan sabit bir string'dir. Örneğin: FETCH_CHARACTERS, CHARACTERS_REJECT.
//!Action Creator: Bir işlem gerçekleştiren, bir action type'ını tetikleyen fonksiyondur. Örneğin: getCharacterList fonksiyonu, FETCH_CHARACTERS action'ını tetikleyen bir action creator'dır.

//Bir thunk aksiyonu daha oluşturalım id ye göre verileri çekmek için, dışarıdan dispatch gelecek ve dispatche göre tetikleme işlemi yapılacak

export const getSingleCharacter = characterID => {
  const url = `${CHARACTERS}/${characterID}`;
  console.log('Generated URL:', url);
  return async dispatch => {
    dispatch({type: PENDING_SINGLECHARACTER});
    try {
      const response = await getRequests(url);
      console.log(response.data);
      dispatch({
        type: FETCH_SINGLECHARACTER,
        payload: response.data,
      });
    } catch (error) {
      dispatch({type: SINGLECHARACTER_REJECT, error: error});
    }
  };
};
