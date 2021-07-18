import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function PersonasTable() {
  const personasRow = useSelector(state => state.personas.personasList);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const respuesta = await axios.get('http://localhost:3000/personas');
        dispatch({ type: 'LISTAR_PERSONAS', personasList: respuesta.data });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect( () => {
    console.log(personasRow);
  }, [personasRow]);

  return (
    <>

      <ul>
        {personasRow.map((row) => (
          <li key={row.id}>
            <label>{row.nombre}</label>
            <label>{row.apellido}</label>
            <label>{row.email}</label>
          </li>
        ))}
      </ul>
    </>
  );

}

export default PersonasTable;