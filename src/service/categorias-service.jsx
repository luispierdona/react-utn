/*
  EL USO DE TRY/CATCH ESTA IMPLEMENTADO A LA HORA DE LLAMAR A ESTAS FUNCIONES
  EN LOS HANDLE SAVE/EDIT ETC PORQUE SI SE EMPLEA AQUI NO SE PUEDE
  CACHEAR EL ERROR Y MOSTAR MENSAJES
*/
import axios from 'axios';

const baseURL = 'http://localhost:3000';
const categorias = '/categorias';
const categoriasByLibro = '/librosByCategoria/';
const postCategoria = '/categoria';
const deleteCategoria = '/categoria/';

export const getCategorias = async () => {
  const respuesta = await axios.get(baseURL + categorias);
  return respuesta;
};

export const getLibrosByCategoria = async (id = 0) => {
  const respuesta = await axios.get(baseURL + categoriasByLibro + id);
  return respuesta;
};

export const saveCategoria = async (categoria) => {
  const respuesta = await axios.post(baseURL + postCategoria, categoria);
  return respuesta;
};

export const borrarCategoria = async (id = 0) => {
  const respuesta = await axios.delete(baseURL + deleteCategoria + id);
  return respuesta;
};