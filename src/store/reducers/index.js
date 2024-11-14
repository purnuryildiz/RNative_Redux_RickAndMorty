import {combineReducers} from 'redux';
import CharacterReducer from './charactersReducer';

const rootReducer = combineReducers({
  characters: CharacterReducer,
});

export default rootReducer;
