import React from 'react';
import { Modal, Button, Container, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { borrarPersona, getPersonas } from '../service/personas-service';

function PersonasDeleteOverlay(props) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const personaToDelete = useSelector(state => state.personas.personaToDelete);

  const handleSubmit = async () => {
    try {
      const id = personaToDelete?.id;
      const deleteResponse = await borrarPersona(id);
      const getPersonasResponse = await getPersonas();
      
      dispatch({ type: 'LISTAR_PERSONAS', personasList: getPersonasResponse.data });
      dispatch({ type: 'DELETE_PERSONA', personaToDelete: {} });

      addToast(deleteResponse?.data?.msg, { appearance: 'success', autoDismiss: true });
      props.onHide();
    } catch (e) {
      console.log(e.message);
      addToast(e.request.response, { appearance: 'error', autoDismiss: true });
      props.onHide();
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="text-light bg-danger">
        <Modal.Title id="contained-modal-title-vcenter">
          Borrar Persona
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro que desea borrar el siguiente registro?
        </p>
        <Container>
          <Row className="mb-3">
            <Col md="6">
              <span><b>Nombre: </b>{personaToDelete?.nombre}</span>
            </Col>
            <Col md="6">
              <span><b>Apellido: </b>{personaToDelete?.apellido}</span>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md="6">
              <span><b>Email: </b>{personaToDelete?.email}</span>
            </Col>
            <Col md="6">
              <span><b>Alias: </b>{personaToDelete?.alias}</span>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={ handleSubmit } >Borrar</Button>
        <Button variant="primary" onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );

}

export default PersonasDeleteOverlay;