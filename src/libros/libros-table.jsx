import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import LibrosDeleteOverlay from './libros-delete-overlay';
import { useToasts } from 'react-toast-notifications';
import LibrosVerPersonasOverlay from './libros-ver-libros-overlay';
import { getLibros } from '../service/libros-service';

function LibrosTable() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const librosRow = useSelector(state => state.libros.librosList);

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [verPersonasModalShow, setVerPersonasModalShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // const respuesta = await axios.get('http://localhost:3000/libros');
        // dispatch({ type: 'LISTAR_LIBROS', librosList: respuesta.data });
        const librosResponse = await getLibros();
        dispatch({ type: 'LISTAR_LIBROS', librosList: librosResponse.data });
      } catch (error) {
        console.log(error);
        addToast(error.ERROR, { appearance: 'success', autoDismiss: true });
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(librosRow);
  }, [librosRow]);

  const handleVerPersonas = async (id) => {
    try {
      const respuesta = await axios.get('http://localhost:3000/personaByLibros/' + id);
      dispatch({ type: 'PERSONA_BY_LIBROS', personaByLibros: respuesta.data });

      setVerPersonasModalShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (row) => {
    dispatch({ type: 'DELETE_Libro', libroToDelete: row });
    setDeleteModalShow(true);
  };

  return (
    <>
      {librosRow.length > 0 ?
        <Table striped bordered hover variant="dark" className="mb-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Titulo Libro</th>
              <th>Descripcion</th>
              <th>Categoria</th>
              <th>Prestado</th>
            </tr>
          </thead>
          <tbody>
            <>
              {personasRow.map((row, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{row.libro}</td>
                  <td>{row.descripcion}</td>
                  <td>{row.categoria}</td>
                  <td>{row.prestado}</td>
                  <td>
                    <Button variant="light"
                      onClick={() => handleVerPersonas(row.id)}>Libro prestado a: 
                    </Button>{' '}
                    <Button variant="info">
                      <i className="fa fa-pencil" aria-hidden="true" />
                    </Button>{' '}
                    <Button variant="danger"
                      onClick={() => handleDelete(row)}>
                      <i className="fa fa-trash" aria-hidden="true" />
                    </Button>{' '}
                  </td>
                </tr>
              ))}
            </>
          </tbody>
        </Table>

        : <p>Este libro no fue prestado</p>}
      {/* VER PRESONAS MODAL */}
      <LibrosVerPersonasOverlay
        show={verPersonasModalShow}
        onHide={() => setVerPersonasModalShow(false)}
      />

      {/* DELETE MODAL */}
      <PersonasDeleteOverlay
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
      />
    </>
  );

}

export default LibrosTable;