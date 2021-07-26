import React from 'react';
import { useState } from 'react';
import { Container, Button, Navbar } from 'react-bootstrap';
import PersonasAgregarOverlay from './personas-agregar-overlay';
import { useDispatch } from 'react-redux';

function PersonasTableTopbar() {
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);

  const handleAdd = async () => {

    dispatch({ type: 'PERSONA_TO_SAVE', personaToSave: { } });

    setModalShow(true);
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mt-3">
        <Container>
          <div className="container justify-content-center">
            <Navbar.Brand>PERSONAS</Navbar.Brand>
          </div>
          <Navbar.Brand className="text-right">
            <Button variant="info" onClick={() => handleAdd()}>
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