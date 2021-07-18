import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function PersonasTable() {
  const personasRow = useSelector(state => state.personas.personasList);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const respuesta = await axios.get('https://jsonplaceholder.typicode.com/posts');
      dispatch({ type: 'LISTAR_PERSONAS', personasList: respuesta.data });
    }
    fetchData();
  }, []);

  return (
    <>

      <ul>
        {personasRow.map((row) => (
          <li key={row.id}>
            <label>{row.title}</label>
          </li>
        ))}
      </ul>
    </>
  );

}

export default PersonasTable;