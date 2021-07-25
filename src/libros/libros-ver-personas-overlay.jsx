import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function LibrosVerPersonasOverlay(props) {

  const libroPrestadoA = useSelector(state => state.libros.libroPrestadoA);

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
        <p>
          {libroPrestadoA.length > 0 ?
            <ListGroup variant="flush">
              {libroPrestadoA.map((row, index) => (
                <ListGroup.Item key={index}>
                  <b>{index} | </b>
                  <b>Nombre </b>{row.nombre}
                  <b>  -  </b>
                  <b>Descripcion </b>{row.descripcion}
                </ListGroup.Item>
              ))}
            </ListGroup>
            : <p>Persona no debe libros</p>}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );

}

export default LibrosVerPersonasOverlay;