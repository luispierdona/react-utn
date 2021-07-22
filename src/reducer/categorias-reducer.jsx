const estadoInicial = {
  categoriasList: [],
};

function categoriasReducer(state = estadoInicial, action) {
  const nuevoState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'LISTAR_CATEGORIAS':
      nuevoState.categoriasList = action.categoriasList;
      return nuevoState;
    case 'CATEGORIAS_TO_SAVE':
      nuevoState.categoriasToSave = action.categoriasToSave;
      return nuevoState;
    case 'DELETE_CATEGORIAS':
      nuevoState.categoriasToDelete = action.categoriasToDelete;
      return nuevoState;
    case 'CATEGORIAS_BY_LIBRO':
      nuevoState.categoriasByLibro = action.categoriasByLibro;
      return nuevoState;
    default:
      return state;
  }
}

export default categoriasReducer;