
const estadoInicial = {
  posteos: [],
};

function personasReducer(state = estadoInicial, action) {
  const nuevoState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'LISTAR_PERSONAS':
      nuevoState.personas = action.personasList;
      return nuevoState;
    case 'AGREGAR_PERSONA':
      nuevoState.personas.push(action.personas);
      return nuevoState;
    case 'DELETE_PERSONA':
      nuevoState.personas = nuevoState.personas.filter((x) => x.id !== action.id);
      return nuevoState;
    default:
      return state;
  }
}

export default personasReducer;