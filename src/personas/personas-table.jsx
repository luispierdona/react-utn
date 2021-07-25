import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import PersonasDeleteOverlay from './personas-delete-overlay';
import { useToasts } from 'react-toast-notifications';
import PersonasVerLibrosOverlay from './personas-ver-libros-overlay';
import { getPersonas, getLibrosByPersona } from '../service/personas-service';
import PersonasAgregarOverlay from './personas-agregar-overlay';

function PersonasTable() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const personasRow = useSelector(state => state.personas.personasList);

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [verLibrosModalShow, setVerLibrosModalShow] = useState(false);
  const [editPersonaModalShow, setEditPersonaModalShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const personasResponse = await getPersonas();
        dispatch({ type: 'LISTAR_PERSONAS', personasList: personasResponse.data });
      } catch (error) {
        console.log(error);
        addToast(error, { appearance: 'error', autoDismiss: true });
      }
    }
    fetchData();
  }, []);

  const handleVerLibros = async (id) => {
    try {
      const respuesta = await getLibrosByPersona(id);
      dispatch({ type: 'LIBROS_BY_PERSONA', librosByPersona: respuesta.data });
      setVerLibrosModalShow(true);
    } catch (error) {
      console.log(error);
      addToast(error, { appearance: 'error', autoDismiss: true });
    }
  };

  const handleDelete = (row) => {
    dispatch({ type: 'DELETE_PERSONA', personaToDelete: row });
    setDeleteModalShow(true);
  };

  const handleEdit = (row) => {
    dispatch({ type: 'PERSONA_TO_SAVE', personaToSave: row });
    setEditPersonaModalShow(true);
  };

  return (
    <>
      {personasRow.length > 0 ?
        <Table striped bordered hover variant="dark" className="mb-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Alias</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <>
              {personasRow.map((row, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{row.nombre}</td>
                  <td>{row.apellido}</td>
                  <td>{row.email}</td>
                  <td>{row.alias}</td>
                  <td>
                    <Button variant="light"
                      onClick={() => handleVerLibros(row.id)}>Libros
                    </Button>{' '}
                    <Button variant="info"
                      onClick={() => handleEdit(row)}>
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

        : <p>No existen personas</p>}

      {/* VER LIBROS MODAL */}
      <PersonasVerLibrosOverlay
        show={verLibrosModalShow}
        onHide={() => setVerLibrosModalShow(false)}
      />
      
      {/* AGREGAR/EDIT MODAL */}
      <PersonasAgregarOverlay
        show={editPersonaModalShow}
        onHide={() => setEditPersonaModalShow(false)}
      />

      {/* DELETE MODAL */}
      <PersonasDeleteOverlay
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
      />
    </>
  );

}

export default PersonasTable;