const estadoInicial = {
  librosList: [],
  libroPrestadoA: {},
  libroToDelete: {},
  libroToSave: {},
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
    // case 'LIBROS_BY_PERSONA':
    //   nuevoState.librosByPersona = action.librosByPersona;
    //   return nuevoState;
    default:
      return state;
  }
}

export default librosReducer;