import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import CategoriasDeleteOverlay from './categorias-delete-overlay';
import { useToasts } from 'react-toast-notifications';
import CategoriasVerLibrosOverlay from './categorias-ver-libros-overlay';
import { getCategorias, getLibrosByCategoria } from '../service/categorias-service';

function CategoriasTable() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const categoriasRow = useSelector(state => state.categorias.categoriasList);

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [verLibrosModalShowxCategorias, setVerLibrosModalShowxCategorias] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriasResponse = await getCategorias();
        dispatch({ type: 'LISTAR_CATEGORIAS', categoriasList: categoriasResponse.data });
      } catch (error) {
        console.log(error);
        addToast(error, { appearance: 'success', autoDismiss: true });
      }
    }
    fetchData();
  }, []);

  const handleVerLibrosxCategorias = async (id) => {
    try {
      const respuesta = await getLibrosByCategoria(id);
      dispatch({ type: 'LIBROS_BY_CATEGORIA', librosByCategoria: respuesta.data });
      setVerLibrosModalShowxCategorias(true);
    } catch (error) {
      console.log(error);
      addToast(error, { appearance: 'error', autoDismiss: true });
    }
  };

  const handleDelete = (row) => {
    dispatch({ type: 'DELETE_CATEGORIA', categoriaToDelete: row });
    setDeleteModalShow(true);
  };

  return (
    <>
      {categoriasRow.length > 0 ?
        <Table striped bordered hover variant="dark" className="mb-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Generos</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <>
              {categoriasRow.map((row, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{row.nombre}</td>
                  <td>
                    <Button variant="light"
                      onClick={() => handleVerLibrosxCategorias(row.id)}>Libros
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

        : <p>No existen Categorias</p>}
        
      {/* VER LIBROS MODAL */}
      <CategoriasVerLibrosOverlay
        show={verLibrosModalShowxCategorias}
        onHide={() => setVerLibrosModalShowxCategorias(false)}
      />

      {/* DELETE MODAL */}
      <CategoriasDeleteOverlay
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
      />
    </>
  );

}

export default CategoriasTable;