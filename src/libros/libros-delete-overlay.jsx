import React from 'react';
import { Modal, Button, Container, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { borrarLibro, getLibros } from '../service/libros-service';

function LibrosDeleteOverlay(props) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const libroToDelete = useSelector(state => state.libros.libroToDelete);

  const handleSubmit = async () => {
    try {
      const id = libroToDelete.id;
      const deleteResponse = await borrarLibro(id);
      const getLibrosResponse = await getLibros();
      
      dispatch({ type: 'LISTAR_LIBROS', librosList: getLibrosResponse.data });
      dispatch({ type: 'DELETE_LIBRO', libroToDelete: { } });

      addToast(deleteResponse?.data?.msg, { appearance: 'success', autoDismiss: true });
    } catch (e) {
      console.log(e.message);
      addToast(e.request.response, { appearance: 'error', autoDismiss: true });
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
          Borrar Libro
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro que desea borrar el siguiente registro?
        </p>
        <Container>
          <Row className="mb-3">
            <Col md="6">
              <span><b>Titulo Libro: </b>{libroToDelete?.nombre}</span>
            </Col>
            <Col md="6">
              <span><b>Descripcion: </b>{libroToDelete?.descripcion}</span>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={ () => {handleSubmit(); props.onHide()} } >Borrar</Button>
        <Button variant="primary" onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );

}

export default LibrosDeleteOverlay;