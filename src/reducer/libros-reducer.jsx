const estadoInicial = {
  librosList: [],
  libroPrestadoA: {},
  libroToDelete: {},
  libroToSave: {},
  personaPrestarLibro: [],
};

function librosReducer(state = estadoInicial, action) {
  const nuevoState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'LISTAR_LIBROS':
      nuevoState.librosList = action.librosList;
      return nuevoState;
    case 'LIBRO_PRESTADO_A':
      nuevoState.libroPrestadoA = action.libroPrestadoA;
      return nuevoState;
    case 'LIBRO_TO_SAVE':
      nuevoState.libroToSave = action.libroToSave;
      return nuevoState;
    case 'DELETE_LIBRO':
      nuevoState.libroToDelete = action.libroToDelete;
      return nuevoState;
    case 'PERSONA_PRESTAR_LIBRO':
      nuevoState.personaPrestarLibro = action.personaPrestarLibro;
      return nuevoState;
    default:
      return state;
  }
}

export default librosReducer;