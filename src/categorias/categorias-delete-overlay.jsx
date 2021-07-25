import React from 'react';
import { Modal, Button, Container, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

function CategoriasDeleteOverlay(props) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const categoriaToDelete = useSelector(state => state.categorias.categoriasToDelete);

  const handleSubmit = async () => {
    try {
      const id = categoriaToDelete?.id;
      const serverResponse = await axios.delete('http://localhost:3000/categoria/' + id);
      const respuesta = await axios.get('http://localhost:3000/categorias');
      
      dispatch({ type: 'LISTAR_CATEGORIAS', categoriasList: respuesta.data });
      dispatch({ type: 'DELETE_CATEGORIAS', categoriaToDelete: {} });

      addToast(serverResponse?.data?.msg, { appearance: 'success', autoDismiss: true });
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
          Borrar Categoria
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro que desea borrar el siguiente registro?
        </p>
        <Container>
          <Row className="mb-3">
            <Col md="6">
              <span><b>Genero: </b>{categoriaToDelete?.nombre}</span>
            </Col>
            <Col md="6">
              {/* <span><b>Apellido: </b>{CategoriaToDelete?.apellido}</span> */}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md="6">
              {/* <span><b>Email: </b>{CategoriaToDelete?.email}</span> */}
            </Col>
            <Col md="6">
              {/* <span><b>Alias: </b>{CategoriaToDelete?.alias}</span> */}
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

export default CategoriasDeleteOverlay;