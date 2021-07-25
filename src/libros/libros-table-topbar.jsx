import React from 'react';
import { useState } from 'react';
import { Container, Button, Navbar } from 'react-bootstrap';
import LibrosAgregarOverlay from './libros-agregar-overlay';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { getCategorias } from '../service/categorias-service';
import { getPersonas } from '../service/personas-service';

function LibrosTableTopbar() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const [modalShow, setModalShow] = useState(false);

  const handleAdd = async () => {
    try {
      const getPersonasResponse = await getPersonas();
      dispatch({ type: 'LISTAR_PERSONAS', personasList: getPersonasResponse.data });

      const getCategoriasResponse = await getCategorias();
      dispatch({ type: 'LISTAR_CATEGORIAS', categoriasList: getCategoriasResponse.data });

      dispatch({ type: 'LIBRO_TO_SAVE', libroToSave: { } });

      setModalShow(true);
    } catch (error) {
      console.log(error.message);
      addToast(error.request.response, { appearance: 'error', autoDismiss: true });
    }

  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mt-3">
        <Container>
          <div className="container justify-content-center">
            <Navbar.Brand>LIBROS</Navbar.Brand>
          </div>
          <Navbar.Brand className="text-right">
            <Button variant="info" onClick={() => handleAdd()}>
              Nuevo Registro
            </Button>{' '}
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Modal agregar */}
      <LibrosAgregarOverlay
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default LibrosTableTopbar;