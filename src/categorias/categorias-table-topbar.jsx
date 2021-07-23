import React from 'react';
import { useState } from 'react';
import { Container, Button, Navbar } from 'react-bootstrap';
import CategoriasAgregarOverlay from './categorias-agregar-overlay';

function CategoriasTableTopbar() {

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mt-3">
        <Container>
          <div className="container justify-content-center">
            <Navbar.Brand>Categorias</Navbar.Brand>
          </div>
          <Navbar.Brand className="text-right">
            <Button variant="info" onClick={() => setModalShow(true)}>
              Nuevo Genero
            </Button>{' '}
          </Navbar.Brand>
        </Container>
      </Navbar>

    {/* Modal agregar */}
      <CategoriasAgregarOverlay
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default CategoriasTableTopbar;