import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import PersonasDeleteOverlay from './personas-delete-overlay';
import { useToasts } from 'react-toast-notifications';
import PersonasVerLibrosOverlay from './personas-ver-libros-overlay';
import { getPersonas } from '../service/personas-service';
import PersonasEditOverlay from './personas-edit-overlay';

function PersonasTable() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const personasRow = useSelector(state => state.personas.personasList);

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [verLibrosModalShow, setVerLibrosModalShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // const respuesta = await axios.get('http://localhost:3000/personas');
        // dispatch({ type: 'LISTAR_PERSONAS', personasList: respuesta.data });
        const personasResponse = await getPersonas();
        dispatch({ type: 'LISTAR_PERSONAS', personasList: personasResponse.data });
      } catch (error) {
        console.log(error);
        addToast(error.ERROR, { appearance: 'success', autoDismiss: true });
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(personasRow);
  }, [personasRow]);

  const handleVerLibros = async (id) => {
    try {
      const respuesta = await axios.get('http://localhost:3000/librosByPersona/' + id);
      dispatch({ type: 'LIBROS_BY_PERSONA', librosByPersona: respuesta.data });

      setVerLibrosModalShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (row) => {
    dispatch({ type: 'DELETE_PERSONA', personaToDelete: row });
    setDeleteModalShow(true);
  };

  const handleEdit = (row) => {
    dispatch({ type: 'PERSONA_TO_SAVE', personaToSave: row });

  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      {personasRow.length > 0 ?
        <Table striped bordered hover variant="dark" className="mb-3">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>alias</th>
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
                    {/* <Button variant="info">
                      <i className="fa fa-pencil" aria-hidden="true" />
                    </Button>{' '} */}
                    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                      <Button variant="success">Click me to see</Button>
                    </OverlayTrigger>
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

      {/* DELETE MODAL */}
      <PersonasDeleteOverlay
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
      />
    </>
  );

}

export default PersonasTable;