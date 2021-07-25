// import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:3000';
const Categorias = '/categorias';
const categoriasByLibro = '/categoriasByLibros';

export const getCategorias = async () => {
  try {
    const respuesta = await axios.get(URL + Categorias);
    return respuesta;
  } catch (error) {
    return error;
  }
};

export const getCategoriasByLibro = async () => {
  try {
    const respuesta = await axios.get(URL + categoriasByLibro);
    return respuesta;
  } catch (error) {
    return error;
  }
};