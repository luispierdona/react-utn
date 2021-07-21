const estadoInicial = {
  categoriasList: [],
};

function categoriasReducer(state = estadoInicial, action) {
  const nuevoState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'LISTAR_CATEGORIAS':
      nuevoState.categoriasList = action.categoriasList;
      return nuevoState;
    // case 'PERSONA_TO_SAVE':
    //   nuevoState.personaToSave = action.personaToSave;
    //   return nuevoState;
    // case 'DELETE_PERSONA':
    //   nuevoState.personaToDelete = action.personaToDelete;
    //   return nuevoState;
    // case 'LIBROS_BY_PERSONA':
    //   nuevoState.librosByPersona = action.librosByPersona;
    //   return nuevoState;
    default:
      return state;
  }
}

export default categoriasReducer;