import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import LibrosDeleteOverlay from './libros-delete-overlay';
import { useToasts } from 'react-toast-notifications';
import LibrosVerPersonasOverlay from './libros-ver-personas-overlay';
import { getLibros, devolverLibro } from '../service/libros-service';
import { getPersonas } from '../service/personas-service';
import LibrosPrestarOverlay from './libros-prestar-overlay';
import LibrosAgregarOverlay from './libros-agregar-overlay';
import { getCategorias } from '../service/categorias-service';

function LibrosTable() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const librosRow = useSelector(state => state.libros.librosList);

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [verPersonasModalShow, setVerPersonasModalShow] = useState(false);
  const [verLibrosPrestarModalShow, setLibrosPrestarModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const librosResponse = await getLibros();
        dispatch({ type: 'LISTAR_LIBROS', librosList: librosResponse.data });
      } catch (error) {
        console.log(error);
        addToast(error, { appearance: 'success', autoDismiss: true });
      }
    }
    fetchData();
  }, []);

  const handleDelete = (row) => {
    dispatch({ type: 'DELETE_LIBRO', libroToDelete: row });
    setDeleteModalShow(true);
  };

  const handleEdit = async (row) => {
    dispatch({ type: 'LIBRO_TO_SAVE', libroToSave: row });
    const personasResponse = await getPersonas();
    dispatch({ type: 'LISTAR_PERSONAS', personasList: personasResponse.data });
    const categoriasResponse = await getCategorias();
    dispatch({ type: 'LISTAR_CATEGORIAS', categoriasList: categoriasResponse.data });

    setEditModalShow(true);
  };

  const handlePrestar = async (row) => {
    try {
      dispatch({ type: 'PERSONA_PRESTAR_LIBRO', personaPrestarLibro: {} });
      dispatch({ type: 'LIBRO_TO_SAVE', libroToSave: row });
      const personasResponse = await getPersonas();
      dispatch({ type: 'LISTAR_PERSONAS', personasList: personasResponse.data });
      setLibrosPrestarModalShow(true);
    } catch (error) {
      console.log(error.message);
      addToast(error.request.response, { appearance: 'error', autoDismiss: true });
    }

  };

  const handleDevolver = async (row) => {
    try {
      const id = row.id;
      const devolverLibroResponse = await devolverLibro(id);
      const librosResponse = await getLibros();
      dispatch({ type: 'LISTAR_LIBROS', librosList: librosResponse.data });
    } catch (error) {
      console.log(error.message);
      addToast(error.request.response, { appearance: 'error', autoDismiss: true });
    }
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
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <>
              {librosRow.map((row, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{row.nombre}</td>
                  <td>{row.descripcion}</td>
                  <td>
                    {row.categoria ?
                      row.categoria.nombre
                      : 'Sin categoria'}</td>
                  <td>
                    {row.persona ?
                      row.persona.nombre + ' ' + row?.persona?.apellido
                      : 'Libro disponible'}
                  </td>
                  <td>
                    <Button variant="info"
                      onClick={() => handleEdit(row)}>
                      <i className="fa fa-pencil" aria-hidden="true" />
                    </Button>{' '}
                    <Button variant="danger"
                      onClick={() => handleDelete(row)}>
                      <i className="fa fa-trash" aria-hidden="true" />
                    </Button>{' '}
                    {row.persona ?
                      <Button variant="dark"
                        onClick={() => handleDevolver(row)}>
                        Devolver
                      </Button>
                      :
                      <Button variant="light"
                        onClick={() => handlePrestar(row)}>
                        Prestar
                      </Button>
                    }
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
      <LibrosDeleteOverlay
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
      />

      {/* LIBROS PRESTAR */}
      <LibrosPrestarOverlay
        show={verLibrosPrestarModalShow}
        onHide={() => setLibrosPrestarModalShow(false)}
      />

      {/* Modal agregar */}
      <LibrosAgregarOverlay
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
      />
    </>
  );

}

export default LibrosTable;