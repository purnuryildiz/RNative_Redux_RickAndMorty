import {combineReducers} from 'redux';
import CharacterReducer from './charactersReducer';
import EpisodesReducer from './episodesReducer'; // Yeni reducer'ı import et

const rootReducer = combineReducers({
  characters: CharacterReducer, // Karakter verilerini yönetir
  episodes: EpisodesReducer, // Bölüm verilerini yönetir
});

export default rootReducer;
