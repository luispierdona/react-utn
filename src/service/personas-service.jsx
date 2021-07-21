// import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:3000';
const Personas = '/personas';
const librosByPersona = '/librosByPersona';

export const getPersonas = async () => {
  try {
    const respuesta = await axios.get(URL + Personas);
    return respuesta;
  } catch (error) {
    return error;
  }
};

export const getLibrosByPersona = async () => {
  try {
    const respuesta = await axios.get(URL + librosByPersona);
    return respuesta;
  } catch (error) {
    return error;
  }
};