import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import CategoriasDeleteOverlay from './categorias-delete-overlay';
import { useToasts } from 'react-toast-notifications';
import CategoriasVerLibrosOverlay from './categorias-ver-libros-overlay';
import { getCategorias } from '../service/categorias-service';

function CategoriasTable() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const CategoriasRow = useSelector(state => state.Categorias.CategoriasList);

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [verLibrosModalShowxCategorias, setVerLibrosModalShowxCategorias] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const CategoriasResponse = await getCategorias();
        dispatch({ type: 'LISTAR_CATEGORIAS', categoriasList: CategoriasResponse.data });
      } catch (error) {
        console.log(error);
        addToast(error.ERROR, { appearance: 'success', autoDismiss: true });
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(CategoriasRow);
  }, [CategoriasRow]);

  const handleVerLibrosxCategorias = async (id) => {
    try {
        //Cambiar la parte de id por el correspondiente a libro
      const respuesta = await axios.get('http://localhost:3000/categoriasByLibros/' + id);
      dispatch({ type: 'CATEGORIAS_BY_LIBROS', categoriasByLibros: respuesta.data });

      setVerLibrosModalShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (row) => {
    dispatch({ type: 'DELETE_CATEGORIAS', categoriasToDelete: row });
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
              <th> </th>
              <th> </th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            <>
              {categoriasRow.map((row, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{row.nombre}</td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td>
                    <Button variant="light"
                      onClick={() => handleVerLibrosxCategorias(row.id)}>Libros
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