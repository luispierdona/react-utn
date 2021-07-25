import React from 'react';
import { useState } from 'react';
import { Container, Button, Navbar } from 'react-bootstrap';
import PersonasAgregarOverlay from './personas-agregar-overlay';

function PersonasTableTopbar() {

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mt-3">
        <Container>
          <div className="container justify-content-center">
            <Navbar.Brand>PERSONAS</Navbar.Brand>
          </div>
          <Navbar.Brand className="text-right">
            <Button variant="info" onClick={() => setModalShow(true)}>
              Nuevo Registro
            </Button>{' '}
          </Navbar.Brand>
        </Container>
      </Navbar>

    {/* Modal agregar */}
      <PersonasAgregarOverlay
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default PersonasTableTopbar;