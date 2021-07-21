import { combineReducers } from 'redux';
import personasReducer from './personas-reducer';
import librosReducer from './libros-reducer';
import categoriasReducer from './categorias-reducer';

const allReducers = combineReducers({
  personas: personasReducer,
  libros: librosReducer,
  categorias: categoriasReducer
});

export default allReducers;