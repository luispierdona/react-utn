import React from 'react';
import { useState } from 'react';
import { Container, Button, Navbar } from 'react-bootstrap';
import LibrosAgregarOverlay from './libros-agregar-overlay';

function LibrosTableTopbar() {

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mt-3">
        <Container>
          <div className="container justify-content-center">
            <Navbar.Brand>LIBROS</Navbar.Brand>
          </div>
          <Navbar.Brand className="text-right">
            <Button variant="info" onClick={() => setModalShow(true)}>
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