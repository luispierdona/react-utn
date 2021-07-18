
const estadoInicial = {
  personasList: [],
  librosByPersona: [],
};

function personasReducer(state = estadoInicial, action) {
  const nuevoState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'LISTAR_PERSONAS':
      nuevoState.personasList = action.personasList;
      return nuevoState;
    case 'AGREGAR_PERSONA':
      nuevoState.personasList.push(action.persona);
      return nuevoState;
    case 'DELETE_PERSONA':
      nuevoState.personas = nuevoState.personas.filter((x) => x.id !== action.id);
      return nuevoState;
    case 'LIBROS_BY_PERSONA':
      nuevoState.librosByPersona = action.librosByPersona;
      return nuevoState;
    default:
      return state;
  }
}

export default personasReducer;