const estadoInicial = {
  categoriasList: [],
  librosByCategoria: [],
  categoriaToDelete: {},
  categoriaToSave: {},
};

function categoriasReducer(state = estadoInicial, action) {
  const nuevoState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'LISTAR_CATEGORIAS':
      nuevoState.categoriasList = action.categoriasList;
      return nuevoState;
    case 'CATEGORIA_TO_SAVE':
      nuevoState.categoriaToSave = action.categoriaToSave;
      return nuevoState;
    case 'DELETE_CATEGORIA':
      nuevoState.categoriaToDelete = action.categoriaToDelete;
      return nuevoState;
    case 'LIBROS_BY_CATEGORIA':
      nuevoState.librosByCategoria = action.librosByCategoria;
      return nuevoState;
    default:
      return state;
  }
}

export default categoriasReducer;