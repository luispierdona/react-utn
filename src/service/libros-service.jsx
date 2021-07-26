/*
  EL USO DE TRY/CATCH ESTA IMPLEMENTADO A LA HORA DE LLAMAR A ESTAS FUNCIONES
  EN LOS HANDLE SAVE/EDIT ETC PORQUE SI SE EMPLEA AQUI NO SE PUEDE
  CACHEAR EL ERROR Y MOSTAR MENSAJES
*/
import axios from 'axios';

const baseURL = 'http://localhost:3000';
// const libros = '/libros';
const libros = '/librosExtended';
const postLibro = '/libro';
const editLibro = '/libro/';
const deleteLibro = '/libro/';
const prestar = '/libro/prestar/';
const devolver = '/libro/devolver/';

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

export const prestarLibro = async (personaId = 0, libroId = 0) => {
  const body = {persona_id: personaId};
  const respuesta = await axios.put(baseURL + prestar + libroId, body);
  return respuesta;
};

export const devolverLibro = async (id = 0) => {
  const respuesta = await axios.put(baseURL + devolver + id);
  return respuesta;
};

export const borrarLibro = async (id = 0) => {
  const respuesta = await axios.delete(baseURL + deleteLibro + id);
  return respuesta;
};