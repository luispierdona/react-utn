/*
  EL USO DE TRY/CATCH ESTA IMPLEMENTADO A LA HORA DE LLAMAR A ESTAS FUNCIONES
  EN LOS HANDLE SAVE/EDIT ETC PORQUE SI SE EMPLEA AQUI NO SE PUEDE
  CACHEAR EL ERROR Y MOSTAR MENSAJES
*/
import axios from 'axios';

const baseURL = 'http://localhost:3000';
const personas = '/personas';
const librosByPersona = '/librosByPersona/';
const postPersona = '/persona';
const editPersona = '/persona/';
const deletePersona = '/persona/';

export const getPersonas = async () => {
  const respuesta = await axios.get(baseURL + personas);
  return respuesta;
};

export const getLibrosByPersona = async (id = 0) => {
  const respuesta = await axios.get(baseURL + librosByPersona + id);
  return respuesta;
};

export const savePersona = async (persona) => {
  let respuesta = {};
  if (persona?.id) {
    respuesta = await axios.put(baseURL + editPersona + persona.id, persona);
  } else {
    respuesta = await axios.post(baseURL + postPersona, persona);
  }
  return respuesta;
};

export const borrarPersona = async (id = 0) => {
  const respuesta = await axios.delete(baseURL + deletePersona + id);
  return respuesta;
};