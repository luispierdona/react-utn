import { combineReducers } from 'redux';
import personasReducer from './personas-reducer';

const allReducers = combineReducers({
  personas: personasReducer
});

export default allReducers;