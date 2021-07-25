import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function PersonasVerLibrosOverlay(props) {

  const librosByPersona = useSelector(state => state.personas.librosByPersona);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Libros
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          {librosByPersona.length > 0 ?
            <ListGroup variant="flush">
              {librosByPersona.map((row, index) => (
                <ListGroup.Item key={index}>
                  <b>{index} | </b>
                  <b>Nombre </b>{row.nombre}
                  <b>  -  </b>
                  <b>Descripcion </b>{row.descripcion}
                </ListGroup.Item>
              ))}
            </ListGroup>
            : <p>Persona no debe libros</p>}
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );

}

export default PersonasVerLibrosOverlay;