/*
  EL USO DE TRY/CATCH ESTA IMPLEMENTADO A LA HORA DE LLAMAR A ESTAS FUNCIONES
  EN LOS HANDLE SAVE/EDIT ETC PORQUE SI SE EMPLEA AQUI NO SE PUEDE
  CACHEAR EL ERROR Y MOSTAR MENSAJES
*/
import axios from 'axios';

const baseURL = 'http://localhost:3000';
const libros = '/libros';
const postLibro = '/libro';
const editLibro = '/libro/';
const deleteLibro = '/libro/';

export const getLibros = async () => {
  const respuesta = await axios.get(baseURL + libros);
  return respuesta;
};

export const saveLibro = async (libro) => {
  let respuesta = {};
  if (libro?.id) {
    respuesta = await axios.put(baseURL + editLibro + libro.id, libro);
  } else {
    respuesta = await axios.post(baseURL + postLibro, libro);
  }
  return respuesta;
};